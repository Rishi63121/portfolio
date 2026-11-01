export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const origin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://rishi63121.github.io";
export const siteUrl = `${origin}${basePath}`;

export const withBase = (path: string) => `${basePath}${path}`;

export const links = {
  email: "rishiroy12305@gmail.com",
  phone: "+91 8088501972",
  github: "https://github.com/Rishi63121",
  linkedin: "https://www.linkedin.com/in/rishi-roy-4209a6273",
  leetcode: "https://leetcode.com/u/Yb3TN9TGz9/",
  sahaj: "https://github.com/Rishi63121/SAHAJ-V2",
  talentai: "https://github.com/Rishi63121/TALENTAI-HRMS",
  resume: "/Rishi_Roy_Resume.pdf",
} as const;
