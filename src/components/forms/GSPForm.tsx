import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { countries } from 'countries-list'
import { type CommonerSlice as CommonerSliceType, type gspSliceType, type InvoiceItem } from '../../types.ts';
import '../../assets/css/Invoiceform.css'; // Form-specific styles
import { useDispatch, useSelector } from 'react-redux';
import { type formType } from '../../redux/slice/uiSlice.ts';
import { type AppDispatch, type RootState } from '../../redux/store.ts';
import { updateCommoner } from '../../redux/slice/commonerSlice.ts';
import { printHandler } from '../../functions/printHandler.tsx';
import { updateGSPForm } from '../../redux/slice/gspFormSlice.ts';
import GSPFormLayout from '../layouts/GSPFormLayout.tsx';

interface Props {
  formType: formType,
}

export const GSPForm = ({formType}:Props) => {
  // const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const invoiceData = useSelector((state:RootState) => state.commoner);
  const gspFormData = useSelector((state:RootState)=> state.gspForm);
  const dispatch = useDispatch<AppDispatch>();

  const printableRef = useRef<HTMLDivElement>(null);
  const countryNames = Object.values(countries).map(country=>country.name);

  const handlePrint = React.useCallback( () =>{ printHandler(printableRef,'/gspform.css') }, [printableRef.current] );

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof CommonerSliceType;

    dispatch(updateCommoner({ key ,value}))
  };

  const handleGspChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name,value } = e.target;
    const key = name as keyof gspSliceType;

    dispatch(updateGSPForm({key,value}));
  }

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const items:InvoiceItem[] = [...invoiceData.items];
    items[index] = { ...items[index], [name]: value };

    dispatch(updateCommoner({key:"items",value: items}))
  };

  const addItem = () => {

    const items:InvoiceItem[] = [...gspFormData.items];
    items.push(
      { id: Date.now(), marksNo: '', noAndKind: '', description: '', quantity: '', rate: '', remarks:'', fobValue:'', grossWeight:'', itemNumber:'', numberAndDateOfInvoice:'', originCriterion:'' }
    )

    dispatch(updateGSPForm({key:"items",value: items}));
  };

  const removeItem = (index: number) => {

    let items:InvoiceItem[] = [...gspFormData.items];
    items = gspFormData.items.filter((_, i) => i !== index);

    dispatch(updateGSPForm({key:"items",value: items}));
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
          <legend>References</legend>
           <label>Reference Number:</label>
           <input type="text" name="referenceNo" value={gspFormData.referenceNo} onChange={handleGspChange} />
           <label>Issuing Country:</label>
            <select name="issuingCountry" onChange={handleGspChange} defaultValue={gspFormData.issuingCountry}>
                {countryNames.map(name=>
                    <option key={name} value={name}>{name}</option>
                )}
            </select>
            <label>Importing Country:</label>
            <select name="importingCountry" onChange={handleGspChange} defaultValue={gspFormData.importingCountry}>
                {countryNames.map(name=>
                    <option key={name} value={name}>{name}</option>
                )}
            </select>
        </fieldset>

        {/* Other Details - Add all other fields similarly */}
        <fieldset>
            <legend>Shipment & Terms</legend>
            <label>Means of transport and route</label>
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
            <label>Official Use Note:</label>
            <textarea name="officialUse" value={gspFormData.officialUse} onChange={handleGspChange}></textarea>
        </fieldset>


        {/* Items Section */}
        <fieldset className="full-width-fieldset">
          <legend>Items</legend>
          {invoiceData.items.map((item, index) => (
            <div key={item.id} className="item-row">
              <input type="text" name="itemNumber" placeholder="Item Number" value={item.itemNumber} onChange={(e) => handleItemChange(index, e)} />
              <input type="text" name="marksNo" placeholder="Marks and Numbers of packages" value={item.marksNo} onChange={(e) => handleItemChange(index, e)} />
              <textarea style={{resize:"none",overflow:'hidden'}} name="description" placeholder="Number and Kind of Packages & description of goods" value={item.description} onChange={(e) => handleItemChange(index, e)}/>
              <input type="text" name="originCriterion" placeholder="Origin criterion" value={item.originCriterion} onChange={(e) => handleItemChange(index, e)} />
              <input type="text" name="grossWeight" placeholder="Gross Weight" value={item.grossWeight} onChange={(e) => handleItemChange(index, e)} />
              <input type="text" name="numberAndDateOfInvoice" placeholder="Number and date of invoice" value={item.numberAndDateOfInvoice} onChange={(e) => handleItemChange(index, e)} />
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
        <GSPFormLayout formType={formType} ref={printableRef}
        // className='printable-area'
        />
      </div>
    </div>
  );
};