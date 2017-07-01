//server.js All our server code goes here

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var Excel = require('exceljs');

const fs = require('fs');
var path = require('path')

var multer = require('multer');
var upload = multer({
  dest: 'uploads/'
});

require('./app/routes')(app, {});
app.use(express.static(path.join(__dirname, 'public')));


const port = 3000;
app.listen(port, () => {
  console.log('Your Server is up and running \nWe are live on ' + port);
});

app.get('/', (req, res) => {

  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
});

var type = upload.single('file');
var form_body = {};
app.post('/submit_form', type, function(req, res) {
  console.log(req.body);
  form_body = req.body;
  var tmp_path = req.file.path;
  var target_path = 'uploads/image.jpg';


  var workbook = new Excel.Workbook();
  var sheet = workbook.addWorksheet("Employee details");
  // ==================================================================================


  sheet.columns = [{
    header: 'ID',
    name: 'c_ID'
  }, {
    header: 'Name',
    key: 'name'
  }, {
    header: 'Email ID',
    key: 'email_id'
  }, {
    header: 'Mobile',
    key: 'phone'
  }, {
    header: 'Password',
    key: 'pwd'
  }, {
    header: 'AADHAAR CARD NO',
    key: 'aadhaar'
  }];
  sheet.addRow([form_body.customer_id, form_body.customer_name, form_body.customer_e_mail, form_body.phone1, form_body.password, form_body.aadhar]).commit();


  // =====================================================================================
  workbook.xlsx.writeFile("./details.xlsx").then(function() {
      console.log("xlsx file is written.");
    })
    .catch(err => console.error(err));;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);

  src.on('end', function() {
    fs.readFile('test.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': data.length
      });
      res.write(data);
      // res.json(req.body);
      res.end();
    });
  });
  src.on('error', function(err) {
    res.send('error')
  });

});
app.post('/get-form-data', (req, res) => {
  console.log("Req Received for data");
  res.json(form_body);
});

app.get('/image.jpg', (req, res) => {
  res.sendFile(path.resolve('./uploads/image.jpg'));
});
