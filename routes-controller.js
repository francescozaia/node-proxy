var http = require("http");
var iconv = require('iconv-lite');

// Homepage
exports.homepage = (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
};

// Streets
exports.getStreets = (req, res) => {
  res.send([{
    "test": true
  }]);
};

// Street
exports.getStreet = (client_req, client_res) => {
  let body = '';
  client_req.setEncoding('utf8');
  var options = {
    hostname: 'www.gruppohera.it',
    port: 80,
    path: '/statico/bologna/db_pulizia_strade.php?via=' + client_req.url.replace('/street/', ''),
    method: 'GET'
  };
  client_req.on('data', (chunk) => {
    body += chunk;
  });
  client_req.on('end', () => {
    try {
      //console.log(options.path)
      var proxy = http.request(options, function (proxy_res) {
        proxy_res.pipe(iconv.decodeStream('ISO-8859-1')).pipe(client_res, {
          end: true
        });
      });
      client_req.pipe(proxy, {
        end: true
      });
    } catch (er) {
      // uh oh!
      client_res.statusCode = 400;
      return client_res.end(`error: ${er.message}`);
    }
  });
};