import { FC } from "react";
import { NcDropDownItem } from "../NcDropDown/NcDropDown";
import { useRouter } from "next/router";

export interface SocialsShareProps {
  className?: string;
  itemClass?: string;
  link: string;
}

export type TSocialShareItem = "Facebook" | "Twitter" | "Linkedin" | "Instagram" | "Pinterest";

interface SocialShareType extends NcDropDownItem<TSocialShareItem> {}

const SOCIALS_DATA: SocialShareType[] = [
  {
    id: "Facebook",
    name: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35C.594 0 0 .594 0 1.325v21.351C0 23.407.594 24 1.325 24h11.495v-9.294H9.689V11.22h3.131V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.764v2.312h3.587l-.467 3.486h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.324V1.325C24 .594 23.406 0 22.675 0z" />
      </svg>
    ),
    href: "#",
    isTargetBlank: true,
  },
  {
    id: "Twitter",
    name: "Twitter",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557a9.931 9.931 0 0 1-2.828.775 4.933 4.933 0 0 0 2.165-2.723c-.951.555-2.005.959-3.127 1.184a4.922 4.922 0 0 0-8.384 4.482c-4.09-.205-7.719-2.165-10.148-5.144a4.82 4.82 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.099a4.936 4.936 0 0 1-2.23-.616c-.054 1.997 1.401 3.863 3.444 4.276a4.903 4.903 0 0 1-2.224.085c.624 1.951 2.432 3.374 4.575 3.413A9.867 9.867 0 0 1 0 19.54a13.945 13.945 0 0 0 7.548 2.212c9.142 0 14.307-7.721 14.307-14.417 0-.22-.004-.44-.014-.658A10.243 10.243 0 0 0 24 4.557z" />
      </svg>
    ),
    href: "#",
    isTargetBlank: true,
  },
  {
    id: "Instagram",
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.314.975.975 1.252 2.242 1.314 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.314 3.608-.975.975-2.242 1.252-3.608 1.314-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.314-.975-.975-1.252-2.242-1.314-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.34-2.633 1.314-3.608.975-.975 2.242-1.252 3.608-1.314 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.015 7.053.073 5.767.131 4.579.359 3.526 1.413 2.473 2.467 2.245 3.655 2.187 4.941 2.129 6.22 2.113 6.644 2.113 12s.016 5.78.074 7.059c.058 1.286.286 2.474 1.339 3.527 1.053 1.053 2.241 1.281 3.527 1.339 1.279.058 1.703.074 7.059.074s5.78-.016 7.059-.074c1.286-.058 2.474-.286 3.527-1.339 1.053-1.053 1.281-2.241 1.339-3.527.058-1.279.074-1.703.074-7.059s-.016-5.78-.074-7.059c-.058-1.286-.286-2.474-1.339-3.527C19.395.359 18.207.131 16.921.073 15.644.015 15.22 0 12 0zm0 5.838a6.164 6.164 0 1 0 0 12.327 6.164 6.164 0 0 0 0-12.327zm0 10.164a3.995 3.995 0 1 1 0-7.991 3.995 3.995 0 0 1 0 7.991zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
      </svg>
    ),
    href: "#",
    isTargetBlank: true,
  },
  {
    id: "Linkedin",
    name: "Linkedin",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1c-29.7 0-53.79-24.6-53.79-54.3 0-29.7 24.1-54.3 53.79-54.3s53.79 24.6 53.79 54.3c-.01 29.7-24.09 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </svg>
    ),
    href: "#",
    isTargetBlank: true,
  },
  {
    id: "Pinterest",
    name: "Pinterest",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 496 512">
        <path d="M248 8C111 8 0 119 0 256c0 96.6 58.8 179.6 143.6 218.2-1.9-18.5-3.6-47.2.7-67.5 3.9-16.7 24.9-106.1 24.9-106.1s-6.2-12.4-6.2-30.6c0-28.6 16.6-49.9 37.4-49.9 17.6 0 26.1 13.2 26.1 29 0 17.7-11.3 44.2-17.1 68.6-4.8 20.3 10.2 36.8 30.2 36.8 36.2 0 60.6-46.4 60.6-101.4 0-41.8-28.2-73.2-79.5-73.2-57.9 0-94.1 43.3-94.1 91.9 0 16.7 5 28.5 12.8 37.6 3.6 4.3 4.1 6 2.8 10.9-1 3.6-3.3 12.1-4.3 15.5-1.4 5.2-5.5 7.1-10.1 5.1-28.1-11.5-41.1-42.2-41.1-76.9 0-57.1 48.1-125.3 143.5-125.3 76.7 0 127.6 55.6 127.6 115.1 0 79-43.9 138-109.1 138-21.8 0-42.3-11.8-49.4-25.2 0 0-11.8 46.7-14.3 56.6-5.2 19.5-19.2 43.7-28.8 58.6C223.9 495 235.8 496 248 496c137 0 248-111 248-248S385 8 248 8z" />
      </svg>
    ),
    href: "#",
    isTargetBlank: true,
  },
];

const SocialsShare: FC<SocialsShareProps> = ({
  className = "flex items-center space-x-4",
  itemClass = "text-white hover:opacity-90",
  link = "",
}) => {
  const router = useRouter();
  const currentLink = `${router.basePath}${link}`;

  const actions = SOCIALS_DATA.map((item) => {
    if (item.id === "Facebook") {
      item.href = `https://www.facebook.com/sharer/sharer.php?u=${currentLink}`;
    } else if (item.id === "Twitter") {
      item.href = `https://twitter.com/intent/tweet?url=${currentLink}`;
    } else if (item.id === "Linkedin") {
      item.href = `https://www.linkedin.com/shareArticle?mini=true&url=${currentLink}`;
    } else if (item.id === "Pinterest") {
      item.href = `https://pinterest.com/pin/create/button/?url=${currentLink}`;
    }
    return item;
  });

  return (
    <div className={className}>
      <span className="mr-4 text-lg font-semibold">Feel free to share:</span>
      {actions.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target={item.isTargetBlank ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full ${itemClass}`}
          style={{ backgroundColor: getSocialColor(item.id) }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

// Function to get the color for each social platform
const getSocialColor = (platform: TSocialShareItem) => {
  switch (platform) {
    case "Facebook":
      return "#1877F2";
    case "Twitter":
      return "#1DA1F2";
    case "Linkedin":
      return "#0A66C2";
    case "Instagram":
      return "#E1306C";
    case "Pinterest":
      return "#E60023";
    default:
      return "#333";
  }
};

export default SocialsShare;
