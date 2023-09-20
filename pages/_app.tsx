import { Navbar } from "@/components/Navbar/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-Roboto",
  weight: ["100", "300", "400", "500", "700"],
});
function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} font-wdc`}>
      {" "}
      <AuthContextProvider>
        {/* <Navbar /> */}
        <Toaster />
        <Component {...pageProps} />
      </AuthContextProvider>
    </main>
  );
}
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
