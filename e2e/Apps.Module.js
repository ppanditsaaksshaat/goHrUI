var AppsPage = function () {
    this.hire = 'hire';
    this.crm = 'crm';
    this.emp = 'emp';

    this.openApp = function (appName) {

        var appButton = element(by.css('[ng-click="vm.loadModule(\'' + appName + '\')"]'));
        appButton.click();
       
    };
};

module.exports = new AppsPage();