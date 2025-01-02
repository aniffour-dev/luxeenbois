import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tour Pivotante pour Chaussures 7 Étages",
    template: "%s | LuxeEnbois",
  },
  description:
    "Organisez jusqu'à 35 paires de chaussures avec notre support rotatif élégant chez LuxeEnBois. Rangement pratique et stylé. Magasinez maintenant !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="FR">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
