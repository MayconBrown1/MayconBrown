const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(bodyParser.json());

mailchimp.setConfig({
    apiKey: '89c9631ce1ea1c5a71a755043837113e-us21',
    server: 'us21'
});

app.post('/send-email', async (req, res) => {
    const { email } = req.body;

    try {
        await mailchimp.lists.addListMember('318989', {
            email_address: email,
            status: 'subscribed'
        });
        res.json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Falha ao enviar email.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

val sdkKey = "d3c13607623b1caef7e449380e4392f0-us21"
val isDebugBuild = BuildConfig.DEBUG
val configuration = MailchimpSdkConfiguration.Builder(context, sdkKey)
    .isDebugModeEnabled(isDebugBuild)
    .isAutoTaggingEnabled(true)
    .build()
val mailchimpSdk = Mailchimp.initialize(configuration)