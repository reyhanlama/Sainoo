import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sainoo — A good introduction has its own pace",
  description: "Thoughtful introductions for people who call Sikkim home.",
  icons: { icon: "/sainoo-mark.png", apple: "/sainoo-mark.png" },
  openGraph: {
    title: "Sainoo — A good introduction has its own pace",
    description: "Thoughtful introductions for people who call Sikkim home.",
    siteName: "Sainoo",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sainoo — A good introduction has its own pace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sainoo — A good introduction has its own pace",
    description: "Thoughtful introductions for people who call Sikkim home.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
