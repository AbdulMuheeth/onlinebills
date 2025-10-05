import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { insuranceDeclarationSliceType } from "../../types";


const initialState:insuranceDeclarationSliceType = {
    addressOfInsuranceCompany:'',
    from:'',
    insured:'',
    marine:'',
    nameOfInsuranceCompany:'',
    premiumRate:'',
    specialInstructions:'',
    srcc:'',
    stampDuty:'',
    termsOfInsurance:'',
    war:'',
}

const insuranceDeclarationSlice = createSlice({
    name:'qualityControl',
    initialState:initialState,
    reducers:{
        updateInsuranceDeclaration: <K extends keyof insuranceDeclarationSliceType> (state:insuranceDeclarationSliceType,action:PayloadAction<{key:K,value:insuranceDeclarationSliceType[K]}>) => {
            state[action.payload.key] = action.payload.value;
        }
    }
})


export const {updateInsuranceDeclaration}= insuranceDeclarationSlice.actions;
export default insuranceDeclarationSlice.reducer;