import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { shipmentAdviceSliceType } from "../../types"

const initialState:shipmentAdviceSliceType = {
    addressOfBank:"",
    documentsSent:{
        anyOtherDocuments:false,
        billOfExchange:false,
        billOfLadingOrAirWayBill:false,
        certificateOfOrigin:false,
        commercialInvoice:false,
        customOrConsularInvoice:false,
        exportCertificateIfNeeded:false,
        GSPOrGSTPOrOtherCertificateofOrigin:false,
        inspectionCertificate:false,
        insuranceCertificateOrPolicy:false,
        packingList:false,
        weightCertificate:false
    },
    nameOfBank:"",
    otherDocument:{
        certificateOfOrigin:'',
        exportCertificate:false,
        invoice:false,
        packingList:false
    },
    certificateOriginType:'',
    carrier:'',
    flightNo:'',
}

const shippingAdviceSlice = createSlice({
    name:"shippingInstructions",
    initialState:initialState,
    reducers:{
        updateShippingAdvice: <K extends keyof shipmentAdviceSliceType>(state:shipmentAdviceSliceType, actions:PayloadAction<{key:K,value:shipmentAdviceSliceType[K]}>)=>{
            const {key,value} = actions.payload;
            state[key] = value;
       }
    }
})

export const {updateShippingAdvice} = shippingAdviceSlice.actions;
export default shippingAdviceSlice.reducer;