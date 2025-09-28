// src/PrintableInvoice.tsx

import React from 'react';
import { type CommonerSlice as CommonerSliceType } from '../../types'; // Make sure this path is correct
import {numberToWords} from '../../functions/performaInvoice';
import '../../assets/css/CertificateOriginLayout.css';
import type { formType } from '../../redux/slice/uiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

// Add `className` to the Props interface if it's not already there
interface Props {
  // data: CommonerSliceType;
  className?: string;
  formType: formType;
}

export const PrintableCertificateOrigin = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  
  const { formType } = props;
  const invoiceData = useSelector((state:RootState)=>state.commoner);
  const certificationOriginFormData = useSelector((state:RootState)=>state.certifcateOriginForm);
  
  const componentClasses = `invoice-wrapper ${props.className || ''}`.trim();

  // const totalAmount = .items.reduce((sum, item) => {
  //   const amount = Number(item.quantity) * Number(item.rate);
  //   return sum + (isNaN(amount) ? 0 : amount);
  // }, 0);

  // const totalInWords = numberToWords(totalAmount);

  return (
    <div ref={ref} className={componentClasses}>
        
        <h3 className="invoice-title">{formType.replace(/_/g, " ")}</h3>
        <div style={{border:"1px solid black"}}>

        {/* Section 1: Exporter and Refs */}
        <div className="header-CO-grid">
          <div className="box exporter">
            <strong>Exporter</strong>
            <p>{invoiceData.exporter}</p>
          </div>
          <div className='box ref-no'><strong>Reference No.</strong><p>{invoiceData.importersRef}</p></div>
          <div className="box ref-date"><strong>Date:</strong><p>{invoiceData.importersDate}</p></div> 
        </div>

        {/* Section 2: Consignee and Countries */}
        <div className="consignee-CO-grid">
          <div className="consignee-left-panel">
            <div className="box consignee">
                <strong>Consignee</strong>
                <p>{invoiceData.consignee}</p>
            </div>
            <div className="box carriage"><strong>Carriage By</strong><p>{invoiceData.carriageBy}</p></div>
            <div className="box receipt"><strong>Place By Receipt by Pre Carrier:</strong><p>{invoiceData.placeByReceiptByPreCarrier}</p></div>
            <div className="box vesselno"><strong>Vessel / Flight No</strong><p>{invoiceData.vesselOrFlightNo}</p></div>
            <div className="box port-of-loading"><strong>Port of Loading:</strong><p>{invoiceData.portOfLoading}</p></div>
            <div className="box discharge"><strong>Port of Discharge:</strong><p>{invoiceData.portOfDischarge}</p></div>
            <div className="box final-destination"><strong>Final Destination:</strong><p>{invoiceData.finalDestination}</p></div>
          </div>
          <div className='consignee-right-panel'>
            <div className="box message">
              To;<br/>
              The Secretary<br/>
              {certificationOriginFormData.nameOfChamberOfCommerce}<br/>
              {certificationOriginFormData.addressOfChamberOfCommerce}<br/><br/><br/>
              Dear Sir;<br/>
              This is to request you to issue us a Certificate of Origin
              (in <strong>{invoiceData.countryOfOrigin}</strong>) in respect of the
              consignment particulars of which are given herewith.
            </div>
          </div>
          
        </div>

        
        {/* Section 4: Items Table */}
        <div className="items-CO-table-container">
          <table>
            <thead>
              <tr>
                <th>Marks & No.s/Container No.</th>
                <th>No. & Kind of</th>
                <th>Description of Cargo</th>
                <th>Quantity (No)</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => {
                
                return (
                  <tr key={item.id}>
                    <td><div>{item.marksNo}</div></td>
                    <td><div>{item.noAndKind}</div></td>
                    <td><div className='item-description'>{item.description}</div></td>
                    <td><div>{item.quantity}</div></td>
                    <td><div className='item-description'>{item.remarks}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section 5: Footer */}
        <div className="footer-CO-grid">
          
            <div className="box declaration">
                <strong>Declaration by the Exporter:</strong>                
                <p>We hereby declare that to the best of our knowledge and belief the above mentioned goods were produced/manufactured in India</p>
            </div>
            <div>
            </div>
          
          <div className="box signature">
            <p><strong>Signature & Date</strong></p>
            <p>(With Stamp)</p>
          </div>
        </div>
      </div>
    </div>
  );
});