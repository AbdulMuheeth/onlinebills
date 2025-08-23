// src/PrintableInvoice.tsx

import React from 'react';
import { type ProformaInvoiceData } from '../types'; // Make sure this path is correct
import {numberToWords} from '../functions/performaInvoice';
import './ProformaInvoice.css';

// Add `className` to the Props interface if it's not already there
interface Props {
  data: ProformaInvoiceData;
  className?: string;
}

export const PrintableInvoice = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { data } = props;
  
  const componentClasses = `invoice-wrapper ${props.className || ''}`.trim();

  const totalAmount = data.items.reduce((sum, item) => {
    const amount = Number(item.quantity) * Number(item.rate);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalInWords = numberToWords(totalAmount);

  return (
    <div ref={ref} className={componentClasses}>
      <h3 className="invoice-title">Proforma Invoice</h3>

      {/* Section 1: Exporter and Refs */}
      <div className="header-grid">
        <div className="box exporter">
          <strong>Exporter</strong>
          <p>{data.exporter}</p>
        </div>
        <div className="box pro-ref"><strong>Pro Ref & Date:</strong><p>{data.proRefAndDate}</p></div>
        <div className="box exporter-ref"><strong>Exporter's Reference No.:</strong><p>{data.exportersRefNo}</p></div>
        <div className="box importer-ref"><strong>Importer's Ref No. & Date:</strong><p>{data.importersRefAndDate}</p></div>
      </div>

      {/* Section 2: Consignee and Countries */}
      <div className="consignee-grid">
        <div className="box consignee">
            <strong>Consignee</strong>
            <p>{data.consignee}</p>
        </div>
        <div className="box origin-country"><strong>Country of Origin of Goods:</strong><p>{data.countryOfOrigin}</p></div>
        <div className="box final-country"><strong>Country of Final Destination:</strong><p>{data.countryOfFinalDestination}</p></div>
        <div className="box delivery-terms"><strong>Terms of Delivery and Payments Terms:</strong><p>{data.termsOfDelivery}</p></div>
      </div>

      {/* Section 3: Transport Details */}
      <div className="transport-section">
          {/* --- Left Panel --- */}
          <div className="transport-left-panel">
              <div className="box carriage"><strong>Carriage By:</strong><p>{data.carriageBy}</p></div>
              <div className="box receipt"><strong>Place By Receipt by Pre Carrier:</strong><p>{data.placeByReceiptByPreCarrier}</p></div>
              <div className="box port-of-loading"><strong>Port of Loading/Dispatch:</strong><p>{data.portOfLoading}</p></div>
              <div className="box discharge"><strong>Port of Discharge:</strong><p>{data.portOfDischarge}</p></div>
              <div className="box final-destination"><strong>Final Destination:</strong><p>{data.finalDestination}</p></div>
          </div>
          {/* --- Right Panel --- */}
          <div className="transport-right-panel">
              <div className="box incoterms"><strong>A. Incoterms:</strong><p>{data.incoterms}</p></div>
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
                  <td>{item.marksNo}</td>
                  <td>{item.noAndKind}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{isNaN(Number(item.rate)) ? '' : Number(item.rate).toFixed(2)}</td>
                  <td>{isNaN(amount) ? '' : amount.toFixed(2)}</td>
                </tr>
              );
            })}
            {/* Add empty rows to ensure the table has a minimum height */}
            {Array.from({ length: Math.max(0, 10 - data.items.length) }).map((_, i) => (
                <tr key={`empty-${i}`} className="empty-row">
                    <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 5: Footer */}
      <div className="footer-grid">
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
        <div className="box signature">
          <strong>Signature & Date</strong>
          <p>(With Stamp)</p>
        </div>
      </div>
    </div>
  );
});