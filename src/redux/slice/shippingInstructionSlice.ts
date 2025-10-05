import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { shippingInstructionSliceType } from "../../types"

const initialState:shippingInstructionSliceType = {
    declaredValue:'',
    exportInstructions:'',
    forwardingAgent:'',
    freightAndCharges:'',
    freightPayableAt:'',
    noOfOriginalBillOfLading:'',
    notifyPartyAddress:'',
    notifyPartyName:'',
    onwardInlandRouting:'',
    placeOfIssue:'',
    billOfLadingNo:'',
    bookingNumber:'',
}

const shippingInstructionsSlice = createSlice({
    name:"shippingInstructions",
    initialState:initialState,
    reducers:{
        updateShippingInstructions: <K extends keyof shippingInstructionSliceType>(state:shippingInstructionSliceType, actions:PayloadAction<{key:K,value:shippingInstructionSliceType[K]}>)=>{
            const {key,value} = actions.payload;
            state[key] = value;
       }
    }
})

export const {updateShippingInstructions} = shippingInstructionsSlice.actions;
export default shippingInstructionsSlice.reducer;