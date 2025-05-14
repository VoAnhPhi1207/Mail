const express = require('express');
const bodyParser = require('body-parser');
const { sendWelcomeEmail } = require('./mailer/mailService');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST /send-mail
app.post('/send-mail', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Thiếu email.' });
    }

    try {
        await sendWelcomeEmail(email);
        res.json({ success: true, message: 'Email đã được gửi.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi gửi email.' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
