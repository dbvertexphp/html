const XLSX = require('xlsx'); // Make sure to install this library if you haven't already
const fs = require("fs");
// Load your Excel file
const workbook = XLSX.readFile('./Tests/ClientList.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert Excel data to an array
const excelData = XLSX.utils.sheet_to_json(sheet);

// Initialize an empty array to store the final result
const result = [];

// Loop through the Excel data to create the desired structure
excelData.forEach(row => {
    const { company_name, branch_name, branch_address } = row;

    // Check if the company already exists in the result array
    const existingCompany = result.find(item => item.company_name === company_name);

    if (existingCompany) {
        // Company already exists, add branch information to its branches array
        existingCompany.branches.push({
            branch_name,
            branch_address
        });
    } else {
        // Company doesn't exist, create a new entry for it
        result.push({
            company_name,
            branches: [{
                branch_name,
                branch_address
            }]
        });
    }
});


fs.writeFileSync("./Tests/ClientList.json", JSON.stringify(result))



