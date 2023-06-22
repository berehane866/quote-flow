/**
 * @description       : 
 * @author            : Bernie Shishaye
 * @group             : 
 * @last modified on  : 06-22-2023
 * @last modified by  : Bernie Shishaye
**/
public class QuoteController {
    
    @InvocableMethod(label='Save Quote' description='Saves a quote' category='Quote')
    public static void saveQuote(List<Quote> qts){
        if(qts.isEmpty())
            return;
        Quote qt = qts[0];
        Account acct = new Account(Name=qt.Email);
        acct.Email_Address__c = qt.Email;        
        Id prospRecordTypeId = [Select Id from RecordType where SObjectType='Account' and Name='Prospect' limit 1].Id;
        acct.RecordTypeId = prospRecordTypeId;
        insert acct;
        Opportunity opp = new Opportunity();
        opp.Name = qt.Pet_Name__c;
        opp.Pet_Age__c = qt.Pet_Age__c;
        opp.Pet_Breed__c = qt.Pet_Breed__c;
        opp.Pet_Type__c = qt.Pet_Type__c;
        opp.AccountId = acct.Id;
        opp.CloseDate = Date.today().addDays(7);
        opp.StageName	 = 'Prospecting';
        insert opp;
        
        qt.OpportunityId = opp.Id;
        qt.Name = generateRandomNumber(10);
        insert qt;
        
    }
    
    @AuraEnabled    
    public static void saveQuoteInfo(Quote qt){
      if(qt==null)
          return;      
      Account acct = new Account(Name=qt.Email);
      acct.Email_Address__c = qt.Email;        
      Id prospRecordTypeId = [Select Id from RecordType where SObjectType='Account' and Name='Prospect' limit 1].Id;
      acct.RecordTypeId = prospRecordTypeId;
      insert acct;
      Opportunity opp = new Opportunity();
      opp.Name = qt.Pet_Name__c;
      opp.Pet_Name__c = qt.Pet_Name__c;
      opp.Pet_Age__c = qt.Pet_Age__c;
      opp.Pet_Breed__c = qt.Pet_Breed__c;
      opp.Pet_Type__c = qt.Pet_Type__c;
      opp.AccountId = acct.Id;
      opp.CloseDate = Date.today().addDays(7);
      opp.StageName	 = 'Prospecting';
      insert opp;
      
      qt.OpportunityId = opp.Id;
      qt.Name = generateRandomNumber(10);
      insert qt;
      
  }

      public static String generateRandomNumber(Integer lengthOfNumber) {
        String result = '';
        while(result.length() < lengthOfNumber){
            //Math.abs used to cast Crypto.getRandomLong() to a positive number
            result += String.valueOf(Math.abs(Crypto.getRandomLong()));
        }
        
        return result.substring(0, lengthOfNumber);
    }


}