public class FormDataWrapper {   
    
    @AuraEnabled public String accName { get; set; }
    @AuraEnabled public String accEmail { get; set; }
    @AuraEnabled public String accPhone { get; set; }
    @AuraEnabled public String accIndustry { get; set; }
    @AuraEnabled public String accAmount { get; set; }
    
    @AuraEnabled public String conLastName { get; set; }
    @AuraEnabled public String conEmail { get; set; }
    @AuraEnabled public String conPhone { get; set; }
   	@AuraEnabled public String conIndustry { get; set; }
    @AuraEnabled public String conAmount { get; set; }

    @AuraEnabled public String oppName { get; set; }
   	@AuraEnabled public String oppStageName { get; set; }
   	@AuraEnabled public String oppCloseDate { get; set; }
   	@AuraEnabled public String oppAmount { get; set; }
   	@AuraEnabled public String oppEmail { get; set; }
   	@AuraEnabled public String oppPhone { get; set; }
   	@AuraEnabled public String oppIndustry { get; set; }
}