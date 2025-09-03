export interface Admin {
    id: number;
    name: string;
    email: string;
    schoolAffiliation: string;
    position: string;
    status: "Active" | "Inactive";
    dateJoined: string;
}