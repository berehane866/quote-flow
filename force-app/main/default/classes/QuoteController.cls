/**
 * @description       : 
 * @author            : Bernie Shishaye
 * @group             : 
 * @last modified on  : 06-20-2023
 * @last modified by  : Bernie Shishaye
**/
public class QuoteController {
    
    @InvocableMethod(label='Save Quote' description='Saves a quote' category='Quote')
    public static void saveQuote(List<Quote> qts){
        
    }
    
    public class Request {
    @InvocableVariable()
     public String varType1;
    @InvocableVariable()
     public String varType2;
   }

}