const ElasticEmail = require('@elasticemail/elasticemail-client');
require('dotenv').config()
const {ELASTIC_API_KEY, EMAIL_FROM} = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const {apikey} = defaultClient.authentications;
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi()


const emailMessageData = {
    Recipients: [
        new ElasticEmail.EmailRecipient('vicoci8476@notedns.com')
    ],
    Content: {
        Body: [
            ElasticEmail.BodyPart.constructFromObject(
                {
                    ContentType: "HTML",
                    Content: '<strong>Test email body</strong>'
                }
            )
        ],
    Subject: "Test email subject",
    From: EMAIL_FROM
    }
}


const email = ElasticEmail.EmailMessageData.constructFromObject(emailMessageData)

const callback = (err, data, res) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Api called successfully")
    }
}

api.emailsPost(email, callback);