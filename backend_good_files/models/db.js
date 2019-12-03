const mongoose = require('mongoose');

var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
   useUnifiedTopology: true
  };

mongoose.connect('mongodb+srv://dbuser:dbpass4512@cluster0-y2yi4.mongodb.net/test?retryWrites=true&w=majority',
    options,
    function(err) {
     if (err) {
       console.log(`error, failed to connect to the database because --> ${err}`);
     } else {
       console.info('*** Newsroom database coonection done ***');
     }
    }
);

module.exports = mongoose;