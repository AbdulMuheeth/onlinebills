import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { certificateOriginSliceType } from "../../types";
import { type WritableDraft } from 'immer';


const initialState:certificateOriginSliceType = {
    nameOfChamberOfCommerce:'',
    addressOfChamberOfCommerce:'',
}


const certificateOriginSlice = createSlice({
    name:"certificateOrigin",
    initialState,
    reducers:{
        updateCertificateOrigin: <K extends keyof certificateOriginSliceType> (state: WritableDraft<certificateOriginSliceType>, action:PayloadAction<{key:K, value:certificateOriginSliceType[K]}>)=>{
            const {key,value} = action.payload;
            state[key] = value;
        }
    }

})

export const { updateCertificateOrigin } = certificateOriginSlice.actions;
export default certificateOriginSlice.reducer;