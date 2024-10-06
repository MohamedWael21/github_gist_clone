import { footerLinks } from "@/constants";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-neutral-600 px-4 pt-16 pb-10 text-xs max-w-6xl mx-auto">
      <nav className="flex flex-col gap-2 items-center lg:flex-row lg:justify-center">
        <ul className="flex flex-wrap justify-center capitalize gap-2 lg:order-2">
          {footerLinks.map((link) => (
            <li key={link.name} className="mx-2">
              <Link
                href={link.href}
                className="link"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-2 lg:order-1">
          <FaGithub className="text-xl" />
          &copy; {new Date().getFullYear()} Github, Inc.
        </p>
      </nav>
    </footer>
  );
};
export default Footer;
