describe("Check The Login Fuctionality By VSCode", function () {
    beforeEach(function () {
        browser.get("http://localhost:3000/#/dashboard");
        browser.sleep(5000);
    });



    it("Test the login page fuctionality", function () {
        browser.sleep(5000);
     this.selectMenu = function (menuIdex, subMenu) {

        var rows = element.all(by.repeater('selMenu in vm.page.pageMenu'));
        rows.get(menuIdex).click();
        rows.element(by.linkText(subMenu)).click()
        browser.sleep5000();
    }
       // browser.waitForAngularEnabled(true);
    
          // get(4).
      //  $('a').
           // click()
        
        element(by.cssContainingText('.ng-binding', 'Organization')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.ng-binding', 'Employee')).click();
        element(by.css('[href*="#/organization/employees/list"]')).click();
        element(by.buttonText('Add')).click();
        element(by.id('inputTitle')).sendKeys('Er.');
        element(by.model('addCtrl.empAdd.EmpFirstName')).sendKeys('Satye');
        element(by.model('addCtrl.empAdd.EmpMiddleName')).sendKeys('Bhan');
        element(by.model('addCtrl.empAdd.EmpLastName')).sendKeys('Paras');
        element(by.id('inputGender')).sendKeys('Male');
        element(by.model('addCtrl.empAdd.JDDate')).sendKeys('10-04-1990');
        
        element(by.id('inputMobile')).sendKeys('8800962965');
        selectDropdownbyNum(element(by.id("inputDepartment")), 2);
        selectDropdownbyNum(element(by.id("inputDesignation")), 3);
        selectDropdownbyNum(element(by.id("inputEmployeeType")), 1);
        selectDropdownbyNum(element(by.id('inputGrade')), 1);
        selectDropdownbyNum(element(by.id('inputLevel')),1);             
        element(by.buttonText('Save')).click;
        browser.sleep(8000);
        
       
    
        // element(by.id('input01')).sendKeys('Satyendra');
        // element(by.id('input02')).sendKeys('123456789');

        // element(by.cssContainingText('.ng-binding', 'Form Layouts')).click();
        // element(by.buttonText('Submit')).click();

      
        // //$('#userName').sendKeys('Itsl_Test')
        // //$('#userPassword').sendKeys('Password1!')
        // //$('#btnlogin').click();

    });

})
var selectDropdownbyNum = function (element, optionNum) {
    if (optionNum) {
        var options = element.getWebElement().findElements(by.tagName('option'))
            .then(function (options) {
                options[optionNum].click();
            });
    }
};
