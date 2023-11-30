const IndianNumberSystem = (Num) => {
    Num = +Num
    if (isNaN(Num)) return 0
    Num = Num.toFixed(2)
    const numberStr = String(Num);
    const [integerPart, decimalPart] = numberStr.split(".");
    let indianIntegerPart = "";
    let count = 0;
    let flag = false;
    for (let i = integerPart.length - 1; i >= 0; i--) {
        if (count == 3 || count == 5 || count == 7 || count == 9 || count == 11) {
            indianIntegerPart = "," + indianIntegerPart;
            flag = true;
        }

        indianIntegerPart = integerPart[i] + indianIntegerPart;
        count++;
    }
    const result = decimalPart
        ? indianIntegerPart + "." + decimalPart
        : indianIntegerPart;
    return indianIntegerPart;
};
export default IndianNumberSystem