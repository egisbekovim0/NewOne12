const axios = require('axios');

const accessToken = 'your-access-token';  // Replace with your actual access token

const badgeAssertion = {
  recipient: {
    identity: 'recipient@example.com',
    type: 'email',
    hashed: true,
  },
  badge: 'badge-class-url',  // URL to the badge class (metadata)
  verify: { type: 'hosted', url: 'evidence-url' },  // Optional evidence URL
};

axios.post('https://api.openbadges.org/issuer/assertions', badgeAssertion, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
.then(response => {
  console.log('Badge issued successfully:', response.data);
})
.catch(error => {
  console.error('Error issuing badge:', error.response ? error.response.data : error.message);
});