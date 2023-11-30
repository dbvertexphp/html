function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function NumToWords(number) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore', 'Arab', 'Kharab', 'Neel', 'Padma', 'Shankh'];

    const getChunk = (num) => {
        const chunk = [];
        while (num > 0) {
            chunk.push(num % 100);
            num = Math.floor(num / 100);
        }
        return chunk;
    };

    const chunkToWords = (num) => {
        if (num === 0) return '';
        if (num < 10) return units[num];
        if (num < 20) return teens[num - 11];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
        return units[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' ' + chunkToWords(num % 100) : '');
    };

    if (number === 0) return 'Zero';

    let words = '';
    const chunks = getChunk(number);

    for (let i = 0; i < chunks.length; i++) {
        if (chunks[i] !== 0) {
            words = chunkToWords(chunks[i]) + ' ' + thousands[i] + ' ' + words;
        }
    }

    return capitalizeFirstLetter(words.trim()) + " INR Only";
}