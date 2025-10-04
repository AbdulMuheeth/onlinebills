import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { qualityControlSliceType } from "../../types";


const initialState:qualityControlSliceType = {
    manufacturerName:'',
    dateOfSealingOrFlight:'',
    inspectionRequiredOn:'',
    manufacturerAddress:'',
    otherRelevantInformation:'',
    probableDateOfLanding:'',
    technicalRequirement:'',
    weeklyHoliday:'',
    buyerOrderDate:'',
    buyerOrderNumber:'',
    manufacturerDetails:'',
    addressOfInspection:'',
    inspectionAuthorityAddress:'',
    inspectionAuthorityName:'',
}

const qualityControlSlice = createSlice({
    name:'qualityControl',
    initialState:initialState,
    reducers:{
        updateQualityControl: <K extends keyof qualityControlSliceType> (state:qualityControlSliceType,action:PayloadAction<{key:K,value:qualityControlSliceType[K]}>) => {
            state[action.payload.key] = action.payload.value;
        }
    }
})


export const {updateQualityControl}= qualityControlSlice.actions;
export default qualityControlSlice.reducer;