import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type formType = "PROFORMA_INVOICE" | "COMMERCIAL_INVOICE" | "CARGO_MANIFEST" | "GSP_FORM_A" | "APPLICATION_FOR_CERTIFICATE_OF_ORIGIN" | "APPLICATION_FOR_INSPECTION_OF_QUALITY_CONTROL";


const uiSlice = createSlice({
    name:"ui",
    initialState:{currentForm:"PROFORMA_INVOICE"},
    reducers:{
        setCurrentForm:(state,action: PayloadAction<formType> ) => {
            state.currentForm = action.payload;
        }
    }
})


export const { setCurrentForm } = uiSlice.actions;
export default uiSlice.reducer;
