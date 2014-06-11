
/**
 * Configuration!
 */
var apiUrl       = 'http://localhost:43001';
var travelerId   = '538d84dc76fe93360dcc171a'; // A traveler ID that is in the database
var routeId      = '538d852176fe93360dcc171c'; // A route ID that is in the database



describe("Testing Traveler API - GET /travelers", function() {

    var XMLHttpRequest, result;

    beforeEach(function(done) {
        XMLHttpRequest = createXMLHttpRequest('GET', apiUrl + '/travelers');
        XMLHttpRequest.addEventListener('load', function () {
            result = JSON.parse(XMLHttpRequest.responseText);
            done();
        });
    });

    it("Check if no errors", function() {
        expect(result.err).toBeNull();
    });

    it("Check if 1 or more travelers", function() {
        expect(result.doc.length).toBeGreaterThan(0);
    });

    it("Check if traveler has a name", function() {
        expect(result.doc[0].firstname).toBeDefined();
        expect(result.doc[0].lastname).toBeDefined();
    });

});

describe("Testing Traveler API - GET /travelers/:_id", function() {

    var XMLHttpRequest, result;

    beforeEach(function(done) {
        XMLHttpRequest = createXMLHttpRequest('GET', apiUrl + '/travelers/' + travelerId);
        XMLHttpRequest.addEventListener('load', function () {
            result = JSON.parse(XMLHttpRequest.responseText);
            done();
        });
    });

    it("Check if no errors", function() {
        expect(result.err).toBeNull();
    });

    it("Check if traveler has a name", function() {
        expect(result.doc.firstname).toBeDefined();
        expect(result.doc.lastname).toBeDefined();
    });

});

describe("Testing Traveler API - GET /travelers/verifylogin/:_id", function() {

    var XMLHttpRequest, result;

    beforeEach(function(done) {
        XMLHttpRequest = createXMLHttpRequest('GET', apiUrl + '/travelers/verifylogin/' + travelerId);
        XMLHttpRequest.addEventListener('load', function () {
            result = JSON.parse(XMLHttpRequest.responseText);
            done();
        });
    });

    it("Check if result is true", function() {
        expect(result.verified).toBeTruthy();
    });

});

describe("Testing Traveler API - GET /route/:userId/:routeId", function() {

    var XMLHttpRequest, result;

    beforeEach(function(done) {
        XMLHttpRequest = createXMLHttpRequest('GET', apiUrl + '/travelers/route/' + travelerId + '/' + routeId);
        XMLHttpRequest.addEventListener('load', function () {
            result = JSON.parse(XMLHttpRequest.responseText);
            done();
        });
    });

    it("Check if no errors", function() {
        expect(result.err).toBeNull();
    });

    it("Check if route has a name", function() {
        expect(result.doc.name).toBeDefined();
    });

});


var createXMLHttpRequest = function(method, url) {

    var request;
    request = new window.XMLHttpRequest();

    if (request.withCredentials !== undefined) {
        request.open(method, url, true);
    } else if (typeof XDomainRequest) {
        request = new XDomainRequest();
        request.open(method, url);
    } else {
        request = null;
    }

    request.send(null);

    return request;

};