import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { countries } from 'countries-list'
import { type certificateOriginSliceType, type CommonerSlice as CommonerSliceType, type InvoiceItem } from '../../types.ts';
import '../../assets/css/invoiceform.css'; // Form-specific styles
import { useDispatch, useSelector } from 'react-redux';
import { type formType } from '../../redux/slice/uiSlice.ts';
import { type AppDispatch, type RootState } from '../../redux/store.ts';
import { updateCommoner } from '../../redux/slice/commonerSlice.ts';
import { printHandler } from '../../functions/printHandler.tsx';
import { updateCertificateOrigin } from '../../redux/slice/CertificateOriginSlice.ts';
import {PrintableCertificateOrigin} from '../layouts/CertificateOriginLayout.tsx';

interface Props {
  formType: formType,
}

export const CertificateOriginForm = ({formType}:Props) => {
  // const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const invoiceData = useSelector((state:RootState) => state.commoner);
  const certificateOriginData = useSelector((state:RootState)=> state.certifcateOriginForm)
  const dispatch = useDispatch<AppDispatch>();

  const printableRef = useRef<HTMLDivElement>(null);
  const countryNames = Object.values(countries).map(country=>country.name);

  const handlePrint = React.useCallback( () =>{ printHandler(printableRef,'/certificateoriginform.css') }, [printableRef.current] );

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof CommonerSliceType;

    dispatch(updateCommoner({ key ,value}))
  };

  const handleCertificateOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value } = e.target;
    const key = name as keyof certificateOriginSliceType;

    dispatch(updateCertificateOrigin({key,value}));
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
      { id: Date.now(), marksNo: '', noAndKind: '', description: '', quantity: '', rate: '', remarks:'' }
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
              <textarea name="exporter" value={invoiceData.exporter} onChange={handleInvoiceChange}></textarea>
              <label>Consignee:</label>
              <textarea name="consignee" value={invoiceData.consignee} onChange={handleInvoiceChange}></textarea>
            </fieldset>
            
            {/* Reference Details */}
            <fieldset>
              <legend>References - Importer</legend>      
               <label>Reference Number</label>
               <input type="text" name="importersRef" value={invoiceData.importersRef} onChange={handleInvoiceChange} />
               <label>Date:</label>
               <input type="date" name="importersDate" value={invoiceData.importersDate}onChange={handleInvoiceChange}/>
               <label>Country of Origin:</label>
               <select name="countryOfOrigin" onChange={handleInvoiceChange} defaultValue={invoiceData.countryOfOrigin}>
                    {countryNames.map(name=>
                        <option key={name} value={name}>{name}</option>
                    )}
               </select>
            </fieldset>
    
            {/* Other Details - Add all other fields similarly */}
            <fieldset>
                <legend>Shipment & Terms</legend>
                <label>Pre Carriage By</label>
                  <select name="carriageBy" value={invoiceData.carriageBy} onChange={handleInvoiceChange} defaultValue={''}>
                      <option key={-1} value={''} >Select a value</option>
                      <option key={'Truck'} value={'Truck'}>Truck</option>
                      <option key={'Train'} value={'Train'}>Train</option>
                      <option key={'Vessel'} value={'Vessel'}>Vessel</option>
                      <option key={'FlightNo'} value={'FlightNo'}>FlightNo</option> 
                      <option key={'Road'} value={'Road'}>Road</option>
                      <option key={'Rail'} value={'Rail'}>Rail</option>
                      <option key={'Sea'} value={'Sea'}>Sea</option>
                      <option key={'Air'} value={'Air'}>Air</option> 
                      <option key={'Multimodal'} value={'Multimodal'}>Multimodal</option> 
                  </select>
                <label>Place By Receipt by Pre Carrier:</label>
                  <input type="text" name="placeByReceiptByPreCarrier" value={invoiceData.placeByReceiptByPreCarrier} onChange={handleInvoiceChange} />
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
                <legend>Secretary Details</legend>
                <label>Name of Chamber of Commerce</label>
                <input type="text" name="nameOfChamberOfCommerce" value={certificateOriginData.nameOfChamberOfCommerce} onChange={handleCertificateOriginChange}/>
                <label>Address of Chamber of Commerce:</label>
                <input type="text" name="addressOfChamberOfCommerce" value={certificateOriginData.addressOfChamberOfCommerce} onChange={handleCertificateOriginChange} />      
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
            <PrintableCertificateOrigin formType={formType} ref={printableRef}
            // className='printable-area'
            />
          </div>
        </div>
  );
};