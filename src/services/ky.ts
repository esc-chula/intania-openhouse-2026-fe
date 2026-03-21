// services/ky.ts
"use client";

import { getFirebaseAuth } from "@/lib/firebase";
import ky from "ky";

const kyClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000/",
  hooks: {
    beforeRequest: [
      async (request) => {
        const auth = getFirebaseAuth();
        await auth.authStateReady();
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export { kyClient as ky };
