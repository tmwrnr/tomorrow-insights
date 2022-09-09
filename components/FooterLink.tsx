import React from "react";

type Props = {
  text: string;
  href: string;
};
const FooterLink: React.FC<Props> = ({ text, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white hover:underline"
    >
      {text}
    </a>
  );
};

export default FooterLink;
