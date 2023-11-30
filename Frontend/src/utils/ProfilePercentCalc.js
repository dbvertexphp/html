export function vendorProfileCompletePercentage(vendorData) {
    if (!vendorData) return 50;
    if (!vendorData.address) return 50;
    const schema = [
        "vendor_name",
        "email",
        "company_name",
        "gst_number",
        "gst_doc",
        "pan_number",
        "pan_doc",
        "mobile_number",
        "phone_number",
        "profile_photo",
        "msme_number",
        "msme_doc",
    ];
    const address = [
        "address1",
        "address2",
        "city",
        "district",
        "pincode",
        "state",
        "landmark",
    ];

    let completed = 0;
    let totalFields = schema.length + address.length;
    for (let field of schema) {
        if (vendorData[field]) completed++;
    }
    for (let field of address) {
        if (vendorData?.address[field]) completed++;
    }
    const completionPercentage = (completed / totalFields) * 100;
    return completionPercentage;
}
export function customerProfileCompletePercentage(customerData) {
    if (!customerData) return 50;
    if (!customerData.address) return 50;
    const schema = [
        "email",
        "first_name",
        "last_name",
        "profile_pic",
        "address",
        "city",
        "state",
        "pin",
        "phone_number",
    ];


    let completed = 0;
    let totalFields = schema.length
    for (let field of schema) {
        if (customerData[field]) completed++;

    }
    const completionPercentage = (completed / totalFields) * 100;
    return completionPercentage;
}
