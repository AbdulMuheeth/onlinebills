// src/PrintableInvoice.tsx

import React from 'react';
import { type CommonerSlice as CommonerSliceType } from '../../types'; // Make sure this path is correct
import {numberToWords} from '../../functions/performaInvoice';
import '../../assets/css/InvoiceLayout.css';
import type { formType } from '../../redux/slice/uiSlice';

// Add `className` to the Props interface if it's not already there
interface Props {
  data: CommonerSliceType;
  className?: string;
  formType: formType;
}

export const PrintableInvoice = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { data, formType } = props;
  
  const componentClasses = `invoice-wrapper ${props.className || ''}`.trim();

  const totalAmount = data.items.reduce((sum, item) => {
    const amount = Number(item.quantity) * Number(item.rate);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalInWords = numberToWords(totalAmount);

  return (
    <div ref={ref} className={componentClasses}>
        
        <h3 className="invoice-title">{formType.replace(/_/g, " ")}</h3>
        <div style={{border:"1px solid black"}}>

        {/* Section 1: Exporter and Refs */}
        <div className="header-grid">
          <div className="box exporter">
            <strong>Exporter</strong>
            <p>{data.exporter}</p>
          </div>
          <div className={`box pro-ref ${(formType === "CARGO_MANIFEST")? "non-cargo" : ""}`}><strong>Invoice Ref & Date:</strong><p>{data.invoiceRef}{data.invoiceDate && `, ${data.invoiceDate}`}</p></div>
          {(formType === "COMMERCIAL_INVOICE" || formType === "PROFORMA_INVOICE") ? <div className="box exporter-ref"><strong>Exporter's Reference No.:</strong><p>{data.exportersRefNo}</p></div> : ''}
          <div className="box importer-ref"><strong>Importer's {(formType === "COMMERCIAL_INVOICE" || formType === "CARGO_MANIFEST") ? "Order" : "Ref"} No. & Date:</strong><p>{data.importersRef}{data.importersDate && `, ${data.importersDate}`}</p></div>
          { (formType === 'COMMERCIAL_INVOICE' || formType === 'CARGO_MANIFEST') ? <div className="box other-ref "><strong>Other Reference ( If any)</strong><p>{data.otherRef}</p></div> : ''}
        </div>

        {/* Section 2: Consignee and Countries */}
        <div className="consignee-grid">
          <div className="box consignee">
              <strong>Consignee</strong>
              <p>{data.consignee}</p>
          </div>
          <div className='box remarks'><strong>Remarks:</strong><p>{data.remarks}</p></div>
          <div className="box origin-country"><strong>Country of Origin of {(formType === "CARGO_MANIFEST" || formType === "COMMERCIAL_INVOICE" )?"Cargo / ":''}Goods:</strong><p>{data.countryOfOrigin}</p></div>
          <div className="box final-country"><strong>Country of Final Destination:</strong><p>{data.countryOfFinalDestination}</p></div>
          {/* <div className="box delivery-terms"><strong>Terms of Delivery and Payments Terms:</strong><p>{data.termsOfDelivery}</p></div> */}
        </div>

        {/* Section 3: Transport Details */}
        <div className="transport-section">
            {/* --- Left Panel --- */}
            <div className="transport-left-panel">
                <div className="box carriage"><strong>{(formType === "COMMERCIAL_INVOICE" || formType === "CARGO_MANIFEST") ? "Pre Carriage By" : "Carriage By"}</strong><p>{data.carriageBy}</p></div>
                <div className="box receipt"><strong>Place By Receipt by Pre Carrier:</strong><p>{data.placeByReceiptByPreCarrier}</p></div>
                <div className="box port-of-loading"><strong>Port of Loading/Dispatch:</strong><p>{data.portOfLoading}</p></div>
                <div className="box discharge"><strong>Port of Discharge:</strong><p>{data.portOfDischarge}</p></div>
                <div className="box final-destination"><strong>Final Destination:</strong><p>{data.finalDestination}</p></div>
            </div>
            {/* --- Right Panel --- */}
            <div className="transport-right-panel">
                <div className="box payment-terms"><strong>Terms of Delivery and Payments Terms:</strong><p>{data.termsOfDelivery}</p></div>
                <div className="box incoterms"><strong>A. Incoterms:</strong><p>{data.incoTerms}</p></div>
                <div className="box payment-terms"><strong>B. Payment Terms:</strong><p>{data.paymentTerms}</p></div>
            </div>
        </div>
        
        {/* Section 4: Items Table */}
        <div className="items-table-container">
          <table>
            <thead>
              <tr>
                <th>Marks & No.s/Container No.</th>
                <th>No. & Kind of</th>
                <th>Description of Cargo</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => {
                const amount = Number(item.quantity) * Number(item.rate);
                return (
                  <tr key={item.id}>
                    <td><div>{item.marksNo}</div></td>
                    <td><div>{item.noAndKind}</div></td>
                    <td><div className='item-description'>{item.description}</div></td>
                    <td><div>{item.quantity}</div></td>
                    <td><div>{isNaN(Number(item.rate)) ? '' : Number(item.rate).toFixed(2)}</div></td>
                    <td><div>{isNaN(amount) ? '' : amount.toFixed(2)}</div></td>
                  </tr>
                );
              })}
              {/* Add empty rows to ensure the table has a minimum height */}
              {/* {Array.from({ length: data.items.length }).map((_, i) => (
                  <tr key={`empty-${i}`} className="empty-row">
                      <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>
                  </tr>
              ))} */}
            </tbody>
          </table>
        </div>

        {/* Section 5: Footer */}
        <div className="footer-grid">
          {(formType === "PROFORMA_INVOICE" || formType === "COMMERCIAL_INVOICE") ? <>
            <div className="box amount-word">
                <strong>Amount Chargeable (In Word):</strong>
                <p>{totalInWords}</p>
            </div>
            <div className="box total">
                ...................................... Total
                <p className="total-amount-value">{totalAmount.toFixed(2)}</p>
            </div>
            <div className="box declaration">
              <strong>Declaration:</strong> I hereby declare that the prices indicated in the Proforma Invoice are actual price and all particulars given as above are true and correct to the best of my knowledge & belief.
            </div>
          </> : ''}
          <div className="box signature">
            <strong>Signature & Date</strong>
            <p>(With Stamp)</p>
          </div>
        </div>
      </div>
    </div>
  );
});