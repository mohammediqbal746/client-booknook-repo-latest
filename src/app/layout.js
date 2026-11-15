import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "BookNook - Online Library",
  description: "A Small Online Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning>
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">
          {children} {/* এই children এর ভেতরেই একেকবার একেক পেজ লোড হবে */}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}