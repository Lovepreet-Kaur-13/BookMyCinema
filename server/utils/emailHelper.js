const sgMail = require("@sendgrid/mail");
const path = require("path");
const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Replace placeholders like #{name}
const replaceContent = (content, metaData) => {
  return Object.keys(metaData || {}).reduce((updatedContent, key) => {
    return updatedContent.replace(
      new RegExp(`#{${key}}`, "g"),
      metaData[key]
    );
  }, content);
};

const emailHelper = async (templateName, receiverEmail, metaData = {}) => {
  try {

    const templatePath = path.join(
      __dirname,
      "email_templates",
      templateName
    );

    // Read template
    let content = await fs.promises.readFile(templatePath, "utf-8");

    // Replace variables
    content = replaceContent(content, metaData);

    const emailDetails = {
      to: receiverEmail,
      from: {
        email: process.env.EMAIL_FROM,
        name: "Book My Cinema"
      },
      subject: "Mail from Book My Cinema APP",
      html: content,
    };


    console.log("ABOUT TO SEND EMAIL...");

    const response = await sgMail.send(emailDetails);

    console.log("Email sent successfully");


  } catch (err) {
    console.error("MAIL ERROR OCCURRED");

    if (err.code === "ENOENT") {
      console.error("Template file not found:", err.message);
    }
    else if (err.response?.body) {
      console.error("SendGrid Response Error:", JSON.stringify(err.response.body, null, 2));
    }
    else {
      console.error("Error:", err.message);
    }
  }
};

module.exports = emailHelper;