 // Convert number to words, including Indian numbering system
export const numberToWords = (num:number) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertToWords(n:number):string {
      if (n < 10) return units[n];
      if (n >= 10 && n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
      if (n < 1000) return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertToWords(n % 100) : '');
      return '';
    }

    const numStr = num.toString().replace(/,/g, '');
    const amount = parseFloat(numStr);
    if (isNaN(amount)) return '';

    const [integerPart, decimalPart] = amount.toFixed(2).split('.');
    let words = '';

    const groups = [];
    let temp = integerPart;
    while (temp.length > 3) {
      groups.push(temp.slice(-3));
      temp = temp.slice(0, -3);
    }
    groups.push(temp);

    const suffixes = ['', 'Thousand', 'Million', 'Billion'];
    const groupWords:string[] = [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const n = parseInt(groups[i], 10);
      if (n !== 0) {
        groupWords.push(convertToWords(n) + ' ' + suffixes[i]);
      }
    }

    words = groupWords.join(' ') + ' dollar';

    if (decimalPart && parseInt(decimalPart) !== 0) {
      words += ' and ' + convertToWords(parseInt(decimalPart, 10)) + ' cents';
    }
    
    return words.replace(/\s+/g, ' ').trim() + ' only.';
  };