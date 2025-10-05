import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { type CommonerSlice as CommonerSliceType, type InvoiceItem, type shippingInstructionSliceType } from '../../types.ts';
import '../../assets/css/Invoiceform.css'; // Form-specific styles
import { useDispatch, useSelector } from 'react-redux';
import { type formType } from '../../redux/slice/uiSlice.ts';
import { type AppDispatch, type RootState } from '../../redux/store.ts';
import { updateCommoner } from '../../redux/slice/commonerSlice.ts';
import { printHandler } from '../../functions/printHandler.tsx';
import { PrintableShippingInstruction } from '../layouts/ShippingInstructionLayout.tsx';
import { updateShippingInstructions } from '../../redux/slice/shippingInstructionSlice.ts';
import { countries } from 'countries-list';

interface Props {
  formType: formType,
}

export const ShippingInstruction = ({formType}:Props) => {
  // const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const invoiceData = useSelector((state:RootState) => state.commoner);
  const shippingInstructionsData = useSelector((state:RootState) => state.shippingInstructions);
  
  const dispatch = useDispatch<AppDispatch>();

  const printableRef = useRef<HTMLDivElement>(null);
  
  const countryNames = Object.values(countries).map(country=>country.name);
  const handlePrint = React.useCallback( () =>{ printHandler(printableRef,'/shippinginstructionslayout.css') }, [printableRef.current] );

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof CommonerSliceType;

    dispatch(updateCommoner({ key ,value}))
  };

  const handleShippingInstructionsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = e.target;
    const key = name as keyof shippingInstructionSliceType;

    dispatch(updateShippingInstructions({key,value}));

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
              <label>Consignee:</label>
              <input type="text" name="exporter" value={invoiceData.consignee} onChange={handleInvoiceChange}></input>
              <label>Consignee’s Address</label>
              <textarea name="consigneeAddress" value={invoiceData.consigneeAddress} onChange={handleInvoiceChange}></textarea>
              <label>Notify Party</label>
              <input type="text"  name="notifyPartyName" value={shippingInstructionsData.notifyPartyName} onChange={handleShippingInstructionsChange}></input>
              <label>Notifing Party's Address</label>
              <textarea name="notifyPartyAddress" value={shippingInstructionsData.notifyPartyAddress} onChange={handleShippingInstructionsChange}></textarea>
            </fieldset>
            
            {/* Reference Details */}
            <fieldset>
              <legend> {formType === "SHIPPING_INSTRUCTIONS" ? "Invoice - Importer " : "Billing - Export " } - References </legend>      
               {
                  formType === "SHIPPING_INSTRUCTIONS" && 
                  <>
                    <label>Invoice Reference Number</label>
                    <input type="text" name="invoiceRef" value={invoiceData.invoiceRef} onChange={handleInvoiceChange} />
                    <label>Invoice Reference Date:</label>
                    <input type="date" name="invoiceDate" value={invoiceData.invoiceDate}onChange={handleInvoiceChange}/>
                    <label>Importer's Reference Number</label>
                    <input type="text" name="importersRef" value={invoiceData.importersRef} onChange={handleInvoiceChange} />
                    <label>Importer's Reference Date:</label>
                    <input type="date" name="importersDate" value={invoiceData.importersDate}onChange={handleInvoiceChange}/>
                    <label>Other Reference ( If any)</label>
                    <textarea name="otherRef" value={invoiceData.otherRef} onChange={handleInvoiceChange} /> 
                  </>
               }
               { 
                  formType === "BILL_OF_LADING_(COMBINED_TRANSPORT_AND_PORT_TO_PORT_SHIPMENT)" &&
                  <>
                    <label>Booking No.:</label>
                    <input type="text" name="bookingNumber" value={shippingInstructionsData.bookingNumber} onChange={handleShippingInstructionsChange} />
                    <label>Bill of Lading No:</label>
                    <input type="text" name="billOfLadingNo" value={shippingInstructionsData.billOfLadingNo} onChange={handleShippingInstructionsChange} />
                  </>
               }
               <label>Exporter Reference Number</label>
               <input type="text" name="exportersRefNo" value={invoiceData.exportersRefNo} onChange={handleInvoiceChange} />
               <label> {formType === "BILL_OF_LADING_(COMBINED_TRANSPORT_AND_PORT_TO_PORT_SHIPMENT)" ? "Forwarding Agent Reference" : "Forwarding Agent/CHA"} :</label>
               <input type="text" name="forwardingAgent" value={shippingInstructionsData.forwardingAgent} onChange={handleShippingInstructionsChange} /> 
            </fieldset>
    
            {/* Other Details - Add all other fields similarly */}
            <fieldset>
                <legend>Shipment & Terms</legend>
                <label>Point of Origin:</label>
                <input type="text" name="pointOfOrigin" value={invoiceData.pointOfOrigin} onChange={handleInvoiceChange} />
                <label>Country of Origin:</label>
                <select name="countryOfOrigin" onChange={handleInvoiceChange} defaultValue={invoiceData.countryOfOrigin}>
                    {countryNames.map(name=>
                        <option key={name} value={name}>{name}</option>
                    )}
                </select>
                <label>Country of Final Destination:</label>
                <select name="countryOfFinalDestination" onChange={handleInvoiceChange} defaultValue={invoiceData.countryOfFinalDestination}>
                    {countryNames.map(name=>
                        <option key={name} value={name}>{name}</option>
                    )}
                </select>
            <label>Pre Carriage By</label>
            <select name="carriageBy" value={invoiceData.carriageBy} onChange={handleInvoiceChange} defaultValue={''}>
              {/* '' | 'Truck' | 'Train' | 'Vessel' | 'FlightNo' | 'Road' | 'Rail' | 'Sea' | 'Air' | 'Multimodal' ; */}
                <option key={-1} value={''} >Select a value</option>
                <option key={'Truck'} value={ 'Truck'}>Truck</option>
                <option key={'Train'} value={'Train'}>Train</option>
                <option key={'Vessel'} value={'Vessel'}>Vessel</option>
                <option key={'FlightNo'} value={'FlightNo'}>FlightNo</option> 
            </select>
            <label>Place By Receipt by Pre Carrier:</label>
            <input type="text" name="placeByReceiptByPreCarrier" value={invoiceData.placeByReceiptByPreCarrier} onChange={handleInvoiceChange} />
            <label>Port of Loading/Dispatch::</label>
            <input type="text" name="portOfLoading" value={invoiceData.portOfLoading} onChange={handleInvoiceChange} />
            <label> Port of Discharge:</label>
            <input type="text" name="portOfDischarge" value={invoiceData.portOfDischarge} onChange={handleInvoiceChange} />
            <label> Final Destination:</label>
            <input type="text" name="finalDestination" value={invoiceData.finalDestination} onChange={handleInvoiceChange} />
                {/* ... Add all other input fields here */}
            </fieldset>
    
            <fieldset>
                <legend>Routing Instructions / Charges - Miscellaneous</legend>
                <label>Domestic Routing and Export Instructions</label>
                <textarea name="exportInstructions" value={shippingInstructionsData.exportInstructions} onChange={handleShippingInstructionsChange}/>
                <label>Onward Inland Routing</label>
                <textarea name="onwardInlandRouting" value={shippingInstructionsData.onwardInlandRouting} onChange={handleShippingInstructionsChange} />      
                <label>Freight & Charges</label>
                <textarea name="freightAndCharges" value={shippingInstructionsData.freightAndCharges} onChange={handleShippingInstructionsChange} />
                <label>Freight Payable at:</label>
                <input name="freightPayableAt" value={shippingInstructionsData.freightPayableAt} onChange={handleShippingInstructionsChange} />
                <label>Place of Issue</label>
                <input name="placeOfIssue" value={shippingInstructionsData.placeOfIssue} onChange={handleShippingInstructionsChange} />
                <label>Declared Value in Us Dolor (See Clause 6)</label>
                <input name="declaredValue" value={shippingInstructionsData.declaredValue} onChange={handleShippingInstructionsChange} />
                <label>No. of Original Bill of Lading</label>
                <input name="noOfOriginalBillOfLading" value={shippingInstructionsData.noOfOriginalBillOfLading} onChange={handleShippingInstructionsChange} />
            </fieldset>
    
            {/* Items Section */}
            <fieldset className="full-width-fieldset">
              <legend>Items</legend>
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="item-row">
                  <input type="text" name="marksNo" placeholder="Marks & No.s" value={item.marksNo} onChange={(e) => handleItemChange(index, e)} />
                  <input type="text" name="noAndKind" placeholder="No. & Kind of" value={item.noAndKind} onChange={(e) => handleItemChange(index, e)} />
                  <textarea className='form-item-description' name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
                  <input type="number" name="grossWeight" placeholder="Shipper Gross Weight" value={item.grossWeight} onChange={(e) => handleItemChange(index, e)} />
                  <input type="number" name="grossMeasurement" placeholder="Shipper Gross Measurement" value={item.grossMeasurement} onChange={(e) => handleItemChange(index, e)} />
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
            <PrintableShippingInstruction formType={formType} ref={printableRef}
            // className='printable-area'
            />
          </div>
        </div>
  );
};