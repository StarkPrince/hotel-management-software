export interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
  status: 'SCHEDULED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface StaffMember extends User {
  departmentId?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Assignment {
  id: string;
  title: string;
  assignedTo?: string;
  status: string;
  dueDate?: string;
  type: 'TASK' | 'TICKET';
}