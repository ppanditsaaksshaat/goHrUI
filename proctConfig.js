////var json_data = require('./json/crm-add-lead.json');
// var json_data = require('./json/pay-view-emp.json');
////var json_data = require('./json/payroll-add-emp.json');
//console.log(json_data);
//var spec_order = [];
//for (obj in json_data) {
//    if (json_data[obj].Execute === "Y") {
//        spec_order.push(json_data[obj]["Spec_File"]);
//    }
//}
//console.log(spec_order);
// An example configuration file.
//**exports.config = {
    // The address of a running selenium server. 
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance. 
    //*capabilities: {
       //* 'browserName': 'chrome'
   //* },

    // Spec patterns are relative to the current working directly when 
    // protractor is called. 
   //* specs: 'e2e/LoginPage-spec.js',

    //*allScriptsTimeout: 120000,
   //* getPageTimeout: 120000,
   //* jasmineNodeOpts: {
    //*    defaultTimeoutInterval: 120000
    //*},

   //** baseUrl: 'http://web400.hrms'
  // baseUrl: 'http://rudra.itsl.limited'

   
//*};
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/LoginPage-spec.js'],
  capabilities: {
    'browserName': 'firefox'
   
  },
 
  
}