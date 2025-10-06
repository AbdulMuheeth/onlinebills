import { useDispatch, useSelector } from 'react-redux';
import {InvoiceForm} from './components/forms/InvoiceForm';

import {setCurrentForm, type formType} from './redux/slice/uiSlice'
import {type AppDispatch, type RootState} from './redux/store';
import type React from 'react';
import { GSPForm } from './components/forms/GSPForm';
import { CertificateOriginForm } from './components/forms/CertificateOriginFrom';
import { QualityControl } from './components/forms/QualityControlForm';
import { ShippingInstruction } from './components/forms/ShippingInstructionForm';
import { InsuranceDeclaration } from './components/forms/InsuranceDeclarationForm';
import { ShippingAdviceForm } from './components/forms/ShippingAdivceForm';


const FormSelector = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentForm = useSelector((state:RootState)=>state.ui.currentForm);

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentForm(e.target.value as formType))
  }

  return(
    <div className='form-Selector invoice-form' id='alignCenter'>
       <label htmlFor="form-type"><h2> Select Document Type: </h2></label>
        <select id="form-type" value={currentForm} onChange={handleFormChange}>
          <option value="PROFORMA_INVOICE">Proforma Invoice</option>
          <option value="COMMERCIAL_INVOICE">Commercial Invoice</option>
          <option value="CARGO_MANIFEST">Cargo Manifest</option>
          <option value="GSP_FORM_A">GSP Form A</option>
          <option value="CERTIFICATE_ORIGIN">Application for Certificate of Origin</option>
          <option value="QUALITY_CONTROL">Application for Inspection of Quality Control</option>
          <option value="SHIPPING_INSTRUCTIONS">Shipping Instructions</option>
          <option value="BILL_LADING">Bill of Lading (Combined Transport and Port to Port Shipment)</option>
          <option value="INSURANCE_DECLARATION">Marine Insurance Declaration</option>
          <option value="SHIPMENT_ADVICE">Shipment Advice</option>
        </select>
    </div>
  )
}


function App() {

  const currentForm = useSelector((state:RootState)=> state.ui.currentForm);

  const renderCurrentForm = () => {
    switch (currentForm) {
      case 'PROFORMA_INVOICE':
        // Pass a 'type' prop to your reusable component
        return <InvoiceForm formType="PROFORMA_INVOICE" />;
      
      case 'COMMERCIAL_INVOICE':
        // Reuse the same component for a similar form
        return <InvoiceForm formType="COMMERCIAL_INVOICE" />;
      
      case 'CARGO_MANIFEST':
        // Render a completely different component for a unique form
        return <InvoiceForm formType="CARGO_MANIFEST"/>;
        
      case 'GSP_FORM_A':
        // Render a completely different component for a unique form
        return <GSPForm formType="GSP_FORM_A"/>;

      case 'CERTIFICATE_ORIGIN':
        return <CertificateOriginForm formType="APPLICATION_FOR_CERTIFICATE_OF_ORIGIN"/>

      case 'QUALITY_CONTROL':
        return <QualityControl formType="APPLICATION_FOR_INSPECTION_OF_QUALITY_CONTROL"/>
      
      case 'SHIPPING_INSTRUCTIONS':
        return <ShippingInstruction formType="SHIPPING_INSTRUCTIONS" />

        //Bill of Lading (Combined Transport and Port to Port Shipment)
      case 'BILL_LADING':
        return <ShippingInstruction formType="BILL_OF_LADING_(COMBINED_TRANSPORT_AND_PORT_TO_PORT_SHIPMENT)"/>

      case 'INSURANCE_DECLARATION':
        return <InsuranceDeclaration formType="MARINE_INSURANCE_DECLARATION" />

      case 'SHIPMENT_ADVICE':
        return <ShippingAdviceForm formType="SHIPMENT_ADVICE" />

      default:
        return <div>Please select a form</div>;
    }
  };



  return (
     <div className="App">
      <h1>Invoice & Document Generator</h1>
      <FormSelector />
      <hr />
      <div className="form-container">
        {renderCurrentForm()}
      </div>
    </div>
  );
}

export default App;