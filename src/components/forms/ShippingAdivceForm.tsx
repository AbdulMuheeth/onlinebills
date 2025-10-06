import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { type allDocumentTypes, type CommonerSlice as CommonerSliceType, type InvoiceItem, type shipmentAdviceSliceType, type shippingInstructionSliceType } from '../../types.ts';
import '../../assets/css/Invoiceform.css'; // Form-specific styles
import { useDispatch, useSelector } from 'react-redux';
import { type formType } from '../../redux/slice/uiSlice.ts';
import { type AppDispatch, type RootState } from '../../redux/store.ts';
import { updateCommoner } from '../../redux/slice/commonerSlice.ts';
import { printHandler } from '../../functions/printHandler.tsx';
import { PrintableShippingAdvice } from '../layouts/shippingAdivceLayout.tsx';
import { updateShippingInstructions } from '../../redux/slice/shippingInstructionSlice.ts';
import { updateShippingAdvice } from '../../redux/slice/shipmentAdviceSlice.ts';

interface Props {
  formType: formType,
}

export const ShippingAdviceForm = ({formType}:Props) => {
  // const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const invoiceData = useSelector((state:RootState) => state.commoner);
  
//   const qualityControlData = useSelector((state:RootState)=>state.qualityControl);
  const shippingInstructionsData = useSelector((state:RootState)=>state.shippingInstructions);
  const shipmentAdviceData = useSelector((state:RootState)=>state.shipmentAdvice);

  const dispatch = useDispatch<AppDispatch>();

  const printableRef = useRef<HTMLDivElement>(null);
  

  const handlePrint = React.useCallback( () =>{ printHandler(printableRef,'/shipmentadvicelayout.css') }, [printableRef.current] );

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof CommonerSliceType;

    dispatch(updateCommoner({ key ,value}))
  };

  const handleShipmentAdviceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = e.target;
    const key = name as keyof shipmentAdviceSliceType;

    dispatch(updateShippingAdvice({key,value}));
  }

  const handleShippingInstructionsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name,value} = e.target;
      const key = name as keyof shippingInstructionSliceType;
  
      dispatch(updateShippingInstructions({key,value}));
    }



  const handleShipmentDocumentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,checked} = e.target;
    const docs: allDocumentTypes = {...shipmentAdviceData.documentsSent};
    const key = name as keyof allDocumentTypes;
    // const value = Boolean(val);
    docs[key] = checked;

    dispatch(updateShippingAdvice({key:"documentsSent",value:docs}));
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
              <label>Consignee:</label>
              <input type="text" name="exporter" value={invoiceData.consignee} onChange={handleInvoiceChange}></input>
              <label>Notify Party</label>
              <input type="text"  name="notifyPartyName" value={shippingInstructionsData.notifyPartyName} onChange={handleShippingInstructionsChange}></input>
              <label>Name of Bank</label>
              <input type="text"  name="nameOfBank" value={shipmentAdviceData.nameOfBank} onChange={handleShipmentAdviceChange}></input>
              <label>Address of Bank</label>
              <input type="text"  name="addressOfBank" value={shipmentAdviceData.addressOfBank} onChange={handleShipmentAdviceChange}></input>
            </fieldset>
            
            {/* Reference Details */}
            <fieldset>
              <legend>Invoice - Importer - Exporter References </legend>      
               <label>Invoice Reference Number:</label>
               <input type="text" name="invoiceRef" value={invoiceData.invoiceRef} onChange={handleInvoiceChange} />
               <label>Invoice Reference Date:</label>
               <input type="date" name="invoiceDate" value={invoiceData.invoiceDate}onChange={handleInvoiceChange}/>
               <label>Exporter Reference Number:</label>
               <input type="text" name="exportersRefNo" value={invoiceData.exportersRefNo} onChange={handleInvoiceChange} />
               <label>Importer’s Order Number:</label>
               <input type="text" name="importersRef" value={invoiceData.importersRef} onChange={handleInvoiceChange} />
               <label>Importer’s Order Date:</label>
               <input type="date" name="importersDate" value={invoiceData.importersDate} onChange={handleInvoiceChange}/>
            </fieldset>
    
            {/* Other Details - Add all other fields similarly */}
            <fieldset>
                <legend>Shipment & Terms</legend>
                <label>Pre Carriage By</label>
                <select name="carriageBy" value={invoiceData.carriageBy} onChange={handleInvoiceChange} defaultValue={''}>
                {/* '' | 'Truck' | 'Train' | 'Vessel' | 'FlightNo' | 'Road' | 'Rail' | 'Sea' | 'Air' | 'Multimodal' ; */}
                    <option key={-1} value={''} >Select a value</option>
                    <option key={'Truck'} value={ 'Truck'}>Truck</option>
                    <option key={'Train'} value={'Train'}>Train</option>
                    <option key={'Vessel'} value={'Vessel'}>Vessel</option>
                    <option key={'FlightNo'} value={'FlightNo'}>FlightNo</option> 
                </select>
                <label>Place Of Receipt:</label>
                <input type="text" name="placeByReceiptByPreCarrier" value={invoiceData.placeByReceiptByPreCarrier} onChange={handleInvoiceChange} />
                <label>Vessel / Flight No: </label>
                <input type="text" name="vesselOrFlightNo" value={invoiceData.vesselOrFlightNo} onChange={handleInvoiceChange} />
                <label>Port of Loading:</label>
                <input type="text" name="portOfLoading" value={invoiceData.portOfLoading} onChange={handleInvoiceChange} />
                <label>Port of Discharge:</label>
                <input type="text" name="portOfDischarge" value={invoiceData.portOfDischarge} onChange={handleInvoiceChange} />
                <label>Final Destination:</label>
                <input type="text" name="finalDestination" value={invoiceData.finalDestination} onChange={handleInvoiceChange} />
                <label>Certificate Origin Type:</label>
                <input type="text" name="certificateOriginType" value={shipmentAdviceData.certificateOriginType} onChange={handleShipmentAdviceChange} />
            </fieldset>
    
            <fieldset>
                <legend>Documents being negotiated/sent:</legend>
                <div className="checkbox-style">
                    <label>Commerical Invoice</label> 
                    <input type='checkbox' name="commercialInvoice" checked={shipmentAdviceData.documentsSent.commercialInvoice} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Custom/Consular Invoice</label> 
                    <input type='checkbox' name="customOrConsularInvoice" checked={shipmentAdviceData.documentsSent.customOrConsularInvoice} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Packing List</label> 
                    <input type='checkbox' name="packingList" checked={shipmentAdviceData.documentsSent.packingList} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Bill of Lading/Air Way Bill</label> 
                    <input type='checkbox' name="billOfLadingOrAirWayBill" checked={shipmentAdviceData.documentsSent.billOfLadingOrAirWayBill} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Insurance Certificate/ Policy</label>
                    <input type='checkbox' name="insuranceCertificateOrPolicy" checked={shipmentAdviceData.documentsSent.insuranceCertificateOrPolicy} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Bill of Exchange</label>
                    <input type='checkbox' name="billOfExchange" checked={shipmentAdviceData.documentsSent.billOfExchange} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Certificate of Origin</label>
                    <input type='checkbox' name="certificateOfOrigin" checked={shipmentAdviceData.documentsSent.certificateOfOrigin} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>GSP/GSTP/ Other Certificate of Origin</label>
                    <input type='checkbox' name="GSPOrGSTPOrOtherCertificateofOrigin" checked={shipmentAdviceData.documentsSent.GSPOrGSTPOrOtherCertificateofOrigin} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Export Certificate ( If needed)</label>
                    <input type='checkbox' name="exportCertificateIfNeeded" checked={shipmentAdviceData.documentsSent.exportCertificateIfNeeded} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Inspection Certificate</label>
                    <input type='checkbox' name="inspectionCertificate" checked={shipmentAdviceData.documentsSent.inspectionCertificate} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Weight Certificate</label>
                    <input type='checkbox' name="weightCertificate" checked={shipmentAdviceData.documentsSent.weightCertificate} onChange={handleShipmentDocumentChange}/>
                </div>
                <div className="checkbox-style">
                    <label>Any Other Documents ( If needed)</label>
                    <input type='checkbox' name="anyOtherDocuments" checked={shipmentAdviceData.documentsSent.anyOtherDocuments} onChange={handleShipmentDocumentChange}/>
                </div> <br/>
                <div>
                    <label>Flight Number:</label>
                    <input type="text" name="flightNo" value={shipmentAdviceData.flightNo} onChange={handleShipmentAdviceChange} />
                </div>
                <div>
                    <label>Carrier:</label>
                    <input type="text" name="carrier" value={shipmentAdviceData.carrier} onChange={handleShipmentAdviceChange} />
                </div>
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
                  <input type="number" name="rate" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} />
                  <input type="number" style={{color:"grey"}} placeholder="Amount" value={Number(item.rate) * Number(item.quantity)} readOnly/>
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
            <PrintableShippingAdvice formType={formType} ref={printableRef}
            // className='printable-area'
            />
          </div>
        </div>
  );
};