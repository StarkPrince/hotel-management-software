"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import { Ticket, TicketStatus, TicketPriority } from "@/types/ticket";
import { useAuth } from "@/hooks/use-auth";

interface TicketListProps {
  tickets: Ticket[];
  onViewTicket?: (ticket: Ticket) => void;
}

export function TicketList({ tickets, onViewTicket }: TicketListProps) {
  const { user } = useAuth();
  const isStaff = user?.role !== 'GUEST';

  const getStatusColor = (status: TicketStatus) => {
    const colors = {
      OPEN: "default",
      IN_PROGRESS: "warning",
      COMPLETED: "success",
      CANCELLED: "destructive",
    } as const;
    return colors[status];
  };

  const getPriorityColor = (priority: TicketPriority) => {
    const colors = {
      LOW: "default",
      MEDIUM: "warning",
      HIGH: "error",
      URGENT: "destructive",
    } as const;
    return colors[priority];
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            {isStaff && <TableHead>Guest</TableHead>}
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isStaff ? 7 : 6} className="text-center py-4">
                No tickets found
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.title}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                {isStaff && (
                  <TableCell>{ticket.createdBy}</TableCell>
                )}
                <TableCell>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewTicket?.(ticket)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isStaff && (
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}