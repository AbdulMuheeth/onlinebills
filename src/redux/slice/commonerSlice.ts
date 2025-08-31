import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CommonerSlice as commonerSliceType } from '../../types';
import { type WritableDraft } from 'immer';

const initialState: commonerSliceType = {
    exporter:'',
    consignee:'',
    invoiceRefAndDate: '',
    exportersRefNo: '',
    importersRefAndDate: '', // similar to import's order no. & data in 2 & 3 form
    countryOfOrigin: '',
    countryOfFinalDestination: '',
    placeByReceiptByPreCarrier: '',
    portOfLoading: '',
    finalDestination:'',
    portOfDischarge: '',
    items: [],
    remarks:'',
    termsOfDelivery:'',
    carriageBy:'',
    otherRef:''
}


const commonerSlice = createSlice({
    name:'commoner',
    initialState:initialState,
    reducers:{

        updateCommoner: <K extends keyof commonerSliceType> (state: WritableDraft<commonerSliceType>,action:PayloadAction<{ key: K; value: commonerSliceType[K] }>) => {
            const { key,value} = action.payload;
            state[key] = value;
        }

    }
})

export const { updateCommoner } = commonerSlice.actions;
export default commonerSlice.reducer;