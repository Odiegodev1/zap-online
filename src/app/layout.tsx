import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { handleGetUser } from "@/lib/server/auth";
import { Providers } from "@/components/ui/layout/providers";
import { MainLayout } from "@/components/ui/layout/MainLayout";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Chat Real",
    default: "Home | Chat Real",
  },
  icons: {
    icon: "/grftalk.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await handleGetUser(); // pode usar aqui, pois é server-side

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={nunito.className}>
        <Providers>
          <MainLayout user={user}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}




