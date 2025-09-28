import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CommonerSlice as commonerSliceType } from '../../types';
import { type WritableDraft } from 'immer';

const initialState: commonerSliceType = {
    exporter:'',
    consignee:'',
    invoiceRef: '',
    invoiceDate:Date(),
    exportersRefNo: '',
    importersRef: '', // similar to import's order no. & data in 2 & 3 form
    importersDate:Date(),
    countryOfOrigin: '',
    countryOfFinalDestination: '',
    placeByReceiptByPreCarrier: '',
    portOfLoading: '',
    finalDestination:'',
    portOfDischarge: '',
    items: [],
    remarks:'',
    termsOfDelivery:'',
    incoTerms:'',
    paymentTerms:'',
    carriageBy:'',
    otherRef:'',
    vesselOrFlightNo:'',
    
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