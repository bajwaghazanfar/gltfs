import { Navbar } from "@/components/Navbar/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${montserrat.variable} font-wdc`}>
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
