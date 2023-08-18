
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
    userId: number;
    email: string;
    role: Role;
}