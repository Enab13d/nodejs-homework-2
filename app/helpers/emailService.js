const ElasticEmail = require("@elasticemail/elasticemail-client");
require("dotenv").config();
const { ELASTIC_EMAIL_API_KEY, EMAIL_FROM, PORT } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_EMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const createEmail = (recipient, verificationToken) => {
  const verificationLink = `http://localhost:${PORT}/api/users/verify/${verificationToken}`;
  const emailMessageData = {
    Recipients: [new ElasticEmail.EmailRecipient(recipient)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: `<p>Forward the link below to verify your account. If You didn't try to sign up to our API, please ignore this message</p><a>${verificationLink}</a>`,
        }),
      ],
      Subject: "Verification",
      From: EMAIL_FROM,
    },
  };
  const email =
    ElasticEmail.EmailMessageData.constructFromObject(emailMessageData);

  return email;
};

const emailPostHandler = (err, data, res) => {
  if (err) {
    console.log(err.text);
  } else {
    console.log("Api called successfully");
  }
};
const sendEmail = (email) => {
  api.emailsPost(email, emailPostHandler);
};

const emailService = {
  createEmail,
  sendEmail,
};

module.exports = {
  emailService,
};
