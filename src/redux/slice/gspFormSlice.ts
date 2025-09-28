import {createSlice,type PayloadAction} from '@reduxjs/toolkit';
import type { gspSliceType } from '../../types';


const initialState:gspSliceType = {
    importingCountry:'',
    issuingCountry:'',
    items: [],
    officialUse:'',
    referenceNo:''
}

const gspFormSlice = createSlice({
    name:'gspForm',
    initialState: initialState,
    reducers:{
        updateGSPForm: <K extends keyof gspSliceType> (state:gspSliceType,action: PayloadAction<{key:K, value:gspSliceType[K]}>)=>{
            state[action.payload.key] = action.payload.value;
        }
    }
})


export const {updateGSPForm} = gspFormSlice.actions;
export default gspFormSlice.reducer;