const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { EmailService } = require('./server/services/emailService');
const {
  getUserProfile,
  isLessThan10YearsOld,
} = require('./server/utils/profileUtils');

const emailService = new EmailService();

app.use(bodyParser());
app.use(morgan());

app.use(express.static('dist'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});

app.get('/api/can-ask/:username', async (request, response) => {
  const { username } = request.params;

  if (!username) {
    return response.status(400).json({ error: 'Username is required' });
  }

  try {
    const profile = await getUserProfile(username);

    if (!profile) {
      return response.status(404).end();
    }

    return response
      .status(200)
      .json({ allowed: isLessThan10YearsOld(profile.birthdate) });
  } catch (e) {
    console.log(e);

    return response.status(500).end();
  }
});

app.post('/api/ask-santa', async (request, response) => {
  const { username, wish } = request.body;

  if (!username || !wish) {
    return response
      .status(400)
      .json({ error: 'Username and List is required' });
  }

  if (wish.length > 100) {
    return response.status(400).json({
      error: 'Your wish is too long. Only 120 characters are allowed',
    });
  }

  try {
    const profile = await getUserProfile(username);

    if (!profile) {
      return response.status(404).end();
    }

    if (isLessThan10YearsOld(profile.birthdate)) {
      emailService.queueEmail(username, profile.address, wish);

      return response.status(204).end();
    } else {
      return response.status(400).json({ error: 'Only under 10s are allowed' });
    }
  } catch (e) {
    console.log(e);

    return response.status(500).end();
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
