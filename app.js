const express = require('express')
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
const app = express()

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/poc/:tranTypCd', function(req, res, next){
	
  	var tranTypeCd = req.params.tranTypCd;
	// Get a non-pooled connection
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  },
	  function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      // The statement to execute
	      //sqlquery,
	      'select * from TML.TM_TRAN_TYP WHERE TRAN_TYP_ID = :ttc',

	      // The "bind value" 180 for the bind variable ":id"
	      [tranTypeCd],

	      // execute() options argument.  Since the query only returns one
	      // row, we can optimize memory usage by reducing the default
	      // maxRows value.  For the complete list of other options see
	      // the documentation.
	      { maxRows: 1
	        //, outFormat: oracledb.OBJECT  // query result format
	        //, extendedMetaData: true      // get extra metadata
	        //, fetchArraySize: 100         // internal buffer allocation size for tuning
	      },

	      // The callback function handles the SQL execution results
	      function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          res.send('Error: ' + err.message);
	          //return;
	        }
	        //console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
	        //console.log(result.rows);     // [ [ 180, 'Construction' ] ]
	        console.log(result);
	        doRelease(connection);
	        res.send(result);
	      });
	  });

	// Note: connections should always be released when not needed
	function doRelease(connection) {
	  connection.close(
	    function(err) {
	      if (err) {
	        console.error(err.message);
	      }
	    });
	}

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
