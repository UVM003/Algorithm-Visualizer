
import "./globals.css";


export const metadata = {
  title: "Algorithm Visualizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
