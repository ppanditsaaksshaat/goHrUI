describe("Check The Login Fuctionality By VSCode", function () {
    beforeEach(function () {
        browser.get("http://akveo.com/blur-admin-mint/#/dashboard");
        browser.sleep(5000);
    });



    it("Test the login page fuctionality", function () {


        // element(by.cssContainingText('.ng-binding', 'Form Elements')).click();//
        element.all(by.repeater('item in ::menuItems')).
            get(4).
            $('a').
            click()
        
        element(by.cssContainingText('.ng-binding', 'Form Inputs')).click();
        element(by.id('input01')).sendKeys('Satyendra');
        element(by.id('input02')).sendKeys('123456789');

        element(by.cssContainingText('.ng-binding', 'Form Layouts')).click();
        element(by.buttonText('Submit')).click();

        browser.sleep(8000);
        //$('#userName').sendKeys('Itsl_Test')
        //$('#userPassword').sendKeys('Password1!')
        //$('#btnlogin').click();

    });
})
