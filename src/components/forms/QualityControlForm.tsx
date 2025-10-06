import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { type CommonerSlice as CommonerSliceType, type InvoiceItem, type qualityControlSliceType } from '../../types.ts';
import '../../assets/css/Invoiceform.css'; // Form-specific styles
import { useDispatch, useSelector } from 'react-redux';
import { type formType } from '../../redux/slice/uiSlice.ts';
import { type AppDispatch, type RootState } from '../../redux/store.ts';
import { updateCommoner } from '../../redux/slice/commonerSlice.ts';
import { printHandler } from '../../functions/printHandler.tsx';
import { updateQualityControl } from '../../redux/slice/qualityControlSlice.ts';
import { PrintableQualityControl } from '../layouts/QualityControlLayout.tsx';

interface Props {
  formType: formType,
}

export const QualityControl = ({formType}:Props) => {
  // const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const invoiceData = useSelector((state:RootState) => state.commoner);
  
  const qualityControlData = useSelector((state:RootState)=>state.qualityControl);
  const dispatch = useDispatch<AppDispatch>();

  const printableRef = useRef<HTMLDivElement>(null);
  

  const handlePrint = React.useCallback( () =>{ printHandler(printableRef,'/qualitycontrol.css') }, [printableRef.current] );

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof CommonerSliceType;

    dispatch(updateCommoner({ key ,value}))
  };

  const handleQualityControlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = e.target;
    const key = name as keyof qualityControlSliceType;

    dispatch(updateQualityControl({key,value}));
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
      { id: Date.now(), marksNo: '', noAndKind: '', description: '', quantity: '', rate: '', remarks:'', fobValue:'', grossWeight:'', itemNumber:'', numberAndDateOfInvoice:'', originCriterion:'', grossMeasurement:'' }
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
              <label>Exporter:</label>
              <input type="text" name="exporter" value={invoiceData.exporter} onChange={handleInvoiceChange}></input>
              <label>Exporter’s Address</label>
              <textarea name="exporterAddress" value={invoiceData.exporterAddress} onChange={handleInvoiceChange}></textarea>
              <label>Manufacturer’s Name</label>
              <input type="text"  name="manufacturerName" value={qualityControlData.manufacturerName} onChange={handleQualityControlChange}></input>
              <label>Manufacturer’s Address</label>
              <textarea name="manufacturerAddress" value={qualityControlData.manufacturerAddress} onChange={handleQualityControlChange}></textarea>
              <label>Details of the Manufacturer’s Seal (if any)</label>
              <textarea name="manufacturerDetails" value={qualityControlData.manufacturerDetails} onChange={handleQualityControlChange}></textarea>
            </fieldset>
            
            {/* Reference Details */}
            <fieldset>
              <legend>Invoice - Buyer References </legend>      
               <label>Invoice Reference Number</label>
               <input type="text" name="invoiceRef" value={invoiceData.invoiceRef} onChange={handleInvoiceChange} />
               <label>Date:</label>
               <input type="date" name="invoiceDate" value={invoiceData.invoiceDate}onChange={handleInvoiceChange}/>
               <label>Exporter Reference Number</label>
               <input type="text" name="exportersRefNo" value={invoiceData.exportersRefNo} onChange={handleInvoiceChange} />
               <label>Buyer's Order Number</label>
               <input type="text" name="buyerOrderNumber" value={qualityControlData.buyerOrderNumber} onChange={handleQualityControlChange} />
               <label>Buyer's Order Date</label>
               <input type="date" name="buyerOrderDate" value={qualityControlData.buyerOrderDate} onChange={handleQualityControlChange}/>
            </fieldset>
    
            {/* Other Details - Add all other fields similarly */}
            <fieldset>
                <legend>Shipment & Terms</legend>
                <label>InspectionRequiredOn</label>
                  <input type="text" name="inspectionRequiredOn" value={qualityControlData.inspectionRequiredOn} onChange={handleQualityControlChange} />
                <label>Weekly Holiday:</label>
                  <input type="text" name="weeklyHoliday" value={qualityControlData.weeklyHoliday} onChange={handleQualityControlChange} />
                <label>Vessel / Flight No </label>
                  <input type="text" name="vesselOrFlightNo" value={invoiceData.vesselOrFlightNo} onChange={handleInvoiceChange} />
                <label>Port of Loading:</label>
                  <input type="text" name="portOfLoading" value={invoiceData.portOfLoading} onChange={handleInvoiceChange} />
                <label>Probable Date of Landing:</label>
                  <input type="date" name="probableDateOfLanding" value={qualityControlData.probableDateOfLanding} onChange={handleQualityControlChange} />
                <label>Date of Sealing/Flight:</label>
                  <input type="date" name="dateOfSealingOrFlight" value={qualityControlData.dateOfSealingOrFlight} onChange={handleQualityControlChange} />
                {/* ... Add all other input fields here */}
            </fieldset>
    
            <fieldset>
                <legend>Inspection Authority Details</legend>
                <label>Name of Inspection Authority:</label>
                <input type="text" name="inspectionAuthorityName" value={qualityControlData.inspectionAuthorityName} onChange={handleQualityControlChange}/>
                <label>Address of Inspection Authority:</label>
                <textarea name="inspectionAuthorityAddress" value={qualityControlData.inspectionAuthorityAddress} onChange={handleQualityControlChange} />      
                <label>Address where consignment is to be inspected</label>
                <textarea name="addressOfInspection" value={qualityControlData.addressOfInspection} onChange={handleQualityControlChange} />      
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
                  <input type="number" name="fobValue" placeholder="FOB Value" value={item.fobValue} onChange={(e) => handleItemChange(index, e)} />
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
            <PrintableQualityControl formType={formType} ref={printableRef}
            // className='printable-area'
            />
          </div>
        </div>
  );
};