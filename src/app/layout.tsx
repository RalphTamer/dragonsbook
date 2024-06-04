import "~/styles/globals.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";

import Layout from "./_components/Layout";
import { getServerAuthSession } from "~/server/auth";
import SessionProviderWrapper from "./_components/SessionProviderWrapper";
import { style } from "~/lib/styles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const edgeOfTheGalaxy = localFont({
  src: "./_fonts/EdgeOfTheGalaxyPoster-3zRAp.otf",
});
export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession()
 
  
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <SessionProviderWrapper>
          <Layout edgeOfTheGalaxy={edgeOfTheGalaxy} session={session}>
            <NextTopLoader color={style.color.fireRed} showSpinner={false} />
            {children}
          </Layout>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
