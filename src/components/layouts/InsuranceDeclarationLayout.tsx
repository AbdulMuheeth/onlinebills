// src/PrintableInvoice.tsx

import React from 'react';
import '../../assets/css/InsuranceDeclarationLayout.css';
import type { formType } from '../../redux/slice/uiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

// Add `className` to the Props interface if it's not already there
interface Props {
  // data: CommonerSliceType;
  className?: string;
  formType: formType;
}

export const PrintableInsuranceDeclaration = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  
  const { formType } = props;
  const invoiceData = useSelector((state:RootState)=>state.commoner);
  const insuranceDeclarationData = useSelector((state:RootState)=>state.insuranceDeclaration);
  
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

        {/* Section 1: Exporter and Refs
        <div className="header-ID-grid">
          
        </div> */}

        {/* Section 2: Consignee and Countries */}
        <div className="consignee-ID-grid">
          <div className="consignee-left-panel">
            <div className="box general-insurance">
                <strong>Name and Address of General Insurance Company( along with LOGO)</strong>
                <p>{insuranceDeclarationData.nameOfInsuranceCompany}, {insuranceDeclarationData.addressOfInsuranceCompany}</p>
            </div>
            <div className="box default-message">
                {/* <strong></strong> */}
                <p>Please issue a marine certificate/policy in duplicate/ triplicate/ quadruplicate in accordance with the following particulars.</p>
            </div>
            <div className='box insured-SI'>
                <strong>Insured:</strong>
                <p>{insuranceDeclarationData.insured}</p>
            </div>
            <div className='box from-SI'>
                <strong>From:</strong>
                <p>{insuranceDeclarationData.from}</p>
            </div>
            <div className="box vesselno"><strong>Vessel / Flight No</strong><p>{invoiceData.vesselOrFlightNo}</p></div>
            <div className="box port-of-loading"><strong>Port of Loading:</strong><p>{invoiceData.portOfLoading}</p></div>
            <div className="box discharge"><strong>Port of Discharge:</strong><p>{invoiceData.portOfDischarge}</p></div>
            <div className="box final-destination"><strong>To/Place of Destination</strong><p>{invoiceData.finalDestination}</p></div>
          </div>
          <div className='consignee-right-panel'>
            <div className="box message">
              <center>
                For the Official Use only   <br/><br/>
                Accepted For the ………………………… <br/><br/>
                Authorized Signatory <br/><br/><br/>
              </center>
              <strong>Premium Rate:</strong> <p>{insuranceDeclarationData.premiumRate}</p>
              <strong>Marine:</strong><p>{insuranceDeclarationData.marine}</p>
              <strong>War:</strong><p>{insuranceDeclarationData.war}</p>
              <strong>SRCC:</strong><p>{insuranceDeclarationData.srcc}</p>
              <strong>Stamp Duty:</strong><p>{insuranceDeclarationData.stampDuty}</p>
            </div>
          </div>
          
        </div>

        
        {/* Section 4: Items Table */}
        <div className="items-ID-table-container">
          <table>
            <thead>
              <tr>
                <th>Marks & No./Containers No.</th>
                <th>No. & kind of Packages/Carton/ Containers</th>
                <th>Description of Goods</th>
                <th>Important/ Remarks</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => {
                
                return (
                  <tr key={item.id}>
                    <td><div>{item.marksNo}</div></td>
                    <td><div>{item.noAndKind}</div></td>
                    <td><div className='item-description'>{item.description}</div></td>
                    <td><div className='item-description'>{item.remarks}</div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Section 5: Footer */}
        <div className="footer-ID-grid">
          
            <div className="box insurance-terms">
                <strong>Terms of Insurance:</strong>                
                <p>{insuranceDeclarationData.termsOfInsurance}</p>
            </div>

            <div className='box special-instructions'>
                <strong>Special Instruction; If any:</strong>
                <p>{insuranceDeclarationData.specialInstructions}</p>
            </div>
        </div>
      </div>
    </div>
  );
});