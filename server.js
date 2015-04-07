var hackerschool = require('hackerschool-api'),
    app = require('express')();

var client = hackerschool.client();

var auth = hackerschool.auth({
  client_id: 'f05c4dc14b4c383ab308fc2695def483a0cdcf6e70a3e0c356523f814bdff26e',
  client_secret: '11f8a7306871c70e355281e590df7347bb1d565a5179403c0777462161e5d16b',
  redirect_uri: 'http://localhost:3000/login/complete'
});

app.get('/login', function(req, res) {
  var authUrl = auth.createAuthUrl();
  //console.log(authUrl);

  // redirect the user to the auth page
  res.redirect(authUrl);
});

app.get('/login/complete', function(req, res) {
  var code = req.query.code;

  auth.getToken(code)
  .then(function(token) {
    // tells the client instance to use this token for all requests
    client.setToken(token);
    res.send('Got a token!');
    //console.log(token);
  }, function(err) {
    res.send('There was an error getting the token');
  });
});

app.listen(3000);
console.log('Live');