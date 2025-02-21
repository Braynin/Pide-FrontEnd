import "../app/globals.css";
import footer from "./components/ui/footer.js";
import header from "./components/ui/header.js";

export const metadata = {
  title: "Pide",
  description: "Lo que desees, solo Pide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
