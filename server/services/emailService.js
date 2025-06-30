const nodemailer = require('nodemailer');

function getBodyLine({ username, address, requestText: wish }) {
  return `Request from ${username} \n\nAddress: \n${address} \n\nRequest: \n\n${wish}\n\n ---------`;
}

class EmailService {
  #pendingRequests = [];

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    setTimeout(async () => {
      await this.#sendPendingRequests();
    }, 15 * 1000); // 15 seconds
  }

  async #sendEmail(body) {
    await this.transporter.sendMail({
      from: '"Santa Services" <do_not_reply@northpole.com>',
      to: 'santa@northpole.com',
      subject: 'Gift request(s)',
      text: body,
    });
  }

  async #sendPendingRequests() {
    try {
      if (this.#pendingRequests.length > 0) {
        const body = this.#pendingRequests.map(getBodyLine).join('\n\n');
        await this.#sendEmail(body);
        console.log('Email sent');

        this.#pendingRequests = [];
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(async () => {
        await this.#sendPendingRequests();
      }, 15 * 1000); // 15 seconds
    }
  }

  queueEmail(username, address, wish) {
    this.#pendingRequests.push({ username, address, requestText: wish });
  }
}

module.exports = { EmailService };
