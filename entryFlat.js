async function entryFlat(){

        //Compare the variable obtained from the file with the value in the input
        fileContent = fileChek.value;
        //split the value to line
        const lines = fileContent.split('\n');
    
        removeElemntmessageRuslt();









  //Ignoring lines with spaces at the end of the file or in the middle of the file
  let nonEmptyLines = [];
  let consecutiveEmptyLines = 0;
  for (let j = 0; j < lines.length; j++) {
      const currentLine = lines[j].trim();
      if (currentLine === "") {
          consecutiveEmptyLines++;
      } else {
          if (consecutiveEmptyLines > 0) {
              nonEmptyLines.push("");
              consecutiveEmptyLines = 0;
          }
          nonEmptyLines.push(currentLine);
      }

  }
  lines.length = lines.length - (consecutiveEmptyLines);








  //fixed values in the certificate
  //line 1
  const ENV00101 = "ENV00101";
  const MMDR01 = "MMDR01";
  const MMDR02L = "MMDR02L";
  const MMDR02R = "MMDR02R";
  //constant values line 2
  const HEAD0101 = "HEAD0101";


  //constant values line 3 option
  const HEAD0301 = "HEAD0301";
  const HEAD0201 = "HEAD0201";
  const SU = "SU";
  const SN = "SN";
  //constant values line 4
  const HEAD0401 = "HEAD0401";
  //constant values Barcode
  const LINE0101 = "LINE0101";
  //constant values One line before last
  const HEAD9901 = "HEAD9901";
  //constant values last line
  const ENV00201 = "ENV00201";












 //valueFromFile line 1
    const StartOfLineENV00101 = lines[0].substring(0, 8);
    const NumReceivingFromeDocument = lines[0].substring(8, 23);
    const nameDocument1 = lines[0].substring(23, 33);
    const nameDocument2 = lines[0].substring(23, 33);
    const typeDocument = lines[0].substring(33, 47);
    const numSenderFromeDocument = lines[0].substring(49, 64);
    //valueFromFile line 2
    const StartOfLineHEAD0101 = lines[1].substring(0, 8);
    const typeOrder = lines[1].substring(8, 11);
    const numMessageFromeDocument = lines[1].substring(8, 23);
    const numSupdesFromeDocument = lines[1].substring(50, 65);
    const statusEntry = lines[1].substring(23, 26);

    //valueFromFile line 2
    const StartOfLineHEAD0301 = lines[2].substring(0, 8);
    const StartOfLineHEAD0201 = lines[2].substring(0, 8);
    //   const StartOfLineHEAD0401 = lines[2].substring(0, 8);
    const TermsOfPayment = lines[2].substring(8, 11);
    //time value
    const timeDocument = lines[1].substring(26, 38).trim();
    const timeDocumentLength = 12;
    const booleneLength = timeDocument.length === timeDocumentLength;
    const year = Number(timeDocument.substring(0, 4));
    const month = Number(timeDocument.substring(4, 6));
    const day = Number(timeDocument.substring(6, 8));
    const hour = Number(timeDocument.substring(8, 10));
    const minute = Number(timeDocument.substring(10, 12));



//time Actual Arrival Time
    const timeDocumentActualArrivalTime = lines[1].substring(38, 50).trim();
    const timeDocumentLengthActualArrivalTimetLength = 12;
    const booleneLengthActualArrivalTime = timeDocumentActualArrivalTime.length === timeDocumentLengthActualArrivalTimetLength;
    const yearActualArrivalTime = Number(timeDocumentActualArrivalTime.substring(0, 4));
    const monthActualArrivalTime = Number(timeDocumentActualArrivalTime.substring(4, 6));
    const dayActualArrivalTime = Number(timeDocumentActualArrivalTime.substring(6, 8));
    const hourActualArrivalTime = Number(timeDocumentActualArrivalTime.substring(8, 10));
    const minuteActualArrivalTime = Number(timeDocumentActualArrivalTime.substring(10, 12));


//time sent supdes
    const timeDocumentSentSupdes = lines[1].substring(65, 73).trim();
    const timeDocumentSentSupdesLength = 8;
    const booleneSentSupdesLength = timeDocumentSentSupdes.length === timeDocumentSentSupdesLength;
    const yearSentSupdes = Number(timeDocumentSentSupdes.substring(0, 4));
    const monthSentSupdes = Number(timeDocumentSentSupdes.substring(4, 6));
    const daySentSupdes = Number(timeDocumentSentSupdes.substring(6, 8));
  





    const StartOfLineHEAD9901 = lines[lines.length - 2].substring(0, 8);
    //valueFromFile last line
    const StartOfLineENV00201 = lines[lines.length - 1].substring(0, 8);



    //A function to check between the fixed value and a value found in the file
    function compareStringsIgnoreCaseAndSpace(valueFromFile, constantValue) {
        // Check if value is defined and not empty
        if (valueFromFile === undefined || valueFromFile.trim() === "") {
            return false;
        }
        // Remove spaces from both the value and target strings
        const formattedValue = valueFromFile.trim();
        const formattedTarget = constantValue.trim();

        // Check if the formatted value is exactly equal to the formatted target
        return formattedTarget === formattedValue;
    }







    //Checking whether there are no errors in the barcodes div If not, the div will be raised from the screen
    var barcodesStyle = document.getElementById('barcodes');
    if (!barcodesStyle.innerHTML.includes('<p>')) {
        // console.log('No paragraphs found in the div.');
        barcodesStyle.style.display = "none";
    }



 //Checking whether there are no errors in the constantValues div If not, the div will be raised from the screen
 var constantValuesStyle = document.getElementById('constantValues');
 if (!constantValuesStyle.innerHTML.includes('<p>')) {
     // console.log('No paragraphs found in the div.');
     constantValuesStyle.style.display = "none";
 }







    //**************************************Variable values in the message**************************************************** */





   //type mass line 1, 33-47  main div
   if (!compareStringsIgnoreCaseAndSpace(typeDocument, MMDR01)) {
    removeErrorMessageById("typeDocumentomHtmlEror");
    removeErrorMessageById("typeDocumentFromeHtml");
    messageRusltconstantValuesMain("typeDocumentFromeHtml", "typeDocumentomHtmlEror");
    typeDocumentomHtmlEror.innerHTML = "33-47 ,ערך חסר או שגוי ,שורה 1 " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + typeDocument + "<br>" + ": ערך רצוי" + "<br>" + MMDR01;
    typeDocumentFromeHtml.innerHTML = "סוג תעודה: כניסה"
    iconX(typeDocumentFromeHtml);
} else {
    removeErrorMessageById("typeDocumentomHtmlEror");
    removeErrorMessageById("typeDocumentFromeHtml");
    messageRusltconstantValuesMain("typeDocumentFromeHtml", "typeDocumentomHtmlEror");
    typeDocumentFromeHtml.innerHTML = "סוג תעודה: כניסה"
    iconV(typeDocumentFromeHtml);

}







    //num mass line 1, 11-41  main div
    if (numMessageFromeDocument.trim() === "") {
        removeErrorMessageById("numMessageFromHtmlEror");
        removeErrorMessageById("numMessageFromHtml");
        messageRusltconstantValuesMain("numMessageFromHtml", "numMessageFromHtmlEror");
        numMessageFromHtmlEror.innerHTML = "11-41 , ערך של מספר תעודה  חסר ,שורה 2";
        numMessageFromHtml.innerHTML = "מספר תעודה: חסר";
        iconX(numMessageFromHtml);
    } else {
        removeErrorMessageById("numMessageFromHtmlEror");
        removeErrorMessageById("numMessageFromHtml");
        messageRusltconstantValuesMain("numMessageFromHtml", "numMessageFromHtmlEror");
        numMessageFromHtml.innerHTML = numMessageFromeDocument + " :מספר  תעודה";
        iconV(numMessageFromHtml);

    }







        //num supdes line 1, 50-65  main div
        if (numSupdesFromeDocument.trim() === "") {
            removeErrorMessageById("numSupdesFromeDocumentEror");
            removeErrorMessageById("numSupdesFromeDocumentHtml");
            messageRusltconstantValuesMain("numSupdesFromeDocumentHtml", "numSupdesFromeDocumentEror");
            numSupdesFromeDocumentEror.innerHTML = "50-65 , ערך של מספר תעודת משלוח מקושרת חסר ,שורה 2";
            numSupdesFromeDocumentHtml.innerHTML = "מספר תעודת משלוח: חסר";
            iconX(numSupdesFromeDocumentHtml);
        } else {
            removeErrorMessageById("numSupdesFromeDocumentEror");
            removeErrorMessageById("numSupdesFromeDocumentHtml");
            messageRusltconstantValuesMain("numSupdesFromeDocumentHtml", "numSupdesFromeDocumentEror");
            numSupdesFromeDocumentHtml.innerHTML = numSupdesFromeDocument + " :מספר  תעודת משלוח מקושרת";
            iconV(numSupdesFromeDocumentHtml);
    
        }




 




   //status order line 1, 50-23  main div
   statusEntryF(statusEntry);













   //date mass line 2, 26-38  main div
   removeErrorMessageById("dateTimeHtmlEror");
   removeErrorMessageById("dateTimeHtml");
   messageRusltconstantValuesMain("dateTimeHtml", "dateTimeHtmlEror");

   if (booleneLength === false || isNaN(booleneLength)) {
       iconXTime(dateTimeHtml);
       dateTimeHtmlEror.innerHTML = "<br>" + ", פורמט תאריך הזמנה  שגוי , מספר התווים או מיקום התאריך בקובץ שגוי " + "<br>" + "  26-38 ,שורה 2" + "<br>";
   }
   if (year < 2023 || isNaN(year) || timeDocument.substring(0, 4) === "") {
       iconXTime(dateTimeHtml);
       dateTimeHtmlEror.innerHTML += "<br>" + "26-38 , פורמט תאריך שנה שגוי  ,שורה 2" + "<br>";
   }

   if (month < 1 || month > 12 || isNaN(month) || timeDocument.substring(4, 6) === "") {
       iconXTime(dateTimeHtml);
       dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך חודש שגוי,שורה 2, 26-38" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(4, 6) + "<br>" + ": ערך רצוי" + "<br>" + "12>month>1" + "<br>";
   }

   if (day < 1 || day > 31 || isNaN(day) || timeDocument.substring(6, 8) === "") {
       iconXTime(dateTimeHtml);
       dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך יום שגוי,שורה 2, 26-38" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(6, 8) + "<br>" + ": ערך רצוי" + "<br>" + "31>day>1" + "<br>";

   }

   if (hour < 0 || hour > 24 || isNaN(hour) || timeDocument.substring(8, 10) === "") {
       iconXTime(dateTimeHtml);
       dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך שעה שגוי,שורה 2, 26-38" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(8, 10) + "<br>" + ": ערך רצוי" + "<br>" + "24>hour>0" + "<br>";

   }

   if (minute < 0 || minute > 59 || isNaN(minute) || timeDocument.substring(10, 12) === "") {
       iconXTime(dateTimeHtml);
       dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך דקה שגוי,שורה 2, 26-38" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(10, 12) + "<br>" + ": ערך רצוי" + "<br>" + "59>minute>0" + "<br>";


   }

   dateTimeHtml.innerHTML += day + "/" + month + "/" + year + "-" + hour + ":" + minute + " :תאריך  תעודה";
   dateTimeHtml.style.right = "32px";


   var dateTimeHtml1 = document.getElementById('dateTimeHtml');
   var icons = dateTimeHtml1.querySelectorAll('.fa-solid.fa-x');
   if (icons.length > 0) {
   } else {
       iconVTime(dateTimeHtml);
   }











   


   //date mass actual arrival time line 2, 38-50  main div
   removeErrorMessageById("ActualArrivalTimedateTimeHtmlEror");
   removeErrorMessageById("ActualArrivalTimedateTimeHtml");
   messageRusltconstantValuesMain("ActualArrivalTimedateTimeHtml", "ActualArrivalTimedateTimeHtmlEror");

   if (timeDocumentLengthActualArrivalTimetLength === false || isNaN(timeDocumentLengthActualArrivalTimetLength)) {
       iconXTime(ActualArrivalTimedateTimeHtml);
       ActualArrivalTimedateTimeHtmlEror.innerHTML = "<br>" + ", פורמט תאריך הזמנה  שגוי , מספר התווים או מיקום התאריך בקובץ שגוי " + "<br>" + "  38-50 ,שורה 2" + "<br>";
   }
   if (yearActualArrivalTime < 2023 || isNaN(yearActualArrivalTime) || timeDocumentActualArrivalTime.substring(0, 4) === "") {
       iconXTime(ActualArrivalTimedateTimeHtml);
       ActualArrivalTimedateTimeHtmlEror.innerHTML += "<br>" + "38-50 , פורמט תאריך שנה שגוי  ,שורה 2" + "<br>";
   }

   if (monthActualArrivalTime < 1 || monthActualArrivalTime > 12 || isNaN(monthActualArrivalTime) || timeDocumentActualArrivalTime.substring(4, 6) === "") {
       iconXTime(ActualArrivalTimedateTimeHtml);
       ActualArrivalTimedateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך חודש שגוי,שורה 2, 38-50" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocumentActualArrivalTime.substring(4, 6) + "<br>" + ": ערך רצוי" + "<br>" + "12>month>1" + "<br>";
   }

   if (dayActualArrivalTime < 1 || dayActualArrivalTime > 31 || isNaN(dayActualArrivalTime) || timeDocumentActualArrivalTime.substring(6, 8) === "") {
       iconXTime(ActualArrivalTimedateTimeHtml);
       ActualArrivalTimedateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך יום שגוי,שורה 2, 38-50" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocumentActualArrivalTime.substring(6, 8) + "<br>" + ": ערך רצוי" + "<br>" + "31>day>1" + "<br>";

   }

   if (hourActualArrivalTime < 0 || hourActualArrivalTime > 24 || isNaN(hourActualArrivalTime) || timeDocumentActualArrivalTime.substring(8, 10) === "") {
       iconXTime(ActualArrivalTimedateTimeHtml);
       ActualArrivalTimedateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך שעה שגוי,שורה 2, 38-50" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocumentActualArrivalTime.substring(8, 10) + "<br>" + ": ערך רצוי" + "<br>" + "24>hour>0" + "<br>";

   }

   if (minuteActualArrivalTime < 0 || minuteActualArrivalTime > 59 || isNaN(minuteActualArrivalTime) || timeDocumentActualArrivalTime.substring(10, 12) === "") {
       iconXTime(ActualArrivalTimedateTimeHtml);
       ActualArrivalTimedateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך דקה שגוי,שורה 2, 38-50" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocumentActualArrivalTime.substring(10, 12) + "<br>" + ": ערך רצוי" + "<br>" + "59>minute>0" + "<br>";


   }

   ActualArrivalTimedateTimeHtml.innerHTML += dayActualArrivalTime + "/" + monthActualArrivalTime + "/" + yearActualArrivalTime + "-" + hourActualArrivalTime + ":" + minuteActualArrivalTime + " :תאריך  הגעת הסחורה";
   ActualArrivalTimedateTimeHtml.style.right = "32px";


   var dateTimeHtml12 = document.getElementById('ActualArrivalTimedateTimeHtml');
   var icons1 = dateTimeHtml12.querySelectorAll('.fa-solid.fa-x');
   if (icons1.length > 0) {
   } else {
       iconVTime(ActualArrivalTimedateTimeHtml);
   }













  //date SentSupdes line 2, 65-73  main div
  removeErrorMessageById("SentSupdesdateTimeHtmlEror");
  removeErrorMessageById("");
  messageRusltconstantValuesMain("SentSupdesdateTimeHtml", "SentSupdesdateTimeHtmlEror");

  if (booleneSentSupdesLength === false || isNaN(booleneSentSupdesLength)) {
      iconXTime(SentSupdesdateTimeHtml);
      SentSupdesdateTimeHtmlEror.innerHTML = "<br>" + ", פורמט תאריך הזמנה  שגוי , מספר התווים או מיקום התאריך בקובץ שגוי " + "<br>" + "  26-38 ,שורה 2" + "<br>";
  }
  if (yearSentSupdes < 2023 || isNaN(yearSentSupdes) || timeDocumentSentSupdes.substring(0, 4) === "") {
      iconXTime(SentSupdesdateTimeHtml);
      SentSupdesdateTimeHtmlEror.innerHTML += "<br>" + "26-38 , פורמט תאריך שנה שגוי  ,שורה 2" + "<br>";
  }

  if (monthSentSupdes < 1 || monthSentSupdes > 12 || isNaN(monthSentSupdes) || timeDocumentSentSupdes.substring(4, 6) === "") {
      iconXTime(SentSupdesdateTimeHtml);
      SentSupdesdateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך חודש שגוי,שורה 2, 26-38" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocumentSentSupdes.substring(4, 6) + "<br>" + ": ערך רצוי" + "<br>" + "12>month>1" + "<br>";
  }

  if (daySentSupdes < 1 || daySentSupdes > 31 || isNaN(daySentSupdes) || timeDocumentSentSupdes.substring(6, 8) === "") {
      iconXTime(SentSupdesdateTimeHtml);
      SentSupdesdateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך יום שגוי,שורה 2, 26-38" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocumentSentSupdes.substring(6, 8) + "<br>" + ": ערך רצוי" + "<br>" + "31>day>1" + "<br>";

  }



  SentSupdesdateTimeHtml.innerHTML += daySentSupdes + "/" + monthSentSupdes + "/" + yearSentSupdes + " :תאריך  תעודת משלוח";
  SentSupdesdateTimeHtml.style.right = "32px";


  var dateTimeHtml13 = document.getElementById('SentSupdesdateTimeHtml');
  var icons3 = dateTimeHtml13.querySelectorAll('.fa-solid.fa-x');
  if (icons3.length > 0) {
  } else {
      iconVTime(SentSupdesdateTimeHtml);
  }





























  //num Receiver line 1, 8-23 main div
  const re = await fetch("data.json");
  const response = await re.json();
  var valueKey = "";
  response.forEach(item => {
      if (NumReceivingFromeDocument.trim() === item.value) {
          valueKey = item.key;
          removeErrorMessageById("NumReceivingFromeDocumentHtml");
          removeErrorMessageById("NumReceivingFromeDocumentEror");
          messageRusltconstantValuesMain("NumReceivingFromeDocumentHtml", "NumReceivingFromeDocumentEror");
          NumReceivingFromeDocumentHtml.innerHTML = "שם הספק : " + item.key + " , " + NumReceivingFromeDocument;
          iconV(NumReceivingFromeDocumentHtml);
      }
  });
  if (valueKey === "") {
      removeErrorMessageById("NumReceivingFromeDocumentHtml");
      removeErrorMessageById("NumReceivingFromeDocumentEror");
      messageRusltconstantValuesMain("NumReceivingFromeDocumentHtml", "NumReceivingFromeDocumentEror");
      NumReceivingFromeDocumentHtml.innerHTML = NumReceivingFromeDocument + " , " + "שם הספק : " + "ספק לא ידוע";
      iconX(NumReceivingFromeDocumentHtml);
  }
  NumReceivingFromeDocumentEror.innerHTML = "ספק לא ידוע ,שורה 1, 8-23";









  
    //num Sender line 1, 49-64 main div
    const reSender = await fetch("retailerDataOrder.json");
    const responseSender = await reSender.json();
    var valueKeySender = "";
    responseSender.forEach(item => {
        if (numSenderFromeDocument.trim() === item.key) {
            valueKeySender = item.value;
            removeErrorMessageById("numSenderFromeDocumentHtml");
            removeErrorMessageById("numSenderFromeDocumentEror");
            messageRusltconstantValuesMain("numSenderFromeDocumentHtml", "numSenderFromeDocumentEror");
            numSenderFromeDocumentHtml.innerHTML = "שם הרשת : " + item.value + " , " + numSenderFromeDocument;
            iconV(numSenderFromeDocumentHtml);

        }

    });
    if (valueKeySender === "") {
        removeErrorMessageById("numSenderFromeDocumentHtml");
        removeErrorMessageById("numSenderFromeDocumentEror");
        messageRusltconstantValuesMain("numSenderFromeDocumentHtml", "numSenderFromeDocumentEror");
        numSenderFromeDocumentHtml.innerHTML = numSenderFromeDocument + " , " + "שם הרשת : " + "רשת לא ידועה";
        iconX(numSenderFromeDocumentHtml);
    }
    numSenderFromeDocumentEror.innerHTML = "רשת לא ידועה ,שורה 1, 49-64";











    


  //**************************************Fixed values in the message***************************************** */




    //StartOfLineENV00101 line 1, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineENV00101, ENV00101)) {
        removeErrorMessageById("ENV001011");
        removeErrorMessageById("ENV00101Eror");
        messageRusltconstantValues("ENV001011", "ENV00101Eror");
        ENV001011.innerHTML += "שגוי ENV00101" + "<br>";
        ENV00101Eror.innerHTML = "0-8 ,ערך חסר או שגוי ,שורה 1 " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineENV00101 + "<br>" + ": ערך רצוי" + "<br>" + ENV00101;
        iconX(ENV001011);
    }
    else {
        removeErrorMessageById("ENV001011");
        removeErrorMessageById("ENV00101Eror");
    }











   //nameDocument line 1, 23-33    constantValues div
   if (!compareStringsIgnoreCaseAndSpace(nameDocument1, MMDR02R) && !compareStringsIgnoreCaseAndSpace(nameDocument2, MMDR02L)) {
    removeErrorMessageById("MMDE02RMMDE02L");
    removeErrorMessageById("MMDE02RMMDE02LEror");
    messageRusltconstantValues("MMDE02RMMDE02L", "MMDE02RMMDE02LEror");
    MMDE02RMMDE02L.innerHTML += "שגוי MMDE02R/MMDE02L" + "<br>";
    MMDE02RMMDE02LEror.innerHTML = "23-33 ,ערך חסר או שגוי ,שורה 1 " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + nameDocument1 + "<br>" + ": ערך רצוי" + "<br>" + MMDR02R + " / " + MMDR02L;

    iconX(MMDE02RMMDE02L);
} else {
    removeErrorMessageById("MMDE02RMMDE02L");
    removeErrorMessageById("MMDE02RMMDE02LEror");
}


















    //StartOfLineHEAD0101 line 2, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineHEAD0101, HEAD0101)) {
        removeErrorMessageById("HEAD01011");
        removeErrorMessageById("HEAD0101Eror");
        messageRusltconstantValues("HEAD01011", "HEAD0101Eror");
        HEAD01011.innerHTML += "שגוי HEAD0101" + "<br>";
        HEAD0101Eror.innerHTML = "0-8 ,ערך חסר או שגוי ,שורה 2 " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineHEAD0101 + "<br>" + ": ערך רצוי" + "<br>" + HEAD0101;
        iconX(HEAD01011);
    }
    else {
        removeErrorMessageById("HEAD01011");
        removeErrorMessageById("HEAD0101Eror");
    }














}






function statusEntryF(statusEntry) {
    //type order line 1, 8-11  main div
    if (statusEntry.trim().includes("27")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: דחייה"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("29")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: אישור"
        iconV(statusOrderFromeHtml);
    }


    else if (statusEntry.trim().includes("34")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: הסתייגות"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("28")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: דחייה כל כפילות תעודה"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("26")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: דחייה טכנית של תעודת המשלוח"
        iconV(statusOrderFromeHtml);
    }


    else if (statusEntry.trim().includes("7")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: דחייה על כפילות תעודת המשלוח, התעודה הוקלדה כבר ידנית"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("24")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: כמות שהתקבלה בפועל"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("45")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: כמות שהתקבלה בפועל ,לא סופי"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("12")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: ביטול תעודת משלוח,נדחה"
        iconV(statusOrderFromeHtml);
    }

    else if (statusEntry.trim().includes("40")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: קליטה ידנית"
        iconV(statusOrderFromeHtml);
    }

    else {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס כניסה: לא ידוע"
        statusOrderHtmlEror.innerHTML = "סטטוס כניסה חסר או שגוי ,שורה 2 ,23-26" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + statusEntry + "<br>" + ": קודי סטטוס תקינים" + "<br>" + "27=דחייה" + "<br>" +"29=אישור" + "<br>" +"34=הסתייגות" + "<br>" +
        "28=דחייה עקב כפילות" + "<br>" +"26=דחייה טכנית" + "<br>" +"7=דחייה על כפילות" + "<br>" +"24=כמות שהתקבלה בפועל" + "<br>" +"45=כמות שהתקבלה בפועל לא סופי" + "<br>" +
        "12=ביטול תמ'ש נדחה" + "<br>" +"40=נקלט ידנית";

        iconX(statusOrderFromeHtml);
    }


}