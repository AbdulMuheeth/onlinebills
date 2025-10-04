// src/PrintableInvoice.tsx

import React from 'react';
import '../../assets/css/QualityControlLayout.css';
import type { formType } from '../../redux/slice/uiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

// Add `className` to the Props interface if it's not already there
interface Props {
  // data: CommonerSliceType;
  className?: string;
  formType: formType;
}

export const PrintableQualityControl = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  
  const { formType } = props;
  const invoiceData = useSelector((state:RootState)=>state.commoner);
  const qualityControlData = useSelector((state:RootState)=>state.qualityControl);
  
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
            <strong>Exporter’s Name Address</strong>
            <p>{invoiceData.exporter}, {invoiceData.exporterAddress}</p>
          </div>
          <div className='box ref-no'><strong>Invoice No. & Date</strong><p>{invoiceData.invoiceRef}, {invoiceData.invoiceDate}</p></div>
          <div className="box ref-date"><strong>Exporter's  Ref.</strong><p>{invoiceData.exportersRefNo}</p></div> 
          <div className="box ref-buyer"><strong>Buyer’s Order No. & Date</strong><p>{qualityControlData.buyerOrderNumber}, {qualityControlData.buyerOrderDate}</p></div> 
        </div>

        {/* Section 2: Consignee and Countries */}
        <div className="consignee-QC-grid">
          <div className="consignee-left-panel">
            <div className="box manufacturer">
                <strong>Manufacturer’s Name & Address</strong>
                <p>{qualityControlData.manufacturerName}, {qualityControlData.manufacturerAddress}</p>
            </div>
            <div className="box manufacturerDetails">
                <strong>Details of the Manufacturer’s Seal, if any</strong>
                <p>{qualityControlData.manufacturerDetails}</p>
            </div>  
            <div className="box inspection-required"><strong>Inspection required on</strong><p>{qualityControlData.inspectionRequiredOn}</p></div>
            <div className="box weekly-holiday"><strong>Weekly Holiday</strong><p>{qualityControlData.weeklyHoliday}</p></div> 
            <div className="box vesselno"><strong>Vessel / Flight No</strong><p>{invoiceData.vesselOrFlightNo}</p></div>
            <div className="box port-of-loading"><strong>Port of Loading:</strong><p>{invoiceData.portOfLoading}</p></div>
            <div className="box probable-loading-date"><strong>Probable Date of Loading</strong><p>{qualityControlData.probableDateOfLanding}</p></div>
            <div className="box date-of-sealing"><strong>Date of Sealing/Flight</strong><p>{qualityControlData.dateOfSealingOrFlight}</p></div>
          </div>
          <div className='consignee-right-panel'>
            <div className="box message">
              To<br/>
              The {qualityControlData.inspectionAuthorityName},<br/>
              {qualityControlData.inspectionAuthorityAddress}<br/> <br/> <br/>
                Please inspect the consignment and issue a Certificate of
                inspection under the export of Dried Fish Maws (Quality
                Control and Inspection) Rule 2002. A crossed cheque for
                Rs.………..………………….drawn
                on…………………………………………is enclosed as inspection
                fee/Please debit our Account Pass Book
                No..…………….enclosed.<br/><br/>
                <div className='message-signature'>
                    <p>Date</p>
                    <p>Signature of Exporter</p>
                </div>
            </div>
            <div className="box inspection-address"><strong>Address where consignment is to be inspected</strong><p>{qualityControlData.addressOfInspection}</p></div>
          </div>
          
        </div>

        
        {/* Section 4: Items Table */}
        <div className="items-QC-table-container">
          <table>
            <thead>
              <tr>
                <th>Marks & No.s/Container No.</th>
                <th>No. & Kind of</th>
                <th>Description of Cargo <br/><span className='inline-th-description'>Description should include grade, size and brand.</span></th>
                <th>Quantity (No)</th>
                <th>FOB Value (in Rs. Or US$)</th>
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
                    <td><div>{item.fobValue}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className='technical-requirement-QC'>
            <strong>Technical requirements including specifications/approved samples with its characteristics as stipulated in the export contract</strong>                
            <p>{qualityControlData.technicalRequirement}</p>
        </div>
        <div className='relevant-information-QC'>
            <strong>Other Relevant Information</strong>                
            <p>{qualityControlData.otherRelevantInformation}</p>

        </div>

        {/* Section 5: Footer */}
        <div className="footer-QC-grid">
          
            <div className="box declaration">
                <strong>Declaration:</strong>                
                <p>
                    Certified that the goods mentioned above have been manufactured/produced to satisfy the conditions
                    relating to quality control/inspection applicable to them under the export …………………(Quality Control and Inspection)
                    Rule 2002 and that consignment conforms to the specification <br/><br/>
                    Certified that the goods have been offered previously for inspection vide intimation no. ………………………………………. Dated
                    ………………………. and the defects as pointed out earlier have been duly rectified.
                </p>
            </div>
            
            {/* <div className='box'>
            </div> */}
            <div className='box'>
                <p>Certified that no additional technical or quality requirements other than mentioned above have been & Date stipulated by the overseas buyer.</p>
            </div>
          <div className="box signature">
            <p><strong>Signature</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
});