// Auth boundary. Today this is a hook that returns a fake session so the
// UI can render as if logged in. When Lovable Cloud is enabled, replace
// the body with a real Supabase session listener — do not change the
// return type.
//
// Handoff contract for the backend agent:
//   - Keep `useSession()` returning `{ user, loading }` with the same
//     `SessionUser` shape.
//   - Any route that must require auth already lives under an
//     `_authenticated` layout (see `src/routes/_authenticated.tsx`); the
//     layout is where you enforce redirect to `/login`.
//   - Any Studio route that must require the creator role should call
//     `requireCreator(user)` inside its `beforeLoad`.

import { useState, useEffect } from "react";
import type { SessionUser } from "./types";

const FAKE_USER: SessionUser = {
  id: "u_demo",
  handle: "you",
  displayName: "You",
  avatarEmoji: "🧑‍🚀",
  isCreator: true,
  isAdmin: true,
};

export function useSession(): { user: SessionUser | null; loading: boolean } {
  const [state, setState] = useState<{ user: SessionUser | null; loading: boolean }>({
    user: null,
    loading: true,
  });
  useEffect(() => {
    // TODO(backend): subscribe to supabase.auth.onAuthStateChange here.
    setState({ user: FAKE_USER, loading: false });
  }, []);
  return state;
}

export function requireCreator(user: SessionUser | null): asserts user is SessionUser {
  if (!user?.isCreator) throw new Error("Creator account required");
}

export function requireAdmin(user: SessionUser | null): asserts user is SessionUser {
  if (!user?.isAdmin) throw new Error("Admin account required");
}
