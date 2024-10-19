import NextUiThemeProvider from "@/Providers/NextUiProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUiThemeProvider>{children}</NextUiThemeProvider>;
}
