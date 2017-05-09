'use strict';

const net = require('net');

class Connector {

  constructor(port, host){

    this.port = port;
    this.host = host;
  }

  sendData(dataArr, port, host){
    //const host = '3db2d3c6-8c2e-4148-932c-006318e5d19e.carbon.hostedgraphite.com';
    //const host = '84694207.carbon.hostedgraphite.com';
    //Define connection
    const conn = net.createConnection(this.port, this.host, function(){
      console.log('---Connection Established---');
      for(let i =0; i <dataArr.length; i++ ){
        conn.write(dataArr[i])
      }
      console.log('---Finished Writing Data To Stream---')
      conn.end();
    });
    conn.on('error', function(err) { console.log('Error in connection:', err); });
    conn.on('close', function(){ console.log('---Connection Closed---');});
 }
}//end class
module.exports = Connector;
