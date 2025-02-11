import "../app/ui/styles/globals.css";

export const metadata = {
  title: "Pide",
  description: "Lo que desees, solo Pide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
