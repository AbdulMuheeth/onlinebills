import React from 'react'
import type { formType } from '../../redux/slice/uiSlice';
// import type { gspSliceType, InvoiceItem as InvoiceItemType} from '../../types';

import '../../assets/css/GSPFormLayout.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

interface Props{
    className?: string;
    formType: formType;
}

const GSPFormLayout = React.forwardRef<HTMLDivElement,Props>((props,ref) => {
  const {formType} = props;

  const invoiceData = useSelector((state:RootState)=>state.commoner);
  const gspFormData = useSelector((state:RootState)=>state.gspForm);

  const componentClasses = `inner-wrapper ${props.className || ''}`.trim();

  return (
    
    <div ref={ref} className={componentClasses}>

      <h3 className='invoice-title'>{formType.replace(/_/g,' ')}</h3>
      <div style={{border:"1px solid black"}}>

        <div className='header-gsp-grid'>
          <div className='box gsp-heading'>
            <strong>GSP (FORM A)</strong>
            <p>_____________</p>
          </div>
        </div>

        {/* section 1 exporter */}
        <div className='exporter-gsp-grid'>
          <div className='box exporter-gsp'>
            <strong>1. Goods consigned from(exporter's business name, address, country)</strong>
            <p>{invoiceData.exporter}</p>
          </div>
          <div className='box consignee-gsp'>
            <strong>2. Goods consigned to(Consignee's name , address, country)</strong>
            <p>{invoiceData.consignee}</p>
          </div>
          <div className='box reference-gsp'>
            <strong>Reference No.</strong>
            <center>
              <p>GENERALIZED SYSTEM OF PREFERENCES<br/>
                                CERTIFICATE OF ORIGIN <br/>
                            (Combined declaration and certificate)<br/>
                                        FORM A
                          issued in {gspFormData.importingCountry} (country)
              </p>
            </center>
          </div>
        </div>

        {/* Section 2 transport and officical use*/}
        <div className='transport-gsp-grid'>
          <div className='box transport-gsp'>
            <strong>3. Means of transport and route(as far as known)</strong>
            <p>{invoiceData.carriageBy}</p>
          </div>
          <div className='box officialuse-gsp'>
            <strong>4. For Official use</strong>
            <p>{gspFormData.officialUse}</p>
          </div>
        </div>


        {/* section 3 items */}
        <div className='items-gsp-grid'>
          <table>
            <thead>
              <tr>
                <th className='width1'>Item Number</th>
                <th className='width2'>6.Marks and number of packages</th>
                <th className='width3'>7.Number and kind of packages; description of goods</th>
                <th className='width4'>8.Origin criterion(see notes overleaf)</th>
                <th className='width5'>9.Gross weight or other quantity</th>
                <th className='width6'>10.Number and date of invoice</th>
              </tr>
            </thead>
            <tbody>
              {gspFormData.items.map((item)=>(
                <tr key={item.itemNumber}>
                  <td><div>{item.itemNumber}</div></td>
                  <td><div>{item.marksNo}</div></td>
                  <td><div className='item-description'>{item.description}</div></td>
                  <td><div>{item.originCriterion}</div></td>
                  <td><div>{item.grossWeight}</div></td>
                  <td><div>{item.numberAndDateOfInvoice}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='certification-gsp-grid'>
          <div className='box certification-gsp'>
              <strong>11. Certification</strong>
              <p className='cell'>
                <span className='cell-content'>It is hereby certified, on the basis of control
                carried out, that the declaration by the exporter is
                correct.</span>
                <br/>
                <span  className='cell-footer'>......................................................................
                <br/>Place and date, signature and stamp of
                certifying authority</span>
              </p>
          </div>

          <div className='box declaration-gsp'>
              <strong>12. Declaration by the exporter</strong>
              <p className='cell'>
                <span className='cell-content'>The undersigned hereby declares that the above details and
                      statements are correct; that all the goods were produced
                      in <b>{gspFormData.issuingCountry}</b> (Country) and that they comply
                      with the origin requirements specified or those goods in the
                      generalized system of preferences for goods exported
                      to <b>{gspFormData.importingCountry}</b> (importing country)</span><br/>
                <span className='cell-footer'>.................................................................................................................
                  <br/> Place and date, signature of authorized signatory</span>
              </p>  
          </div>
        </div>
      </div>
    </div>

  )
})

export default GSPFormLayout