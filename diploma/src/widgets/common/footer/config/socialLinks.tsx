import type { SocialLink } from "@shared/config/types";
import {
  LinkedIn,
  GitHub,
  TwitterIcon,
  InstagramIcon,
} from "@shared/assets/icons/brands";

export const socialLinks: SocialLink[] = [
  { logo: GitHub, href: "https://github.com/yourname" },
  { logo: TwitterIcon, href: "https://twitter.com/yourname" },
  { logo: LinkedIn, href: "https://linkedin.com/in/yourname" },
  { logo: InstagramIcon, href: "https://instagram.com/yourname" },
];
