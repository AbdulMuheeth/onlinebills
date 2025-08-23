export interface InvoiceItem {
  id: number; // For unique key in React
  marksNo: string;
  noAndKind: string;
  description: string;
  quantity: string; // Use string for form input, parse to number later
  rate: string;
}

export interface ProformaInvoiceData {
  exporter: string;
  consignee: string;
  proRefAndDate: string;
  importersRefAndDate: string;
  exportersRefNo: string;
  countryOfOrigin: string;
  countryOfFinalDestination: string;
  termsOfDelivery: string;
  paymentTerms: string;
  incoterms: string;
  carriageBy: string;
  placeByReceiptByPreCarrier: string;
  portOfLoading: string;
  portOfDischarge: string;
  finalDestination: string;
  items: InvoiceItem[];
  amountChargeableInWord: string;
}