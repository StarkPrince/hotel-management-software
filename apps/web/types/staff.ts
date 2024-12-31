import { User } from "../lib/auth/types";

export interface StaffMember extends User {
  departmentId?: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface Assignment {
  id: string;
  title: string;
  assignedTo?: string;
  status: string;
  dueDate?: string;
  type: "TASK" | "TICKET";
}
