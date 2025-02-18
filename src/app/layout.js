import "../app/globals.css";
import header from "../app/ui/components/header.js";
import footer from "../app/ui/components/footer.js";

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
