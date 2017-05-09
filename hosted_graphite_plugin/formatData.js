'use strict';


class GraphiteFormatter{

  constructor(filters,apiKey){

    this.filters = filters;
    this.apiKey = apiKey;
  }

  formatData(group, type, data, timestamp){
    //testing
    //start filtering types TODO create a config to select the correct ones
    if( this.filters.indexOf(type) != -1)
      return null;
    //remove the www. & .com from group
    //concatenate it to type
    //grab each value and stick it together with the timestamp &
    //push to array
    let results = [];

    //format the prefix of the metricName
    let domain = group.split('.')[1];
    let prefix =  domain + '.' + type;

    let dataArr = null;

    switch(type){

      case 'gpsi.pageSummary':
        dataArr=this.generateResults(domain, Object.assign({}, data['ruleGroups']), timestamp)
        results = results.concat(dataArr);
        break;
      case 'browsertime.pageSummary':
        dataArr = this.generateResults(domain, Object.assign({}, data['statistics']['timings']), timestamp)
        results = results.concat(dataArr);
        break;
      default:
        break;
    }
    return results;
  }

  generateResults(prefix, obj, timestamp, object){

    let result = [];

    const flattenedObj = this.flattenObject(obj);
    for(let property in flattenedObj){
          result.push( this.apiKey+ '.'+ prefix + '.' + property +' '+ flattenedObj[property] + ' ' + timestamp+'\n');
    }
    return result;

  }
  //from https://gist.github.com/penguinboy/762197
  flattenObject(ob) {
  	var toReturn = {};

  	for (var i in ob) {
  		if (!ob.hasOwnProperty(i)) continue;

  		if ((typeof ob[i]) == 'object') {
  			var flatObject = this.flattenObject(ob[i]);
  			for (var x in flatObject) {
  				if (!flatObject.hasOwnProperty(x)) continue;
  				toReturn[i + '.' + x] = flatObject[x];
  			}
  		} else {
  			toReturn[i] = ob[i];
  		}
  	}
  	return toReturn;
  }
}//end class

module.exports = GraphiteFormatter;
