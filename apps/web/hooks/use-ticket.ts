import mockDb from "@/apps/web/data/mock-db.json";
import { Ticket } from "@/apps/web/types/ticket";
import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

export const useTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      try {
        if (user.role === "GUEST") {
          const userTickets = mockDb.tickets.filter(
            (ticket) => ticket.createdBy === user.id
          ) as unknown as Ticket[];
          setTickets(userTickets);
        } else {
          setTickets(mockDb.tickets as unknown as Ticket[]);
        }
      } catch (err) {
        setError("Failed to fetch tickets");
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  return { tickets, isLoading, error };
};
