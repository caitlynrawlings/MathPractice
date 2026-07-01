import "./globals.css";

export const metadata = {
  title: "NES 103 Practice",
  description: "Practice NES 103 math problems",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
