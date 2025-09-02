export interface Support {
  id: number;
  ticketId: string;
  ticketName: string;
  priority: "Low" | "Medium" | "High";
  requester: string;
  assignee: string;
  status: "In Progress" | "Resolved" | "Pending";
  requestDate: string;
}