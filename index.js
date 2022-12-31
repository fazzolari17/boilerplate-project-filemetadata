var express = require('express');
var cors = require('cors');
const { urlencoded } = require('express');
require('dotenv').config()
const formidable = require('formidable');


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (request, response, next) => {
  const form = formidable({ multiples: true });

  form.parse(request, (err, fields, file) => {
    if (err) {
      next(err);
      return;
    }
    const { size, originalFilename, mimetype } = file.upfile;

    const responseToSend = {
      name: originalFilename,
      type: mimetype,
      size
    };
    response.status(200).json(responseToSend);
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
