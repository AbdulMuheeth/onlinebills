import React, { useState, useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { ReactToPrint } from 'react-to-print';
import { countries } from 'countries-list'
import { type ProformaInvoiceData } from '../types';
import { PrintableInvoice } from './ProformaInvoice.tsx';
import '../invoiceform.css'; // Form-specific styles

const initialData: ProformaInvoiceData = {
  exporter: 'Global Exports Pvt. Ltd.\n123 Export Lane, Mumbai, India',
  consignee: 'International Imports Inc.\n456 Import Street, New York, USA',
  proRefAndDate: 'PI-2025-001 / 2025-08-23',
  importersRefAndDate: 'PO-98765 / 2025-08-20',
  exportersRefNo: 'EXP-REF-456',
  countryOfOrigin: 'India',
  countryOfFinalDestination: 'USA',
  termsOfDelivery: 'Goods to be delivered within 30 days of shipment.',
  paymentTerms: '50% Advance, 50% on Delivery',
  incoterms: 'CIF (Cost, Insurance, and Freight)',
  carriageBy: 'Sea',
  placeByReceiptByPreCarrier: 'Mumbai Port',
  portOfLoading: 'JNPT, Mumbai, India',
  portOfDischarge: 'Port of New York, USA',
  finalDestination: 'New York, USA',
  items: [
    { id: 1, marksNo: 'CONT-123', noAndKind: '10 Pallets', description: 'Handcrafted Leather Bags', quantity: '200', rate: '50' },
  ],
  amountChargeableInWord: 'Seventeen Thousand Five Hundred Only',
};

export const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState<ProformaInvoiceData>(initialData);
  const printableRef = useRef<HTMLDivElement>(null);
  const countryNames = Object.values(countries).map(country=>country.name);

    const handlePrint = async () => {
        const printableElement = printableRef.current;
        if (!printableElement) {
            console.error("Print failed: Printable component not available.");
            return;
        }

        try {
            // Fetch the dedicated print stylesheet
            const response = await fetch('/print-invoice.css');
            
            const printStyles = await response.text();

            const printWindow = window.open('', '', 'height=800,width=1000');

            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Proforma Invoice</title>
                            <style>
                                ${printStyles}
                            </style>
                        </head>
                        <body>
                            ${printableElement.innerHTML}
                        </body>
                    </html>
                `);
                
                printWindow.document.close();
                printWindow.focus();
                
                // Use a timeout to let the browser render the content and styles
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 750); // Increased timeout for stability
            }
        } catch (error) {
            console.error("Failed to fetch print styles or open print window:", error);
            alert("Could not print the document. Please check the console for errors.");
        }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    items[index] = { ...items[index], [name]: value };
    setInvoiceData(prev => ({ ...prev, items }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), marksNo: '', noAndKind: '', description: '', quantity: '', rate: '' }
      ]
    }));
  };

  const removeItem = (index: number) => {
    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData(prev => ({ ...prev, items }));
  };

  return (
    <div className="form-and-print-container">
      <div className="invoice-form">
        <h1>Proforma Invoice Details</h1>
        {/* Party Details */}
        <fieldset>
          <legend>Parties</legend>
          <label>Exporter:</label>
          <textarea name="exporter" value={invoiceData.exporter} onChange={handleChange}></textarea>
          <label>Consignee:</label>
          <textarea name="consignee" value={invoiceData.consignee} onChange={handleChange}></textarea>
        </fieldset>
        
        {/* Reference Details */}
        <fieldset>
          <legend>References</legend>
           <label>Pro Ref & Date:</label>
           <input type="text" name="proRefAndDate" value={invoiceData.proRefAndDate} onChange={handleChange} />
           <label>Importer's Ref No. & Date:</label>
           <input type="text" name="importersRefAndDate" value={invoiceData.importersRefAndDate} onChange={handleChange} />
           <label>Exporter's Reference No:</label>
           <input type="text" name="exportersRefNo" value={invoiceData.exportersRefNo} onChange={handleChange} />
        </fieldset>

        {/* Other Details - Add all other fields similarly */}
        <fieldset>
            <legend>Shipment & Terms</legend>
            <label>Country of Origin:</label>
            <select name="countryOfOrigin" onChange={handleChange} defaultValue={invoiceData.countryOfOrigin}>
                {countryNames.map(name=>
                    <option key={name} value={name}>{name}</option>
                )}
            </select>
            <label>Country of Final Destination:</label>
            <select name="countryOfFinalDestination" onChange={handleChange} defaultValue={invoiceData.countryOfFinalDestination}>
                {countryNames.map(name=>
                    <option key={name} value={name}>{name}</option>
                )}
            </select>
            <label>Carriage By:</label>
            <input type="text" name="carriageBy" value={invoiceData.carriageBy} onChange={handleChange} />
            <label>Place By Receipt by Pre Carrier:</label>
            <input type="text" name="placeByReceiptByPreCarrier" value={invoiceData.placeByReceiptByPreCarrier} onChange={handleChange} />
            <label>Port of Loading/Dispatch::</label>
            <input type="text" name="portOfLoading" value={invoiceData.portOfLoading} onChange={handleChange} />
            <label> Port of Discharge:</label>
            <input type="text" name="portOfDischarge" value={invoiceData.portOfDischarge} onChange={handleChange} />
            <label> Final Destination:</label>
            <input type="text" name="finalDestination" value={invoiceData.finalDestination} onChange={handleChange} />
            {/* ... Add all other input fields here */}
        </fieldset>

        <fieldset>
            <legend>Terms of Delivery</legend>
            <label>Terms of Delivery and Payments Terms:</label>
            <input type="text" name="termsOfDelivery" value={invoiceData.termsOfDelivery} onChange={handleChange} />
            <label>A. Incoterms:</label>
            <input type="text" name="incoterms" value={invoiceData.incoterms} onChange={handleChange} />
            <label>B. Payment Terms:</label>
            <input type="text" name="paymentTerms" value={invoiceData.paymentTerms} onChange={handleChange} />
        </fieldset>

        {/* Items Section */}
        <fieldset>
          <legend>Items</legend>
          {invoiceData.items.map((item, index) => (
            <div key={item.id} className="item-row">
              <input type="text" name="marksNo" placeholder="Marks & No.s" value={item.marksNo} onChange={(e) => handleItemChange(index, e)} />
              <input type="text" name="noAndKind" placeholder="No. & Kind of" value={item.noAndKind} onChange={(e) => handleItemChange(index, e)} />
              <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
              <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
              <input type="number" name="rate" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} />
              <button type="button" onClick={() => removeItem(index)} className="remove-btn">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addItem}>Add Item</button>
        </fieldset>

        {/* <fieldset>
            <legend>Summary</legend>
            <label>Amount Chargeable (In Word):</label>
            <input type="text" name="amountChargeableInWord" value={invoiceData.amountChargeableInWord} onChange={handleChange} />
        </fieldset> */}

        <button onClick={handlePrint} className="print-button">Print Invoice</button>

      </div>

      {/* This is the component that will be printed. It's hidden from the screen view. */}
      <div className='printable-component'>
        <PrintableInvoice ref={printableRef} data={invoiceData} 
        // className='printable-area'
        />
      </div>
    </div>
  );
};