import Link from "next/link";
import React from "react";
React;

interface ButtonProps {
  text: string;
  href: string;
}
const Button: React.FunctionComponent<ButtonProps> = ({ text, href }) => {
  return (
    <Link
      className="p-2 bg-green-500 rounded-md text-white ring-offset-1 ring-2 ring-green-500 transition hover:scale-105 active:ring-offset-2"
      href={href}
    >
      {text}
    </Link>
  );
};
export default Button;
