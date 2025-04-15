const https = require('https');

const FIGMA_ACCESS_TOKEN = 'REMOVED_TOKEN';
const FILE_KEY = 'EB9T98cKHm1n3Ob7tbyobA';
const NODE_ID = '331-17222';

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${FILE_KEY}/nodes?ids=${NODE_ID}`,
  method: 'GET',
  headers: {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const parsedData = JSON.parse(data);
      console.log(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end(); 