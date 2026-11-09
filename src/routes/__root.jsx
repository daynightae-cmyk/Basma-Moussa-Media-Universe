import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/AuthContext";
import { I18nProvider, useI18n } from "@/lib/experience/i18n";
import { Base44Scripts } from "base44:document";
import appCss from "@/index.css?url";

export const Route = createRootRoute({
  // Per-page <title>/meta come from each route's head(); this is the shared base.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "بسمة موسى · عالم الإعلام — Basma Moussa Media Universe" },
      {
        name: "description",
        content:
          "بسمة موسى — عالم إعلامي سينمائي يجمع الحكاية الإنسانية، مساحة الصوت، والبحث القانوني. منصة مفاهيم قيد التطوير.",
      },
      { name: "theme-color", content: "#070B18" },
    ],
    links: [
      { rel: "icon", href: "/brand/2766240fc_basma-logo-master.png", type: "image/png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Manrope:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster />
    </AuthProvider>
  );
}

// The document. There is no index.html: the server renders <html> from here.
// I18nProvider wraps the whole document so lang/dir are React-controlled and
// always match the rendered language, on the server and after hydration.
function RootDocument({ children }) {
  return (
    <I18nProvider>
      <DocumentShell>{children}</DocumentShell>
    </I18nProvider>
  );
}

function DocumentShell({ children }) {
  const { lang, dir } = useI18n();
  return (
    // The pre-hydration intro script intentionally adds data-intro-seen to <html>.
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Before the first paint: a returning visitor never sees the intro flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('bm-intro-seen')==='1')document.documentElement.setAttribute('data-intro-seen','1')}catch(e){}",
          }}
        />
      </head>
      {/* data-react-root: the builder's preview bridge looks for #root and falls back to this. */}
      <body data-react-root="true">
        {children}
        <Base44Scripts />
        <Scripts />
      </body>
    </html>
  );
}