export interface InvoiceItem {
  id: number; // For unique key in React
  itemNumber:string;
  marksNo: string;
  noAndKind: string;
  description: string;
  quantity: string; // Use string for form input, parse to number later
  rate: string;
  remarks:string;
  fobValue:string;
  originCriterion:string;
  grossWeight:string;
  grossMeasurement:string;
  numberAndDateOfInvoice:string;
}

// export interface ProformaInvoiceData {
//   exporter: string;
//   consignee: string;
//   proRefAndDate: string;
//   importersRefAndDate: string;
//   exportersRefNo: string;
//   countryOfOrigin: string;
//   countryOfFinalDestination: string;
//   termsOfDelivery: string;
//   paymentTerms: string;
//   incoterms: string;
//   carriageBy: string;
//   placeByReceiptByPreCarrier: string;
//   portOfLoading: string;
//   portOfDischarge: string;
//   finalDestination: string;
//   items: InvoiceItem[];
//   amountChargeableInWord: string;
// }

// commner slice types.

export type carriageByType = '' | 'Truck' | 'Train' | 'Vessel' | 'FlightNo' | 'Road' | 'Rail' | 'Sea' | 'Air' | 'Multimodal' ;


export type CommonerSlice = {
    exporter: string,
    consignee: string,
    invoiceRef: string,
    invoiceDate: string,
    exportersRefNo: string,
    importersRef: string, // similar to import's order no. & data in 2 & 3 form
    importersDate:string,
    countryOfOrigin: string,
    countryOfFinalDestination: string,
    placeByReceiptByPreCarrier:string,
    portOfLoading: string,
    portOfDischarge:string,
    finalDestination:string,
    items: InvoiceItem[],
    remarks:string,
    termsOfDelivery:string,
    incoTerms:string,
    paymentTerms:string,
    carriageBy: carriageByType,
    otherRef:string,
    vesselOrFlightNo:string,
    exporterAddress:string,
    consigneeAddress?:string,
    pointOfOrigin:string
}

// gspForm type

export interface gspItem{
  id:number,
  itemNumber:string,
  marksAndNoOfPackages: string,
  description: string,
  originCriterion: string,
  grossWeight:string,
  numberAndDateOfInvoice:string
}

export type gspSliceType = {
  referenceNo:string,
  issuingCountry:string,
  importingCountry:string,
  officialUse:string,
  items:InvoiceItem[],
}

export type certificateOriginSliceType = {
  nameOfChamberOfCommerce:string,
  addressOfChamberOfCommerce:string,
}

export type qualityControlSliceType = {
  manufacturerName:string,
  manufacturerAddress:string,
  manufacturerDetails:string,
  inspectionRequiredOn:string,
  weeklyHoliday:string,
  probableDateOfLanding:string,
  dateOfSealingOrFlight:string,
  technicalRequirement:string,
  otherRelevantInformation:string,
  buyerOrderNumber:string,
  buyerOrderDate:string,
  inspectionAuthorityName:string,
  inspectionAuthorityAddress:string,
  addressOfInspection:string,
}

export type shippingInstructionSliceType = {
  notifyPartyName:string,
  notifyPartyAddress:string,
  forwardingAgent:string,
  exportInstructions:string,
  onwardInlandRouting:string,
  freightAndCharges:string,
  freightPayableAt:string,
  placeOfIssue:string,
  declaredValue:string,
  noOfOriginalBillOfLading:string,
  billOfLadingNo:string,
  bookingNumber:string,
}

export type insuranceDeclarationSliceType = {
  nameOfInsuranceCompany: string,
  addressOfInsuranceCompany: string,
  insured: string,
  from: string,
  termsOfInsurance: string,
  specialInstructions:string,
  premiumRate:string,
  marine:string,
  war:string,
  srcc:string,
  stampDuty: string
}

export type allDocumentTypes = {
  commercialInvoice : boolean,
  customOrConsularInvoice : boolean,
  packingList: boolean,
  billOfLadingOrAirWayBill: boolean,
  insuranceCertificateOrPolicy: boolean,
  billOfExchange: boolean,
  certificateOfOrigin: boolean,
  GSPOrGSTPOrOtherCertificateofOrigin: boolean,
  exportCertificateIfNeeded: boolean,
  inspectionCertificate: boolean,
  weightCertificate: boolean,
  anyOtherDocuments: boolean,
}

export type otherDocumentTypes = {
  certificateOfOrigin: 'GSP' | 'GSTP'  | '',
  exportCertificate: boolean,
  invoice:boolean,
  packingList:boolean,
}

export type shipmentAdviceSliceType = {
  documentsSent: allDocumentTypes,
  nameOfBank: string,
  addressOfBank: string,
  otherDocument: otherDocumentTypes,
  certificateOriginType:'GSP' | 'GSTP'  | 'other' | string,
  carrier: string,
  flightNo:string
}