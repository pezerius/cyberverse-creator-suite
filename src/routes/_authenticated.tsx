// Pathless layout that marks its children as auth-required.
// Today it just renders <Outlet />. When Lovable Cloud is enabled, add
// a beforeLoad that redirects unauthenticated users to /login:
//
//   beforeLoad: async ({ location }) => {
//     const { data } = await supabase.auth.getSession();
//     if (!data.session) throw redirect({ to: "/login", search: { redirect: location.href } });
//   }
//
// Routes that require auth should be moved under this layout by renaming
// their file, e.g. `wallet.tsx` → `_authenticated.wallet.tsx`. Do that
// migration together with the real auth wiring, not before.

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: () => <Outlet />,
});
