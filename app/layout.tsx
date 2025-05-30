import {
  DeployButton,
  EnvVarWarning,
  HeaderAuth,
  ThemeSwitcher,
  ThemeProvider,
  geistSans,
  Link,
  config,
  supabase
  
} from "@/lib/barrel";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

const { defaultUrl } = config;
const { utils: { hasEnvVars } } = supabase;

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | Space-TIS",
    default: "Space-TIS",
  },
  description: "Tugas Akhir Teknologi Integrasi Sistem Bertema Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <Navbar />
                </div>
              </nav>
              <div className="flex w-full flex-col gap-5 p-5">
                {children}
              </div>

              <footer className="sticky bottom-0 border w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
