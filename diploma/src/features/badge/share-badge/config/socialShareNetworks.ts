import {
  XIcon,
  XShareButton,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

export interface ShareParams {
  text: string;
  pageUrl: string;
  hashtags?: string[];
}

export const getSocialShareNetworks = (hashtags: string[] = []) => [
  {
    id: "twitter",
    Button: XShareButton,
    Icon: XIcon,
    extra: { hashtags },
  },
  {
    id: "facebook",
    Button: FacebookShareButton,
    Icon: FacebookIcon,
    extra: { hashtag: `#${hashtags[0] ?? ""}` },
  },
  {
    id: "telegram",
    Button: TelegramShareButton,
    Icon: TelegramIcon,
    extra: {},
  },
  {
    id: "whatsapp",
    Button: WhatsappShareButton,
    Icon: WhatsappIcon,
    extra: {},
  },
  {
    id: "linkedIn",
    Button: LinkedinShareButton,
    Icon: LinkedinIcon,
    extra: {},
  },
  {
    id: "reddit",
    Button: RedditShareButton,
    Icon: RedditIcon,
    extra: {},
  },
];
