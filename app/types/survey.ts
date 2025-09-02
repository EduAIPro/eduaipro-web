export interface Survey {
    id: number;
    name: string;
    targetAudience: string;
    dateCreated: string;
    totalResponse: number;
    status: "Active" | "Inactive";
}