import React from 'react';

export const printHandler = async (printableRef: React.RefObject<HTMLDivElement | null>, cssFile: string) => {

        const printableElement = printableRef.current;
        if (!printableElement) {
            console.error("Print failed: Printable component not available.");
            return;
        }

        try {
            // Fetch the dedicated print stylesheet
            // '/invoice.css'
            const response = await fetch(cssFile);
            
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