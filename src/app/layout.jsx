import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Minimalist | Quiet, deliberate task workspace",
  description:
    "A calm, human-designed task management application for organizing daily work, deadlines, and consistent habits without the noise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAFA] text-[#1F2937] selection:bg-[#EBF1EE] selection:text-[#42665D]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
