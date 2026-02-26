import Icon from "../common/icon";
import AuthButton from "./auth-button";

export default function OAuthButtons() {
	return (
		<div className="flex flex-col gap-2">
			<AuthButton onClick={() => {}}>
				<Icon name="google" className="size-6 mr-2" />
				Continue with Google
			</AuthButton>
			<AuthButton onClick={() => {}}>
				<Icon name="github" className="size-6 mr-2" />
				Continue with GitHub
			</AuthButton>
		</div>
	);
}
