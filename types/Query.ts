import { UpdateTenancyTdo } from "src/models/agreements/tenancy/dto";


export interface IQuery {
    from: string;
    to: string;
    page: number,
    limit: number,
    key: string
    value: string
}