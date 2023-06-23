public class CapPetPlans {
	@AuraEnabled
    public static List<PetPlanDetails> getPetPlanDetails(String petType){
       System.debug('petType :::'+petType); 
       Map<String,PetPlanDetails> plansMap = new Map<String,PetPlanDetails>();
       List<PetPlanDetails> lstPlanDetails = new List<PetPlanDetails>(); 
       List<Id> lstProdId = new List<Id>(); 
       List<CoveragePlans> lstPlCoverage = null;
       List<CoveragePlans> lstPlNotCoverage = null; 
       List<Product2> lstProducts = [SELECT Family,Id,Name FROM Product2 where Family =:petType];
       PricingTable__c objPricing = [SELECT Elite_Premium__c,Essential_Premium__c,Id,Name,Pet_Type__c,Plus_Premium__c FROM PricingTable__c where Pet_Type__c=:petType and  Name like '%Approx%']; 
       List<Coverage__c> lstPlanCoverage =  [SELECT Display_Order__c,Elite__c, Essential__c, Id, Name, Plus__c FROM Coverage__c order by Display_Order__c];
       system.debug('objPricing =='+objPricing);
        PetPlanDetails objPetPlanDet = null;
        CoveragePlans objPlanCoverage = null;
       for(Product2 objProd : lstProducts){
           objPetPlanDet = new PetPlanDetails();
            List<String> prodName = objProd.Name.split('-');
            objPetPlanDet.productName = prodName.get(1).trim();
            objPetPlanDet.productId = objProd.Id;
            objPetPlanDet.description = '';
           if(objPricing != null){
           		if(objPetPlanDet.productName == 'Essential'){
                    objPetPlanDet.description = 'Optional benefits not included       ';
                    objPetPlanDet.isEssential = true;
               		objPetPlanDet.prodPrice = objPricing.Essential_Premium__c;
                    if(lstPlanCoverage != null && !lstPlanCoverage.isEmpty()){
                        lstPlCoverage = new List<CoveragePlans>();
                        lstPlNotCoverage = new List<CoveragePlans>();
                        for(Coverage__c objCoverage : lstPlanCoverage){
                           objPlanCoverage  = new CoveragePlans();
                            objPlanCoverage.planCoverageId = objCoverage.Id;
                           objPlanCoverage.planCoverage = objCoverage.Name;
                            objPlanCoverage.isCovered = objCoverage.Essential__c;
                            if(objPlanCoverage.isCovered){
                              	lstPlCoverage.add(objPlanCoverage);  
                            }else{
                                lstPlNotCoverage.add(objPlanCoverage);
                            }
                            
                        }
                        System.debug('lstPlCoverage =='+lstPlCoverage);
                        System.debug('lstPlNotCoverage =='+lstPlCoverage);
                        for(CoveragePlans objCP : lstPlNotCoverage){
                            lstPlCoverage.add(objCP);
                        }
                        objPetPlanDet.lstPlanCoverage = lstPlCoverage;
                    }
               }
               else if(objPetPlanDet.productName == 'Elite'){
                   objPetPlanDet.description = 'Includes coverage for Accident & Illness Exam Fees and Rehab';
                   objPetPlanDet.isElite = true;
                   objPetPlanDet.prodPrice = objPricing.Elite_Premium__c;
                   if(lstPlanCoverage != null && !lstPlanCoverage.isEmpty()){
                        lstPlCoverage = new List<CoveragePlans>();
                        lstPlNotCoverage = new List<CoveragePlans>();
                        for(Coverage__c objCoverage : lstPlanCoverage){
                           objPlanCoverage  = new CoveragePlans();
                            objPlanCoverage.planCoverageId = objCoverage.Id;
                           objPlanCoverage.planCoverage = objCoverage.Name;
                            objPlanCoverage.isCovered = objCoverage.Elite__c;
                            if(objPlanCoverage.isCovered){
                              	lstPlCoverage.add(objPlanCoverage);  
                            }else{
                                lstPlNotCoverage.add(objPlanCoverage);
                            }
                           
                        }
                        for(CoveragePlans objCP : lstPlNotCoverage){
                                lstPlCoverage.add(objCP);
                        }
                        objPetPlanDet.lstPlanCoverage = lstPlCoverage;
                    }
               }
               else if(objPetPlanDet.productName == 'Plus'){
                   objPetPlanDet.description = 'Includes coverage for Accident & Illness Exam Fees';
                   objPetPlanDet.isPlus = true;
                   objPetPlanDet.prodPrice = objPricing.Plus_Premium__c;
                   if(lstPlanCoverage != null && !lstPlanCoverage.isEmpty()){
                        lstPlCoverage = new List<CoveragePlans>();
                        lstPlNotCoverage = new List<CoveragePlans>();
                        for(Coverage__c objCoverage : lstPlanCoverage){
                           objPlanCoverage  = new CoveragePlans();
                           objPlanCoverage.planCoverageId = objCoverage.Id;
                           objPlanCoverage.planCoverage = objCoverage.Name;
                            objPlanCoverage.isCovered = objCoverage.Plus__c ;
                            if(objPlanCoverage.isCovered){
                              	lstPlCoverage.add(objPlanCoverage);  
                            }else{
                                lstPlNotCoverage.add(objPlanCoverage);
                            }
                            
                        }
                       for(CoveragePlans objCP : lstPlNotCoverage){
                                lstPlCoverage.add(objCP);
                            }
                        objPetPlanDet.lstPlanCoverage = lstPlCoverage;
                    }
               }    
           }
           
            plansMap.put(objPetPlanDet.productName,objPetPlanDet);
       }
        System.debug('plansMap =='+plansMap); 
        if(!plansMap.isEmpty()){
            /*for(String strKey : plansMap.keySet()){
                lstPlanDetails.add(plansMap.get(strKey));
            }*/
			 lstPlanDetails.add(plansMap.get('Essential'));
             lstPlanDetails.add(plansMap.get('Plus'));	
			 lstPlanDetails.add(plansMap.get('Elite'));  
             
        } 
       System.debug('lstPlanDetails =='+lstPlanDetails); 
      
       return lstPlanDetails;     
        
        
    }
    @AuraEnabled
    public static List<PetPlanDetails> getPlanDetails(String petType,String petAge,String petBreed,String gender){
       System.debug('petType :::'+petType); 
       System.debug('petAge :::'+petAge); 
        System.debug('petBreed :::'+petBreed); 
         System.debug('gender :::'+gender); 
        Integer ptage = Integer.valueOf(petAge);
       Map<String,PetPlanDetails> plansMap = new Map<String,PetPlanDetails>();
       List<PetPlanDetails> lstPlanDetails = new List<PetPlanDetails>(); 
       List<Id> lstProdId = new List<Id>(); 
       List<CoveragePlans> lstPlCoverage = null;
       List<CoveragePlans> lstPlNotCoverage = null; 
       List<Product2> lstProducts = [SELECT Family,Id,Name FROM Product2 where Family =:petType];
       PricingTable__c objPricing = [SELECT Elite_Premium__c,Essential_Premium__c,Id,Name,Pet_Type__c,Plus_Premium__c FROM PricingTable__c where Pet_Type__c=:petType and  Pet_Breed__c =:petBreed and Pet_Gender__c=:gender AND Pet_Age__c =: ptage]; 
       List<Coverage__c> lstPlanCoverage =  [SELECT Display_Order__c,Elite__c, Essential__c, Id, Name, Plus__c FROM Coverage__c order by Display_Order__c];
       system.debug('objPricing =='+objPricing);
        PetPlanDetails objPetPlanDet = null;
        CoveragePlans objPlanCoverage = null;
       for(Product2 objProd : lstProducts){
           objPetPlanDet = new PetPlanDetails();
            List<String> prodName = objProd.Name.split('-');
            objPetPlanDet.productName = prodName.get(1).trim();
            objPetPlanDet.productId = objProd.Id;
            objPetPlanDet.description = '';
           if(objPricing != null){
           		if(objPetPlanDet.productName == 'Essential'){
                    objPetPlanDet.description = 'Optional benefits not included       ';
                    objPetPlanDet.isEssential = true;
               		objPetPlanDet.prodPrice = objPricing.Essential_Premium__c;
                    if(lstPlanCoverage != null && !lstPlanCoverage.isEmpty()){
                        lstPlCoverage = new List<CoveragePlans>();
                        lstPlNotCoverage = new List<CoveragePlans>();
                        for(Coverage__c objCoverage : lstPlanCoverage){
                           objPlanCoverage  = new CoveragePlans();
                            objPlanCoverage.planCoverageId = objCoverage.Id;
                           objPlanCoverage.planCoverage = objCoverage.Name;
                            objPlanCoverage.isCovered = objCoverage.Essential__c;
                            if(objPlanCoverage.isCovered){
                              	lstPlCoverage.add(objPlanCoverage);  
                            }else{
                                lstPlNotCoverage.add(objPlanCoverage);
                            }
                            
                        }
                        System.debug('lstPlCoverage =='+lstPlCoverage);
                        System.debug('lstPlNotCoverage =='+lstPlCoverage);
                        for(CoveragePlans objCP : lstPlNotCoverage){
                            lstPlCoverage.add(objCP);
                        }
                        objPetPlanDet.lstPlanCoverage = lstPlCoverage;
                    }
               }
               else if(objPetPlanDet.productName == 'Elite'){
                   objPetPlanDet.description = 'Includes coverage for Accident & Illness Exam Fees and Rehab';
                   objPetPlanDet.isElite = true;
                   objPetPlanDet.prodPrice = objPricing.Elite_Premium__c;
                   if(lstPlanCoverage != null && !lstPlanCoverage.isEmpty()){
                        lstPlCoverage = new List<CoveragePlans>();
                        lstPlNotCoverage = new List<CoveragePlans>();
                        for(Coverage__c objCoverage : lstPlanCoverage){
                           objPlanCoverage  = new CoveragePlans();
                            objPlanCoverage.planCoverageId = objCoverage.Id;
                           objPlanCoverage.planCoverage = objCoverage.Name;
                            objPlanCoverage.isCovered = objCoverage.Elite__c;
                            if(objPlanCoverage.isCovered){
                              	lstPlCoverage.add(objPlanCoverage);  
                            }else{
                                lstPlNotCoverage.add(objPlanCoverage);
                            }
                           
                        }
                        for(CoveragePlans objCP : lstPlNotCoverage){
                                lstPlCoverage.add(objCP);
                        }
                        objPetPlanDet.lstPlanCoverage = lstPlCoverage;
                    }
               }
               else if(objPetPlanDet.productName == 'Plus'){
                   objPetPlanDet.description = 'Includes coverage for Accident & Illness Exam Fees';
                   objPetPlanDet.isPlus = true;
                   objPetPlanDet.prodPrice = objPricing.Plus_Premium__c;
                   if(lstPlanCoverage != null && !lstPlanCoverage.isEmpty()){
                        lstPlCoverage = new List<CoveragePlans>();
                        lstPlNotCoverage = new List<CoveragePlans>();
                        for(Coverage__c objCoverage : lstPlanCoverage){
                           objPlanCoverage  = new CoveragePlans();
                           objPlanCoverage.planCoverageId = objCoverage.Id;
                           objPlanCoverage.planCoverage = objCoverage.Name;
                            objPlanCoverage.isCovered = objCoverage.Plus__c ;
                            if(objPlanCoverage.isCovered){
                              	lstPlCoverage.add(objPlanCoverage);  
                            }else{
                                lstPlNotCoverage.add(objPlanCoverage);
                            }
                            
                        }
                       for(CoveragePlans objCP : lstPlNotCoverage){
                                lstPlCoverage.add(objCP);
                            }
                        objPetPlanDet.lstPlanCoverage = lstPlCoverage;
                    }
               }    
           }
           
            plansMap.put(objPetPlanDet.productName,objPetPlanDet);
       }
        System.debug('plansMap =='+plansMap); 
        if(!plansMap.isEmpty()){
            /*for(String strKey : plansMap.keySet()){
                lstPlanDetails.add(plansMap.get(strKey));
            }*/
			 lstPlanDetails.add(plansMap.get('Essential'));
             lstPlanDetails.add(plansMap.get('Plus'));	
			 lstPlanDetails.add(plansMap.get('Elite'));  
             
        } 
       System.debug('lstPlanDetails =='+lstPlanDetails); 
      
       return lstPlanDetails;     
        
        
    }
    public class PetPlanDetails{
        @AuraEnabled
        public string productId;
        @AuraEnabled
        public String productName;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public double prodPrice;
        @AuraEnabled
        public List<CoveragePlans> lstPlanCoverage;
        @AuraEnabled
        public boolean isEssential;
         @AuraEnabled
        public boolean isElite;
         @AuraEnabled
        public boolean isPlus;
        
    }
    public class CoveragePlans{
        @AuraEnabled
        public String planCoverage;
        @AuraEnabled
        public String planCoverageId;
         @AuraEnabled
        public boolean isCovered;
    }
}