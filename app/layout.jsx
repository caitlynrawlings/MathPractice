import "./globals.css";

export const metadata = {
  title: "The Word Problem Notebook — Grade 4 Math Practice",
  description: "Practice 12 kinds of grade 4 word problems with fresh numbers every time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
