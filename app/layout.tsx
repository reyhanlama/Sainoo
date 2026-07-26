import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "sainoo.local";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const siteUrl = `${protocol}://${host}`;

  return {
    title: "Sainoo — A good introduction has its own pace",
    description: "Thoughtful introductions for people who call Sikkim home.",
    icons: { icon: "/sainoo-mark.png", apple: "/sainoo-mark.png" },
    openGraph: {
      title: "Sainoo — A good introduction has its own pace",
      description: "Thoughtful introductions for people who call Sikkim home.",
      url: siteUrl,
      siteName: "Sainoo",
      images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "Sainoo — A good introduction has its own pace" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sainoo — A good introduction has its own pace",
      description: "Thoughtful introductions for people who call Sikkim home.",
      images: [`${siteUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
