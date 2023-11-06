import { PropsWithChildren } from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
