import { InwardItemDetails } from "./InwardItemDetails";
import { Party } from "./Party";
import { StockArea } from "./StockArea";
import { ApprovalStatus } from "./ApprovalStatus";

export interface InwardDto{
    id:number|null,
    date: String,
    partyId: number,
    party: Party|null,
    stockArea : StockArea|null,
    stockAreaId: number,
    grnNumber: String,
    totalWeight: number|null,
    totalAmount: number|null,
    approvalStatus : ApprovalStatus|null,
    inwardItemDetails : InwardItemDetails[]
}