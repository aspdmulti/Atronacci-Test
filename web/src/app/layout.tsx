import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "../styles/custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { StoreProvider } from "@/redux/store";
import ProtectedPage from "@/routes/protected-routes";
import AuthProvider from "@/routes/auth-provider";
import NavbarComponent from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={
            inter.className +
            " bg-[url('https://astronacci.com/images/website/bg-layer8.jpg')]"
          }
        >
          <AuthProvider>
            <ProtectedPage>
              <NavbarComponent />
              {children}
            </ProtectedPage>
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
