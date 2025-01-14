import { useState, useEffect } from "react";
import { Ticket } from "@/types/ticket";
import { useAuth } from "./use-auth";
import mockDb from "@/data/mock-db.json";

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
          ) as Ticket[];
          setTickets(userTickets);
        } else {
          setTickets(mockDb.tickets as Ticket[]);
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