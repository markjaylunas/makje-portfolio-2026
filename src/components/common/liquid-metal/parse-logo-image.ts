/** Cleans up the input image by turning it into a black and white mask with a beveled edge */

export function parseLogoImage(
	file: File | string,
): Promise<{ imageData: ImageData; pngBlob: Blob }> {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	return new Promise((resolve, reject) => {
		if (!file || !ctx) {
			reject(new Error("Invalid file or context"));
			return;
		}

		const img = new Image();
		img.onload = () => {
			img.width = 1000;
			img.height = 1000;

			const MAX_SIZE = 1000;
			const MIN_SIZE = 500;
			let width = img.naturalWidth;
			let height = img.naturalHeight;

			// Calculate new dimensions if image is too large or too small
			if (
				width > MAX_SIZE ||
				height > MAX_SIZE ||
				width < MIN_SIZE ||
				height < MIN_SIZE
			) {
				if (width > height) {
					if (width > MAX_SIZE) {
						height = Math.round((height * MAX_SIZE) / width);
						width = MAX_SIZE;
					} else if (width < MIN_SIZE) {
						height = Math.round((height * MIN_SIZE) / width);
						width = MIN_SIZE;
					}
				} else {
					if (height > MAX_SIZE) {
						width = Math.round((width * MAX_SIZE) / height);
						height = MAX_SIZE;
					} else if (height < MIN_SIZE) {
						width = Math.round((width * MIN_SIZE) / height);
						height = MIN_SIZE;
					}
				}
			}

			canvas.width = width;
			canvas.height = height;

			// Draw the user image on an offscreen canvas.
			const shapeCanvas = document.createElement("canvas");
			shapeCanvas.width = width;
			shapeCanvas.height = height;
			// biome-ignore lint/style/noNonNullAssertion: <ignore>
			const shapeCtx = shapeCanvas.getContext("2d")!;
			shapeCtx.drawImage(img, 0, 0, width, height);

			// 1) Build the inside/outside mask:
			// Non-shape pixels: pure white (255,255,255,255) or fully transparent.
			// Everything else is part of a shape.
			const shapeImageData = shapeCtx.getImageData(0, 0, width, height);
			const data = shapeImageData.data;
			const numPixels = width * height;
			const shapeMask = new Uint8Array(numPixels);
			for (let i = 0; i < numPixels; i++) {
				const idx4 = i * 4;
				const r = data[idx4];
				const g = data[idx4 + 1];
				const b = data[idx4 + 2];
				const a = data[idx4 + 3];
				if ((r === 255 && g === 255 && b === 255 && a === 255) || a === 0) {
					shapeMask[i] = 0;
				} else {
					shapeMask[i] = 1;
				}
			}

			// 2) Identify boundary (pixels that have at least one non-shape neighbor)
			const boundaryMask = new Uint8Array(numPixels);
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const idx = y * width + x;
					if (shapeMask[idx] === 0) continue;

					let isBoundary = false;
					if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
						isBoundary = true;
					} else {
						if (
							shapeMask[idx - width - 1] === 0 ||
							shapeMask[idx - width] === 0 ||
							shapeMask[idx - width + 1] === 0 ||
							shapeMask[idx - 1] === 0 ||
							shapeMask[idx + 1] === 0 ||
							shapeMask[idx + width - 1] === 0 ||
							shapeMask[idx + width] === 0 ||
							shapeMask[idx + width + 1] === 0
						) {
							isBoundary = true;
						}
					}

					if (isBoundary) {
						boundaryMask[idx] = 1;
					}
				}
			}

			// 3) Poisson solve: Δu = -C (i.e. u_xx + u_yy = C), with u=0 at the boundary.
			let u = new Float32Array(numPixels);
			let newU = new Float32Array(numPixels);
			const C = 0.01;
			const ITERATIONS = 300;

			const interiorIndices = new Int32Array(numPixels);
			let interiorCount = 0;
			for (let y = 1; y < height - 1; y++) {
				for (let x = 1; x < width - 1; x++) {
					const idx = y * width + x;
					if (shapeMask[idx] !== 0 && boundaryMask[idx] === 0) {
						interiorIndices[interiorCount++] = idx;
					}
				}
			}

			for (let iter = 0; iter < ITERATIONS; iter++) {
				for (let i = 0; i < interiorCount; i++) {
					const idx = interiorIndices[i];
					newU[idx] =
						(C + u[idx + 1] + u[idx - 1] + u[idx + width] + u[idx - width]) *
						0.25;
				}

				// Swap u with newU
				const temp = u;
				u = newU;
				newU = temp;
			}

			// 4) Normalize the solution and apply a nonlinear remap.
			let maxVal = 0;
			for (let i = 0; i < interiorCount; i++) {
				const val = u[interiorIndices[i]];
				if (val > maxVal) maxVal = val;
			}
			const alpha = 2.0; // Adjust for contrast.
			const outImg = ctx.createImageData(width, height);

			for (let i = 0; i < numPixels; i++) {
				const px = i * 4;
				if (shapeMask[i] === 0) {
					outImg.data[px] = 255;
					outImg.data[px + 1] = 255;
					outImg.data[px + 2] = 255;
					outImg.data[px + 3] = 255;
				} else {
					const raw = u[i] / maxVal;
					const remapped = raw ** alpha;
					const gray = 255 * (1 - remapped);
					outImg.data[px] = gray;
					outImg.data[px + 1] = gray;
					outImg.data[px + 2] = gray;
					outImg.data[px + 3] = 255;
				}
			}
			ctx.putImageData(outImg, 0, 0);
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(new Error("Failed to create PNG blob"));
					return;
				}
				resolve({
					imageData: outImg,
					pngBlob: blob,
				});
			}, "image/png");
		};

		img.onerror = () => reject(new Error("Failed to load image"));
		img.src = typeof file === "string" ? file : URL.createObjectURL(file);
	});
}
