import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de paises",
  description: "Uma lista de paises criada Next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
          <nav className="w-full bg-white h-16 flex items-center justify-center ">
            <section className="container flex-items-center gap-3   ">
              {/* <Image
                width={48}
                height={48}
                src="/logo.svg"
                alt="Logo da aplicação emoji de globo"
              /> */}
              <h1 className="font-bold text-2xl">Lista de Paises</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
