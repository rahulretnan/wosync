const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3201;
const targetDomain =
  'https://local.functions.nhost.run/v1/store/integration/connect-woocommerce';

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const data = req.body;
  console.log('Received POST request:', data);

  fetch(targetDomain, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        console.error('Error forwarding request:', response.statusText);
        return res.status(500).send('Error forwarding request');
      }
      return response.text();
    })
    .then((responseData) => {
      res.json(responseData);
    })
    .catch((error) => {
      console.error('Error forwarding request:', error);
      res.status(500).send('Error forwarding request');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
