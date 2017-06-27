module.exports = function(app, db) {
  app.post('/photo_upload', (req, res) => {
    console.log('Received request for photo_upload');
    console.log(req.upload);
    res.send('Hello');
  });
};
