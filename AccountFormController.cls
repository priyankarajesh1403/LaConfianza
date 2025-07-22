public with sharing class AccountFormController {
    @AuraEnabled
    public static String saveRecords(FormDataWrapper formData) {
        
        Account acc = getAccountDetails(formData); 
        insert acc;

        Contact con = getContactDetails(formData, acc.Id);
        insert con;

        Opportunity opp = getOpportunityDetails(formData, acc.Id);
        insert opp;
        
        return acc.Id;
    }
    
    public static Account getAccountDetails(FormDataWrapper formData){
        Account accnt = new Account();
        accnt.Name = formData.accName;
        accnt.Phone = formData.accPhone;
        accnt.Email__c = formData.accEmail;
        accnt.Industry__c = formData.accIndustry;
        accnt.Amount__c = Decimal.valueOf(formData.accAmount);
        return accnt;
    }
    
    public static Contact getContactDetails(FormDataWrapper formData, Id accntId){
        Contact con = new Contact();
        con.LastName = formData.conLastName;
        con.Email = formData.conEmail;
        con.Phone = formData.conPhone;
        con.Industry__c = formData.conIndustry;
        con.Amount__c = Decimal.valueOf(formData.conAmount);
        con.AccountId = accntId;
        return con;
    }
    
    public static Opportunity getOpportunityDetails(FormDataWrapper formData, Id accntId){
        Opportunity opp = new Opportunity();
        opp.Name = formData.oppName;
        opp.AccountId = accntId;
        opp.StageName = formData.oppStageName;
        opp.Amount = Decimal.valueOf(formData.oppAmount);
        opp.CloseDate = Date.valueOf(formData.oppCloseDate);
        opp.Email__c = formData.oppEmail;
        opp.Phone__c = formData.oppPhone;
        opp.Industry__c = formData.oppIndustry;
        return opp;
    }
}