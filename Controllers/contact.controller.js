const SendMail = require("../Config/Sendmail");
const { ContactUsTemplate } = require("../Email/ContactUs/ContactUs");

const contactUs = async (req, res) => {
  try {
    const payload = req?.body;
    let mailConfig = {
      subject: `A User with Name ${payload?.name} has requested for connect`,
      html: ContactUsTemplate(payload),
    };

    SendMail(mailConfig);

    res?.send({ message: "We have sent the mail Successfully" });
  } catch (error) {
    console.log(error);
    res?.status(500)?.send({ message: error?.message || "Unable to Send Mail", error });
  }
};

module.exports = {
  contactUs,
};
