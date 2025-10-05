// src/PrintableInvoice.tsx

import React from 'react';
import '../../assets/css/ShippingInstructionsLayout.css';
import type { formType } from '../../redux/slice/uiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

// Add `className` to the Props interface if it's not already there
interface Props {
  // data: CommonerSliceType;
  className?: string;
  formType: formType;
}

export const PrintableShippingInstruction = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  
  const { formType } = props;
  const invoiceData = useSelector((state:RootState)=>state.commoner);
  const shippingInstructionData = useSelector((state:RootState)=>state.shippingInstructions);  
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
        <div className="header-SI-grid">
          <div className="box exporter">
            <strong>Exporter{formType==="BILL_OF_LADING_(COMBINED_TRANSPORT_AND_PORT_TO_PORT_SHIPMENT)" && "/Shipper"} ( Complete name & Address)</strong>
            <p>{invoiceData.exporter}, {invoiceData.exporterAddress}</p>
          </div>
          {
            formType==="SHIPPING_INSTRUCTIONS" ?
            <>
              <div className='box ref-no'><strong>Invoice No. & Date</strong><p>{invoiceData.invoiceRef}, {invoiceData.invoiceDate}</p></div>
              <div className="box ref-date"><strong>Exporter's  Ref.</strong><p>{invoiceData.exportersRefNo}</p></div> 
            </> :
            <>
              <div className='box ref-no'><strong>Booking No.:</strong><p>{shippingInstructionData.bookingNumber}</p></div>
              <div className="box ref-date"><strong>Bill of Lading No:</strong><p>{shippingInstructionData.billOfLadingNo}</p></div> 
            </>
          }
          {formType === "SHIPPING_INSTRUCTIONS" ?
          <>
            <div className="box ref-buyer"><strong>Importer's Reference No & Date:</strong><p>{invoiceData.importersRef}, {invoiceData.importersDate}</p></div> 
            <div className="box ref-other"><strong>Other Reference (If Any)</strong><p>{invoiceData.otherRef}</p></div> 
          </> :
            <div className="box ref-buyer"><strong>Export Reference:</strong><p>{invoiceData.exportersRefNo}</p></div> 
          }
        </div>

        {/* Section 2: Consignee and Countries */}
        <div className="consignee-SI-grid">
          <div className="consignee-left-panel">
            <div className="box consignee">
                <strong>Consignee ( Complete Name & Address)</strong>
                <p>{invoiceData.consignee}, {invoiceData.consigneeAddress}</p>
            </div>
            <div className="box notifyparty">
                <strong>Notify Party ( Complete Name & Address)</strong>
                <p>{shippingInstructionData.notifyPartyName},{shippingInstructionData.notifyPartyAddress}</p>
            </div>  
          </div>
          <div className='consignee-right-panel'>
            <div className='box forwarding-agent'>
              <strong>{formType === "SHIPPING_INSTRUCTIONS" ? "Forwarding Agent/CHA:" : "Forwarding Agent Reference:" }</strong>
              <p>{shippingInstructionData.forwardingAgent}</p>
            </div>
            {
              formType === "SHIPPING_INSTRUCTIONS" ?
                <>
                  <div className="box origin-country"><strong>Country of Origin of Goods:</strong><p>{invoiceData.countryOfOrigin}</p></div>
                  <div className="box final-country"><strong>Country of Final Destination:</strong><p>{invoiceData.countryOfFinalDestination}</p></div>
                </>:
                <div className="box origin-bl-country"><strong>Point & Country of Origin:</strong><p>{invoiceData.pointOfOrigin}, {invoiceData.countryOfOrigin}</p></div>
            }
          </div>
          
        </div>

        {/* Section 3: Items Table */}
        <div className="transport-section">
            {/* --- Left Panel --- */}
            <div className="transport-left-panel">
                <div className="box carriage"><strong>Pre Carriage By</strong><p>{invoiceData.carriageBy}</p></div>
                <div className="box receipt"><strong>Place By Receipt:</strong><p>{invoiceData.placeByReceiptByPreCarrier}</p></div>
                <div className="box port-of-loading"><strong>Port of Loading:</strong><p>{invoiceData.portOfLoading}</p></div>
                <div className="box discharge"><strong>Port of Discharge:</strong><p>{invoiceData.portOfDischarge}</p></div>
                <div className="box final-destination"><strong>Final Destination:</strong><p>{invoiceData.finalDestination}</p></div>
            </div>
            {/* --- Right Panel --- */}
            <div className="transport-SI-right-panel">
                <div className="box export-instruction"><strong>Domestic Routing and Export Instructions</strong><p>{shippingInstructionData.exportInstructions}</p></div>
                <div className="box onward-routing"><strong>Onward Inland Routing</strong><p>{shippingInstructionData.onwardInlandRouting}</p></div>
            </div>
        </div>

        
        {/* Section 4: Items Table */}
        <div className="items-SI-table-container">
          <table>
            <thead>
              <tr>
                <th>Marks & No.s/Container No./ Seal No.</th>
                <th>Marks & No.s/Container No./ Seal No.</th>
                <th>Description of Cargo <br/><span className='inline-th-description'>This part is for Merchant use only and is not part of Bill of lading Contract</span></th>
                <th>Shipper Gross Weight</th>
                <th>Shipper Gross Measurement</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => {
                
                return (
                  <tr key={item.id}>
                    <td><div>{item.marksNo}</div></td>
                    <td><div>{item.noAndKind}</div></td>
                    <td><div className='item-description'>{item.description}</div></td>
                    <td><div>{item.grossWeight}</div></td>
                    <td><div>{item.grossMeasurement}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section 5: footer */}
        <div className='footer-SI-grid'>
            <div className='box freigth-charges'>
              <strong>Freight & Charges</strong>
              <p>{shippingInstructionData.freightAndCharges}</p>
            </div>
            <div className='footer-right-panel'>
              <div className='box message'>
                RECEIVED FOR SHIPMENT from the MERCHANT in apparent good order and
                condition unless otherwise stated herein, the GOODS mentioned above to be
                transported as provided herein, by any mode of transport for all or any part of the
                Carriage, SUBJECT TO ALL THERE TERMS AND CONDITIONS appearing on the face
                and back hereof and in the CARRIER's applicable Tariff, and are available
                electronically at www.air7seas.com, to which the Merchant agrees by accepting the
                BILL OF LADING. Where applicable law requires and not otherwise, one BILL OF
                LADING must be surrendered, duly endorsed, in exchange for the GOODS or
                CONTAINER/s or other PACKAGE/s, the others to stand void. If a 'Non-Negotiable'
                BILL OF LADING is issued, neither an original nor a copy need be surrendered in
                exchange for delivery unless applicable law so requires.
              </div>
              <div className='box freight-payable'>
                <strong>Freight Payable at:</strong>
                <p>{shippingInstructionData.freightPayableAt}</p>
              </div>
              <div className='box place-of-issue'>
                <strong>Date & Place of Issue</strong>
                <p>{new Intl.DateTimeFormat('en-CA',{ year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())},{shippingInstructionData.placeOfIssue}</p>
              </div>
              <div className='box declared-value'>
                <strong>Declared Value in Us Dolor ( See Clause 6)</strong>
                <p>{shippingInstructionData.declaredValue}</p>
              </div>
              <div className='box signature'>
                <strong>Signed By Carrier</strong>
              </div>
              <div className='box bill-lading'>
                <strong>No.of Original Bill of Lading</strong>
                <p>{shippingInstructionData.noOfOriginalBillOfLading}</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
});