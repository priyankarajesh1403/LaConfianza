public with sharing class PropertySearchService {
    @AuraEnabled
    public static String fetchPropertyData(String queryPayload, String apiKey) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://stoplight.io/mocks/batchdata/batchdata/20349728/property/search');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', apiKey);
        req.setBody(queryPayload);

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            return res.getBody();
        } else {
            throw new AuraHandledException('Error: ' + res.getBody());
        }
    }
}