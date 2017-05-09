'use strict';

const path = require('path');
const GraphiteFormatter = require('./formatData.js');
const Connector = require('./Connector.js');

module.exports = {
  name() {

    return path.basename(__dirname);
  },
  open(context, options) {

    this.filters = options.epic.filters;
    this.hostedApiKey = options.epic.hostedApiKey;
    this.hostedPort = options.epic.hostedPort;
    this.hostedHostName = options.epic.hostedHostName;

    this.timestamp = context.timestamp.format('X');

  },
  processMessage(message, queue) {
    //boilerplate
    if(!(message.type.endsWith('.summary') || message.type.endsWith('.pageSummary')))
      return ;
    if(message.group === 'total')
      return;
    //format data
    const graphiteFormatter = new GraphiteFormatter(this.filters, this.hostedApiKey);
    let readyData = graphiteFormatter.formatData(message.group, message.type, message.data, this.timestamp);

    if(readyData == null)
      return;
    //TODO Test Only TODO Test Only TODO
    if(readyData.length > 50)
      readyData = readyData.slice(0,49);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^TEST ONLY
    const connector = new Connector(this.hostedPort, this.hostedHostName);
    connector.sendData(readyData);
  },
  close(options, errors) {
    // When all URLs are finished all plugins close function is called once.
    // Options are the configuration options and errors a array of errors
    // from the run.
  }

};
