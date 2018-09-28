
const express = require('express');
const http = require('http');
const path = require('path');

const pkg = require('./package.json');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 4200;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running on port ' +port));

// const forceSSL = function () {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       const path = 'https://' + req.get('Host') + req.url;
//       return res.redirect(path);
//     }
//     next();
//   };
// };

// app.use(forceSSL());

// app.use(express.static(path.join(__dirname, '/dist/pwabemobile')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(path.join(__dirname, '/dist/pwabemobile/index.html')));
// });

// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(pkg.name + ' ' + pkg.version + ' listening on ' + port);
// });