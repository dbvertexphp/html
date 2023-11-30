const ContactUsTemplate = ({ name, email, phone, message }) => {
  return `<p>A user has requested for Contact, </p>
           <p> Name: ${name}</p>
           <p> Email: ${email}</p>
           <p> Phone: ${phone}</p>
            <p>  ${message}</p>`;
};

module.exports = { ContactUsTemplate };
