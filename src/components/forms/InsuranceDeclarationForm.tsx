import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { type CommonerSlice as CommonerSliceType, type insuranceDeclarationSliceType, type InvoiceItem } from '../../types.ts';
import '../../assets/css/Invoiceform.css'; // Form-specific styles
import { useDispatch, useSelector } from 'react-redux';
import { type formType } from '../../redux/slice/uiSlice.ts';
import { type AppDispatch, type RootState } from '../../redux/store.ts';
import { updateCommoner } from '../../redux/slice/commonerSlice.ts';
import { printHandler } from '../../functions/printHandler.tsx';
import { updateInsuranceDeclaration } from '../../redux/slice/insuranceDeclarationSlice.ts';
import { PrintableInsuranceDeclaration } from '../layouts/InsuranceDeclarationLayout.tsx';

interface Props {
  formType: formType,
}

export const InsuranceDeclaration = ({formType}:Props) => {
  // const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const invoiceData = useSelector((state:RootState) => state.commoner);
  const insuranceDeclarationData = useSelector((state:RootState)=>state.insuranceDeclaration);
  const dispatch = useDispatch<AppDispatch>();

  const printableRef = useRef<HTMLDivElement>(null);

  const handlePrint = React.useCallback( () =>{ printHandler(printableRef,'/insurancedeclarationlayout.css') }, [printableRef.current] );

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof CommonerSliceType;

    dispatch(updateCommoner({ key ,value}))
  };

  const handleInsuranceDeclarationChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name,value } = e.target;
    const key = name as keyof insuranceDeclarationSliceType;

    dispatch(updateInsuranceDeclaration({key,value}));
  }

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const items:InvoiceItem[] = [...invoiceData.items];
    items[index] = { ...items[index], [name]: value };

    dispatch(updateCommoner({key:"items",value: items}))
  };

  const addItem = () => {

    const items:InvoiceItem[] = [...invoiceData.items];
    items.push(
      { id: Date.now(), marksNo: '', noAndKind: '', description: '', quantity: '', rate: '', remarks:'', fobValue:'', grossWeight:'', itemNumber:'', numberAndDateOfInvoice:'', originCriterion:'', grossMeasurement:''}
    )

    dispatch(updateCommoner({key:"items",value: items}));
  };

  const removeItem = (index: number) => {

    let items:InvoiceItem[] = [...invoiceData.items];
    items = invoiceData.items.filter((_, i) => i !== index);

    dispatch(updateCommoner({key:"items",value: items}));
  };

  return (
    <div className="form-and-print-container">
          <h1>{formType.replace(/_/g, " ")} Details</h1>
          <div className="invoice-form">
            {/* Party Details */}
            <fieldset>
              <legend>Parties</legend>
              <label>Name of General Insurance Company:</label>
              <input type="text" name="nameOfInsuranceCompany" value={insuranceDeclarationData.nameOfInsuranceCompany} onChange={handleInsuranceDeclarationChange}/>
              <label>Address of General Insurance Company:</label>
              <textarea name="addressOfInsuranceCompany" value={insuranceDeclarationData.addressOfInsuranceCompany} onChange={handleInsuranceDeclarationChange}></textarea>
              <label>Insured:</label>
              <input type="text" name="insured" value={insuranceDeclarationData.insured} onChange={handleInsuranceDeclarationChange}/>
              <label>From:</label>
              <input type="text" name="from" value={insuranceDeclarationData.from} onChange={handleInsuranceDeclarationChange}/>
            </fieldset>
            
            {/* Reference Details */}
            <fieldset>
              <legend>Insurance Details</legend>      
               <label>Premium Rate:</label>
               <input type="text" name="premiumRate" value={insuranceDeclarationData.premiumRate} onChange={handleInsuranceDeclarationChange} />
               <label>Marine:</label>
               <input type="text" name="marine" value={insuranceDeclarationData.marine} onChange={handleInsuranceDeclarationChange} />
               <label>War:</label>
               <input type="text" name="war" value={insuranceDeclarationData.war} onChange={handleInsuranceDeclarationChange} />
               <label>SRCC:</label>
               <input type="text" name="srcc" value={insuranceDeclarationData.srcc} onChange={handleInsuranceDeclarationChange} />
               <label>Stamp Duty:</label>
               <input type="text" name="stampDuty" value={insuranceDeclarationData.stampDuty} onChange={handleInsuranceDeclarationChange} />
            </fieldset>
    
            {/* Other Details - Add all other fields similarly */}
            <fieldset>
                <legend>Shipment & Terms</legend>
                <label>Vessel / Flight No </label>
                  <input type="text" name="vesselOrFlightNo" value={invoiceData.vesselOrFlightNo} onChange={handleInvoiceChange} />
                <label>Port of Loading:</label>
                  <input type="text" name="portOfLoading" value={invoiceData.portOfLoading} onChange={handleInvoiceChange} />
                <label> Port of Discharge:</label>
                  <input type="text" name="portOfDischarge" value={invoiceData.portOfDischarge} onChange={handleInvoiceChange} />
                <label> Final Destination:</label>
                  <input type="text" name="finalDestination" value={invoiceData.finalDestination} onChange={handleInvoiceChange} />
                {/* ... Add all other input fields here */}
            </fieldset>
    
            <fieldset>
                <legend>Terms and Instructions</legend>
                <label>Terms of Insurance:</label>
                <textarea name="termsOfInsurance" value={insuranceDeclarationData.termsOfInsurance} onChange={handleInsuranceDeclarationChange}/>
                <label>Special Instruction; If any:</label>
                <textarea name="specialInstructions" value={insuranceDeclarationData.specialInstructions} onChange={handleInsuranceDeclarationChange} />      
            </fieldset>
    
            {/* Items Section */}
            <fieldset className="full-width-fieldset">
              <legend>Items</legend>
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="item-row">
                  <input type="text" name="marksNo" placeholder="Marks & No.s" value={item.marksNo} onChange={(e) => handleItemChange(index, e)} />
                  <input type="text" name="noAndKind" placeholder="No. & Kind of" value={item.noAndKind} onChange={(e) => handleItemChange(index, e)} />
                  <textarea className='form-item-description' name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
                  <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
                  <textarea className='form-item-description' name="remarks" placeholder="Remarks" value={item.remarks} onChange={(e) => handleItemChange(index, e)} />
                  <button type="button" onClick={() => removeItem(index)} className="remove-btn">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="add-item-btn">Add Item</button>
            </fieldset>
    
            {/* <fieldset>
                <legend>Summary</legend>
                <label>Amount Chargeable (In Word):</label>
                <input type="text" name="amountChargeableInWord" value={invoiceData.amountChargeableInWord} onChange={handleChange} />
            </fieldset> */}
    
            <button onClick={handlePrint} className="print-button">Print Invoice</button>
    
          </div>
    
          {/* This is the component that will be printed. It's hidden from the screen view. */}
          <div 
          // className='printable-component'
          >
            <PrintableInsuranceDeclaration formType={formType} ref={printableRef}
            // className='printable-area'
            />
          </div>
        </div>
  );
};