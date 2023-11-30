const VendorRegisterAdmin = ({ Vendor }) => {
    return `<h1>A New Vendor Joined, ${Vendor.email}</h1>`
}
const VendorRegisterUser = ({ Vendor }) => {
    return `<h1>Register Successful, ${Vendor.email}</h1>`
}
module.exports = { VendorRegisterUser, VendorRegisterAdmin };