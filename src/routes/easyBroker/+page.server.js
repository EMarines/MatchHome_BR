const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-Authorization': 'x0lk7kyxiuobh016le9znt24222uil'
  }
};

fetch('https://api.easybroker.com/v1/integration_partners/contact_requests?page=1&limit=20', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  console.log(Response);