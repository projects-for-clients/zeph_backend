
export interface IQuery {
    from: string;
    perPage: number;
    to: string;
    page: number,
    take: number,
    key: string
    value: string
}

export type Role = "superAdmin" | "customer" 

export interface JwtPayload {
    id: number;
    email: string;
    role: Role;
}