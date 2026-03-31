import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
	content: string;
};

export function MarkdownRenderer({ content }: Props) {
	return (
		<article className="prose prose-invert prose-emerald max-w-none">
			{/* prose-invert: for dark mode
          prose-emerald: matches your brand color for links/accents
          max-w-none: lets your layout control the width 
      */}
			<ReactMarkdown
				remarkPlugins={[remarkGfm]} // Enables tables, task lists, and strikethrough
				components={{
					// Overriding specific elements if needed
					h1: ({ children }) => (
						<h1 className="text-4xl font-bold mb-4">{children}</h1>
					),
					img: ({ src, alt }) => (
						<img
							src={src}
							alt={alt}
							className="rounded-xl border border-white/10 my-8 shadow-2xl"
						/>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
}
