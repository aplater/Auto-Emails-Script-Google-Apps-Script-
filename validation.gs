function fieldValidation(groupName, array) {
var passValidation = true;
  //Validate Email Quota
if(array.length > MailApp.getRemainingDailyQuota()) {
    passValidation = false;
    Logger.log('Failed fieldValidation: Insuffient Remaining Quota');
}
if(array.length == 0) {
    passValidation = false;
    Logger.log('Failed fieldValidation: No Contact(s) are present in ' + groupName);
}
for (i = 0; i < array.length; i++) {
   //Validate Provide Email address
   var validateEmail = array[i].getPrimaryEmail();
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   //Validate givenName is populated
   var validateGivenName = array[i].getGivenName();
   //Validate Family Name is populated
   var validateFamilyName = array[i].getFamilyName();
   //Validate Subject Line
   switch(groupName) {
     case 'Global()':
       var validateSubject = group1Subject;
       var validateBody = group1Body;
       break;
     case 'Auto-Email1()':
       var validateSubject = group2Subject;
       var validateBody = group2Body;
       break;
     case 'Auto-Email2()':
       var validateSubject = group3Subject;
       var validateBody = group3Body;
       break;
     case 'Auto-Email3()':
       var validateSubject = group4Subject;
       var validateBody = group4Body;
       break;
     default:
       var passValidation = false;
       Logger.log('Failed fieldValidation: groupName needs to be added to fieldValidation parameters!');
   }
   if (emailPattern.test(validateEmail) == false) {
      passValidation = false;
      Logger.log('Failed fieldValidation: Contact has invalid/blank e-mail address in ' + groupName);
   }
   if (validateGivenName == '' || validateGivenName == null) {
      passValidation = false;
      Logger.log('Failed fieldValidation: Contact has invalid/blank Given Name in ' + groupName);
   }
   if (validateFamilyName == '' || validateFamilyName == null) {
      passValidation = false;
      Logger.log('Failed fieldValidation: Contact has invalid/blank Family Name in ' + groupName);
   }
   if (validateSubject == '' || validateSubject == null) {
      passValidation = false;
      Logger.log('Failed fieldValidation: Email has invalid/blank Subject Field');
   }
    if (validateBody == '' || validateBody == null) {
      passValidation = false;
      Logger.log('Failed fieldValidation: Email has invalid/blank Body Field');
   }
  }
writeLog();
return passValidation
}

//Declare Sheets
var emailSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Email');
var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
var trackingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tracking');
//Global Variables
var todaysDate = Utilities.formatDate(new Date(), "EST", "MM-dd-yyyy");
var currentTime = Utilities.formatDate(new Date(), "EST", "HH:mm:ss");
var userEmail = Session.getActiveUser().getEmail();
var username = extractTextBefore(userEmail,"@");
//Group1 = Global()
var group1 = emailSheet.getRange('B2').getValue();
var group1Subject = emailSheet.getRange('C2').getValue();
var group1Body = emailSheet.getRange('C4').getValue();
var group1Campaign = emailSheet.getRange('B8').getValue();
var group1Attachment1 = emailSheet.getRange('B6').getValue();
//Group2 = Auto-Email1()
var group2 = emailSheet.getRange('B10').getValue();
var group2Subject = emailSheet.getRange('C10').getValue();
var group2Body = emailSheet.getRange('C12').getValue();
var group2Campaign = emailSheet.getRange('B16').getValue();
var group2Attachment1 = emailSheet.getRange('B14').getValue();
//Group3 = Auto-Email2()
var group3 = emailSheet.getRange('B18').getValue();
var group3Subject = emailSheet.getRange('C18').getValue();
var group3Body = emailSheet.getRange('C20').getValue();
var group3Campaign = emailSheet.getRange('B24').getValue();
var group3Attachment1 = emailSheet.getRange('B22').getValue();
//Group4 = Auto-Email3()
var group4 = emailSheet.getRange('B26').getValue();
var group4Subject = emailSheet.getRange('C26').getValue();
var group4Body = emailSheet.getRange('C28').getValue();
var group4Campaign = emailSheet.getRange('B32').getValue();
var group4Attachment1 = emailSheet.getRange('B30').getValue();