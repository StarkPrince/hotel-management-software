"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import { Session } from "@prisma/client";

export function useSession() {
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      if (user?.id) {
        try {
          const response = await fetch("/api/sessions/active");
          if (response.ok) {
            const data = await response.json();
            setSession(data.session);
          }
        } catch (error) {
          console.error("Failed to fetch session:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchSession();
  }, [user?.id]);

  return { session, loading };
}