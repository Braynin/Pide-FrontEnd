import "../app/ui/styles/globals.css";
import footer from "../app/ui/components/footer.js";
import Header from "../app/ui/components/header.js";

export const metadata = {
  title: "Pide",
  description: "Lo que desees, solo Pide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header/>
        {children}
        {footer}
      </body>
    </html>
  );
}
