import { InwardItemDetails } from "./InwardItemDetails";

export interface InwardDto{
    date: String,
    partyId: number,
    stockAreaId: number,
    grnNumber: String,
    inwardItemDetails : InwardItemDetails[]
}