// src/PrintableInvoice.tsx

import React from 'react';
import '../../assets/css/ShipmentAdviceLayout.css';
import type { formType } from '../../redux/slice/uiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { numberToWords } from '../../functions/performaInvoice';

// Add `className` to the Props interface if it's not already there
interface Props {
  // data: CommonerSliceType;
  className?: string;
  formType: formType;
}

export const PrintableShippingAdvice = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  
  const { formType } = props;
  const invoiceData = useSelector((state:RootState)=>state.commoner);
  const shippingInstructionData = useSelector((state:RootState)=>state.shippingInstructions);
  const shipmentAdviceData = useSelector((state:RootState)=>state.shipmentAdvice);

  const totalAmount = invoiceData.items.reduce((sum, item) => {
      const amount = Number(item.quantity) * Number(item.rate);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

  const totalInWords = numberToWords(totalAmount);

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
        <div className="header-QC-grid">
          <div className="box exporter">
            <strong>Exporter</strong>
            <p>{invoiceData.exporter}</p>
          </div>
          <div className='box ref-no'><strong>Invoice No. & Date</strong><p>{invoiceData.invoiceRef}, {invoiceData.invoiceDate}</p></div>
          <div className="box ref-date"><strong>Exporter's  Ref.</strong><p>{invoiceData.exportersRefNo}</p></div> 
          <div className="box ref-buyer"><strong>Importer’s Order No. & Date</strong><p>{invoiceData.importersRef}, {invoiceData.importersDate}</p></div> 
        </div>

        {/* Section 2: Consignee and Countries */}
        <div className="consignee-SA-grid">
          <div className="consignee-left-panel">
            <div className="box manufacturer">
                <strong>Consignee</strong>
                <p>{invoiceData.consignee}</p>
            </div>
            <div className="box manufacturerDetails">
                <strong>Notify Party</strong>
                <p>{shippingInstructionData.notifyPartyName}</p>
            </div>  
            <div className="box carriage-SA"><strong>Pre Carriage By</strong><p>{invoiceData.carriageBy}</p></div>
            <div className="box receipt"><strong>Place By Receipt:</strong><p>{invoiceData.placeByReceiptByPreCarrier}</p></div>
            <div className="box vesselno"><strong>Vessel / Flight No</strong><p>{invoiceData.vesselOrFlightNo}</p></div>
            <div className="box port-of-loading"><strong>Port of Loading:</strong><p>{invoiceData.portOfLoading}</p></div>
            <div className="box discharge"><strong>Port of Discharge:</strong><p>{invoiceData.portOfDischarge}</p></div>
            <div className="box final-destination"><strong>Place of Destination:</strong><p>{invoiceData.finalDestination}</p></div>
          </div>
          <div className='consignee-right-panel'>
            <div className="box document">
              <strong>Documents being negotiated/sent:</strong><br/><br/>
              <div className='document-selection'>
                <strong>Commercial Invoice</strong>
                <p>( {shipmentAdviceData.documentsSent.commercialInvoice ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Custom/Consular Invoice</strong>
                <p>( {shipmentAdviceData.documentsSent.customOrConsularInvoice ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Packing List</strong>
                <p>( {shipmentAdviceData.documentsSent.packingList ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Bill of Lading/Air Way Bill</strong>
                <p>( {shipmentAdviceData.documentsSent.billOfLadingOrAirWayBill ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Insurance Certificate / Policy</strong>
                <p>( {shipmentAdviceData.documentsSent.insuranceCertificateOrPolicy ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Bill of Exchange</strong>
                <p>( {shipmentAdviceData.documentsSent.billOfExchange ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Certificate of Origin</strong>
                <p>( {shipmentAdviceData.documentsSent.certificateOfOrigin ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>GSP/GSTP/ Other Certificate of Origin</strong>
                <p>( {shipmentAdviceData.documentsSent.GSPOrGSTPOrOtherCertificateofOrigin ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Export Certificate ( If needed)</strong>
                <p>( {shipmentAdviceData.documentsSent.exportCertificateIfNeeded ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Inspection Certificate</strong>
                <p>( {shipmentAdviceData.documentsSent.inspectionCertificate ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Weight Certificate</strong>
                <p>( {shipmentAdviceData.documentsSent.weightCertificate ? "Yes" : "No"} )</p>
              </div>
              <div className='document-selection'>
                <strong>Any Other Documents ( If needed)</strong>
                <p>( {shipmentAdviceData.documentsSent.anyOtherDocuments ? "Yes" : "No"} )</p>
              </div>
            </div>
            {/* <div className="box inspection-address"><strong>Address where consignment is to be inspected</strong><p>{qualityControlData.addressOfInspection}</p></div> */}
          </div>
          
        </div>

        
        {/* Section 4: Items Table */}
        <div className="items-QC-table-container">
          <table>
            <thead>
              <tr>
                <th>Marks & No./Containers No.</th>
                <th>No. & kind ofPackages/ Carton/Containers </th>
                <th>Description of Goods</th>
                <th>Quantity</th> 
                <th>Rate</th>
                <th>Amount</th>
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
                    <td><div>{item.rate}</div></td>
                    <td><div>{Number(item.rate)*Number(item.quantity)}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

       
        {/* Section 5: Footer */}
        <div className="footer-SA-grid">
            
            <div className="box amount-in-words-SA">
                Amount ( in Rs or US Dollar): <b>{totalInWords}</b>
            </div>
            <div className="box total-amount-SA">
              <strong>Total:</strong>
              <p>{totalAmount}</p>
            </div>

            <div className="box declaration">
                {/* <strong>Declaration:</strong>                 */}
                <p>
                    We have shipped the goods as per details given herein and are negotiating the above listed documents under documentary credit of <b> {shipmentAdviceData.nameOfBank}, {shipmentAdviceData.addressOfBank} </b>( Name & Address of Bank) <br/><br/>
                    OR <br/>
                    We are sending the above listed documents for collection through <b> {shipmentAdviceData.nameOfBank}, {shipmentAdviceData.addressOfBank} </b> ( Name & Address of Bank)<br/>
                    We have also dispatched the following documents through <b>{shipmentAdviceData.carrier}</b> ( Carrier)
                </p>
            </div>
            
            {/* <div className='box'>
            </div> */}
            <div className='box'>
                <p>
                  Flight No: {shipmentAdviceData.flightNo} & Date ……………………………………. <br/>
                  Date:<br/>
                  ( {shipmentAdviceData.documentsSent.GSPOrGSTPOrOtherCertificateofOrigin? shipmentAdviceData.certificateOriginType : "No"} ) Certificate of Origin ( GSP/GSTP/Other ( Specify)<br/>
                  ( {shipmentAdviceData.documentsSent.exportCertificateIfNeeded ? "Yes" : "No"} ) Export Certificate<br/>
                  ( {(shipmentAdviceData.documentsSent.commercialInvoice || shipmentAdviceData.documentsSent.customOrConsularInvoice) ? "Yes" : "No"} ) Invoice<br/>
                  ( {(shipmentAdviceData.documentsSent.packingList) ? "Yes" : "No"} ) Packing List/ Cargo Manifest<br/>
                </p>
            </div>
          <div className="box signature">
            <p><strong>Signature & Date</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
});