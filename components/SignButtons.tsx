import { signIn } from "next-auth/react";
import Link from "next/link";

const SignButtons = () => {
  return (
    <div className="flex gap-4 font-medium text-base">
      <button
        className="hover:text-primary-500"
        onClick={() => signIn("github")}
      >
        Sign in
      </button>
      <Link
        href="https://github.com/signup"
        className="bg-primary-400 hover:bg-primary-500 text-white px-2 py-1 rounded-lg"
      >
        Sign up
      </Link>
    </div>
  );
};
export default SignButtons;
