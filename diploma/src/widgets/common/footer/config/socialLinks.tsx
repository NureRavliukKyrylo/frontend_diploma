import type { ElementType } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export interface FooterSocialLink {
  Icon: ElementType;
  href: string;
  label: string;
}

export const socialLinks: FooterSocialLink[] = [
  { Icon: GitHubIcon, href: "https://github.com/yourname", label: "GitHub" },
  { Icon: XIcon, href: "https://twitter.com/yourname", label: "X" },
  {
    Icon: LinkedInIcon,
    href: "https://linkedin.com/in/yourname",
    label: "LinkedIn",
  },
  {
    Icon: InstagramIcon,
    href: "https://instagram.com/yourname",
    label: "Instagram",
  },
];
