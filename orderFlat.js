async function orderFlat() {


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
    const MMORDML = "MMORDML";
    const MMORDMR = "MMORDMR";
    const MMOR01 = "MMOR01";
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
    const numMessageFromeDocument = lines[1].substring(11, 41);
    const statusOrder = lines[1].substring(50, 53);

    //valueFromFile line 2
    const StartOfLineHEAD0301 = lines[2].substring(0, 8);
    const StartOfLineHEAD0201 = lines[2].substring(0, 8);
    //   const StartOfLineHEAD0401 = lines[2].substring(0, 8);
    const TermsOfPayment = lines[2].substring(8, 11);
    //time value
    const timeDocument = lines[1].substring(53, 65).trim();
    const timeDocumentLength = 12;
    const booleneLength = timeDocument.length === timeDocumentLength;
    const year = Number(timeDocument.substring(0, 4));
    const month = Number(timeDocument.substring(4, 6));
    const day = Number(timeDocument.substring(6, 8));
    const hour = Number(timeDocument.substring(8, 10));
    const minute = Number(timeDocument.substring(10, 12));


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
    if (!compareStringsIgnoreCaseAndSpace(typeDocument, MMOR01)) {
        removeErrorMessageById("typeDocumentomHtmlEror");
        removeErrorMessageById("typeDocumentFromeHtml");
        messageRusltconstantValuesMain("typeDocumentFromeHtml", "typeDocumentomHtmlEror");
        typeDocumentomHtmlEror.innerHTML = "33-47 ,ערך חסר או שגוי ,שורה 1 " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + typeDocument + "<br>" + ": ערך רצוי" + "<br>" + MMOR01;
        typeDocumentFromeHtml.innerHTML = "סוג תעודה: הזמנה"
        iconX(typeDocumentFromeHtml);
    } else {
        removeErrorMessageById("typeDocumentomHtmlEror");
        removeErrorMessageById("typeDocumentFromeHtml");
        messageRusltconstantValuesMain("typeDocumentFromeHtml", "typeDocumentomHtmlEror");
        typeDocumentFromeHtml.innerHTML = "סוג תעודה: הזמנה"
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





    //type order line 1, 8-11  main div
    typeOrderF(typeOrder);

    //status order line 1, 50-23  main div
    statusOrderF(statusOrder);








    //date mass line 2, 53-65  main div
    removeErrorMessageById("dateTimeHtmlEror");
    removeErrorMessageById("dateTimeHtml");
    messageRusltconstantValuesMain("dateTimeHtml", "dateTimeHtmlEror");

    if (booleneLength === false || isNaN(booleneLength)) {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML = "<br>" + ", פורמט תאריך הזמנה  שגוי , מספר התווים או מיקום התאריך בקובץ שגוי " + "<br>" + "  53-65 ,שורה 2" + "<br>";
    }
    if (year < 2023 || isNaN(year) || timeDocument.substring(0, 4) === "") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML += "<br>" + "53-65 , פורמט תאריך שנה שגוי  ,שורה 2" + "<br>";
    }

    if (month < 1 || month > 12 || isNaN(month) || timeDocument.substring(4, 6) === "") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך חודש שגוי,שורה 2, 53-65" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(4, 6) + "<br>" + ": ערך רצוי" + "<br>" + "12>month>1" + "<br>";
    }

    if (day < 1 || day > 31 || isNaN(day) || timeDocument.substring(6, 8) === "") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך יום שגוי,שורה 2, 53-65" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(6, 8) + "<br>" + ": ערך רצוי" + "<br>" + "31>day>1" + "<br>";

    }

    if (hour < 0 || hour > 24 || isNaN(hour) || timeDocument.substring(8, 10) === "") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך שעה שגוי,שורה 2, 53-65" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(8, 10) + "<br>" + ": ערך רצוי" + "<br>" + "24>hour>0" + "<br>";

    }

    if (minute < 0 || minute > 59 || isNaN(minute) || timeDocument.substring(10, 12) === "") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML += "<br>" + "פורמט תאריך דקה שגוי,שורה 2, 53-65" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + timeDocument.substring(10, 12) + "<br>" + ": ערך רצוי" + "<br>" + "59>minute>0" + "<br>";


    }

    dateTimeHtml.innerHTML += day + "/" + month + "/" + year + "-" + hour + ":" + minute + " :תאריך  תעודה";
    dateTimeHtml.style.right = "32px";


    var dateTimeHtml1 = document.getElementById('dateTimeHtml');
    var icons = dateTimeHtml1.querySelectorAll('.fa-solid.fa-x');
    if (icons.length > 0) {
    } else {
        iconVTime(dateTimeHtml);
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
    if (!compareStringsIgnoreCaseAndSpace(nameDocument1, MMORDMR) && !compareStringsIgnoreCaseAndSpace(nameDocument2, MMORDML)) {
        removeErrorMessageById("MMDE02RMMDE02L");
        removeErrorMessageById("MMDE02RMMDE02LEror");
        messageRusltconstantValues("MMDE02RMMDE02L", "MMDE02RMMDE02LEror");
        MMDE02RMMDE02L.innerHTML += "שגוי MMDE02R/MMDE02L" + "<br>";
        MMDE02RMMDE02LEror.innerHTML = "23-33 ,ערך חסר או שגוי ,שורה 1 " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + nameDocument1 + "<br>" + ": ערך רצוי" + "<br>" + MMORDMR + "/" + MMORDML;

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









      //StartOfLineLINE0001 Second to last line, 0-8  constantValues div
      if (!compareStringsIgnoreCaseAndSpace(StartOfLineHEAD9901, HEAD9901)) {
        removeErrorMessageById("HEAD99011");
        removeErrorMessageById("HEAD9901Eror");
        messageRusltconstantValues("HEAD99011", "HEAD9901Eror");
        HEAD99011.innerHTML += "שגוי HEAD9901" + "<br>";
        HEAD9901Eror.innerHTML = "0-8 ," + (lines.length - 1) + " ערך חסר או שגוי, שורה" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineHEAD9901 + "<br>" + ": ערך רצוי" + "<br>" + HEAD9901;
        iconX(HEAD99011);
    }
    else {
        removeErrorMessageById("HEAD99011");
        removeErrorMessageById("HEAD9901Eror");
    }






    //StartOfLineENV00201 last line 3, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineENV00201, ENV00201)) {
        removeErrorMessageById("ENV002011");
        removeErrorMessageById("ENV00201Eror");
        messageRusltconstantValues("ENV002011", "ENV00201Eror");
        ENV002011.innerHTML += "שגוי ENV00201" + "<br>";
        ENV00201Eror.innerHTML = "0-8 ," + (lines.length - 0) + " ערך חסר או שגוי, שורה" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineENV00201 + "<br>" + ": ערך רצוי" + "<br>" + ENV00201;

        iconX(ENV002011);
    }
    else {
        removeErrorMessageById("ENV002011");
        removeErrorMessageById("ENV00201Eror");
    }











    if (compareStringsIgnoreCaseAndSpace(StartOfLineHEAD0301, HEAD0301)) {
        removeErrorMessageById("HEAD03011");
        removeErrorMessageById("HEAD0301Eror");
        messageRusltconstantValues("HEAD03011", "HEAD0301Eror");
        const OrderFrame = lines[2].substring(43, 46);
        if (!OrderFrame.trim().includes("ACE") && !OrderFrame.trim().includes("ON")) {
            HEAD03011.innerHTML += "שגוי HEAD0301" + "<br>";
            HEAD0301Eror.innerHTML = "תנאי תשלום הזמנה חסר או שגוי ,שורה 3 ,8-11" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + OrderFrame + "<br>" + ":  ערכים תקינים" + "<br>" + "ACE,ON";
            iconX(HEAD03011);
        }
        
        else {
            // if (!constantValuesStyle.innerHTML.includes('<p>')) {
            //     constantValuesStyle.style.display = "none";
            // }

        }

        StartOfLineHEAD0401(3);
    }

    else {
        StartOfLineHEAD0401(2);
    }








    async function StartOfLineHEAD0401(line) {


        const StartOfLineHEAD0401 = lines[line].substring(0, 8);
        if (!compareStringsIgnoreCaseAndSpace(StartOfLineHEAD0401, HEAD0401)) {
            removeErrorMessageById("HEAD04011");
            removeErrorMessageById("HEAD0401Eror");
            messageRusltconstantValues("HEAD04011", "HEAD0401Eror");
            HEAD04011.innerHTML += "שגוי HEAD0401" + "<br>";
            HEAD0401Eror.innerHTML = "0-8 ," + (line + 1) + " ערך חסר או שגוי ,שורה  " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineHEAD0401 + "<br>" + ": ערך רצוי" + "<br>" + HEAD0401 + "<br>" + "<br>" + ": ערכים אופציונלים נוספים" + "<br>" + "HEAD0201 / HEAD0301";
            iconX(HEAD04011);
        }
        else {
            removeErrorMessageById("HEAD04011");
            removeErrorMessageById("HEAD0401Eror");
        }






        const StartOfLineHEAD04012 = lines[line + 1].substring(0, 8);
        if (!compareStringsIgnoreCaseAndSpace(StartOfLineHEAD04012, HEAD0401)) {
            removeErrorMessageById("HEAD040112");
            removeErrorMessageById("HEAD04012Eror");
            messageRusltconstantValues("HEAD040112", "HEAD04012Eror");
            HEAD040112.innerHTML += "שגוי HEAD0401" + "<br>";
            HEAD04012Eror.innerHTML = "0-8 ," + (line + 2) + " ערך חסר או שגוי ,שורה  " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineHEAD04012 + "<br>" + ": ערך רצוי" + "<br>" + HEAD0401 + "<br>" + "<br>" + ": ערכים אופציונלים נוספים" + "<br>" + "HEAD0201 / HEAD0301";
            iconX(HEAD040112);
        }
        else {
            removeErrorMessageById("HEAD040112");
            removeErrorMessageById("HEAD04012Eror");
        }









        let numBranchRetailerFromeDocument = "";
        let numSupplierSubnetNumberFromeDocument = "";

        let lineBranch = "";
        let linenumSupplierSubnet = "";


        const SUValue = lines[line].substring(8, 11);
        const SNValue = lines[line + 1].substring(8, 11);



        if (!compareStringsIgnoreCaseAndSpace(SUValue, SU) && !compareStringsIgnoreCaseAndSpace(SUValue, SN) && !compareStringsIgnoreCaseAndSpace(SNValue, SU) && !compareStringsIgnoreCaseAndSpace(SNValue, SN)
            || compareStringsIgnoreCaseAndSpace(SUValue, SU) || compareStringsIgnoreCaseAndSpace(SNValue, SN)) {
            numSupplierSubnetNumberFromeDocument = lines[line].substring(11, 26);
            numBranchRetailerFromeDocument = lines[line + 1].substring(11, 26);
            lineBranch = line + 1;
            linenumSupplierSubnet = line;

        }
        else if (compareStringsIgnoreCaseAndSpace(SUValue, SN) || compareStringsIgnoreCaseAndSpace(SNValue, SU)) {
            numSupplierSubnetNumberFromeDocument = lines[line + 1].substring(11, 26);
            numBranchRetailerFromeDocument = lines[line].substring(11, 26);
            lineBranch = line;
            linenumSupplierSubnet = line + 1;
        }



        const SUValueChek = lines[linenumSupplierSubnet].substring(8, 11);
        if (!compareStringsIgnoreCaseAndSpace(SUValueChek, SU)) {
            removeErrorMessageById("SNValue1");
            removeErrorMessageById("SnValueEror");
            messageRusltconstantValues("SNValue1", "SnValueEror");
            SNValue1.innerHTML += "שגוי SU" + "<br>";
            SnValueEror.innerHTML = "8-11 ," + (lineBranch + 2) + " ערך חסר או שגוי ,שורה  " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + SUValueChek + "<br>" + ": ערך רצוי" + "<br>" + "SN /SU";
            iconX(SNValue1);
        }
        else {
            removeErrorMessageById("SNValue1");
            removeErrorMessageById("SnValueEror");
        }



        const SNValueChek = lines[lineBranch].substring(8, 11);
        if (!compareStringsIgnoreCaseAndSpace(SNValueChek, SN)) {
            removeErrorMessageById("SUValue1");
            removeErrorMessageById("SUValueEror");
            messageRusltconstantValues("SUValue1", "SUValueEror");
            SUValue1.innerHTML += "שגוי SN" + "<br>";
            SUValueEror.innerHTML = "8-11 ," + (linenumSupplierSubnet + 2) + " ערך חסר או שגוי ,שורה  " + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + SNValueChek + "<br>" + ": ערך רצוי" + "<br>" + "SN /SU";
            iconX(SUValue1);
        }
        else {
            removeErrorMessageById("SUValue1");
            removeErrorMessageById("SUValueEror");
        }











        //num Branche
        const reBranche = await fetch("branches.json");
        const responseBranche = await reBranche.json();
        var valueKeybranches = "";

        responseBranche.forEach(item => {
            if (numBranchRetailerFromeDocument.trim() === item.key) {
                valueKeybranches = item.value;
                removeErrorMessageById("numBranchRetailerFromeDocumentHtml");
                removeErrorMessageById("numBranchRetailerFromeDocumentHtmlEror");
                messageRusltconstantValuesMain("numBranchRetailerFromeDocumentHtml", "numBranchRetailerFromeDocumentHtmlEror");
                numBranchRetailerFromeDocumentHtml.innerHTML = "שם הסניף : " + item.value + " , " + numBranchRetailerFromeDocument;
                iconV(numBranchRetailerFromeDocumentHtml);
            }
        });

        if (valueKeybranches === "") {
            removeErrorMessageById("numBranchRetailerFromeDocumentHtml");
            removeErrorMessageById("numBranchRetailerFromeDocumentHtmlEror");
            messageRusltconstantValuesMain("numBranchRetailerFromeDocumentHtml", "numBranchRetailerFromeDocumentHtmlEror");
            numBranchRetailerFromeDocumentHtml.innerHTML = numBranchRetailerFromeDocument + " , " + "שם הסניף : " + "סניף לא ידוע";
            iconX(numBranchRetailerFromeDocumentHtml);
        }

        numBranchRetailerFromeDocumentHtmlEror.innerHTML = "סניף לא ידוע ,שורה 2, 154-169";








        //num Sender Subnet 
        const reSupplierSubnet = await fetch("numSupplierSubnet.json");
        const responSupplierSubnet = await reSupplierSubnet.json();
        var valueKeySupplierSubnetr = "";
        responSupplierSubnet.forEach(item => {
            if (numSupplierSubnetNumberFromeDocument.trim() === item.key) {
                valueKeySupplierSubnetr = item.value;
                removeErrorMessageById("SupplierSubnetHtml");
                removeErrorMessageById("SupplierSubnetHtmlEror");
                messageRusltconstantValuesMain("SupplierSubnetHtml", "SupplierSubnetHtmlEror");
                SupplierSubnetHtml.innerHTML += "תת ספק : " + item.value + " , " + numSupplierSubnetNumberFromeDocument;

                iconExclamationMark(SupplierSubnetHtml);
            }


        }

        );

        if (valueKeySupplierSubnetr === "") {
            removeErrorMessageById("SupplierSubnetHtml");
            removeErrorMessageById("SupplierSubnetHtmlEror");
            messageRusltconstantValuesMain("SupplierSubnetHtml", "SupplierSubnetHtmlEror");
            SupplierSubnetHtml.innerHTML += numSupplierSubnetNumberFromeDocument + " , " + "תת ספק : " + "לא ידוע";
            iconExclamationMark(SupplierSubnetHtml);


            
        }



        if (numSupplierSubnetNumberFromeDocument.trim() === NumReceivingFromeDocument.trim()) {
            SupplierSubnetHtmlEror.innerHTML = "נראה שמספר התת ספק <span style='color:#ff0000'>'תואם'</span> למספר הספק הראשי, במידה והספק היה מעוניין לשלוח תחת תת ספק מסוים אז ישנה טעות בשידור , שורה 2 ,104-119";
              
        }
        else {
            SupplierSubnetHtmlEror.innerHTML = "נראה שמספר התת ספק <span style='color:#ff0000'>'שונה'</span> ממספר הספק הראשי, במידה והספק היה מעוניין לשלוח תחת תת ספק בדוק שאכן התת הספק הנ'ל מוקם תקין , שורה 2 ,104-119";
        }






   


















        //******************************************barcodes ***************************************/


        //DELET the table of barcodes
        const tdElementh = document.querySelectorAll('table');
        tdElementh.forEach(function (table) {
            table.remove();
        });




        //add table+th for the table
        const barcodes = document.getElementById('barcodes');
        const barcodesTable = document.createElement('table');
        barcodes.appendChild(barcodesTable);
        barcodesTable.id = "barcodesTable";
        const barcodesThY = document.createElement('th');
        const barcodesThA = document.createElement('th')
        const barcodesTM = document.createElement('th')
        const barcodesTT = document.createElement('th')

        barcodesTable.appendChild(barcodesThY);
        barcodesTable.appendChild(barcodesThA);
        barcodesTable.appendChild(barcodesTM);
        barcodesTable.appendChild(barcodesTT);

        barcodesThY.innerHTML = "כמות יחידות";
        barcodesThA.innerHTML = "כמות אריזות";
        barcodesTM.innerHTML = "ברקוד";
        barcodesTT.innerHTML = "תחילית שורה";




        //Loop over all lines of the certificate
        for (var i = line + 2; i < lines.length - 2; i++) {



            removeErrorMessageById("LINE0201erorLine" + i);
            removeErrorMessageById("LINE0201erorLine" + i + "A");




            const StartOfLineLINE0101 = lines[i].substring(0, 8);
            const Barcodes = lines[i].substring(8, 23);
            const numPackaging = lines[i].substring(26, 41);
            const numSingul = lines[i].substring(123, 138);




            //creat tr and td to the table
            messageRusltBarcodes("LINE0201Line" + i, "LINE0201erorLine" + i);



            document.getElementById("LINE0201Line" + i + "T").innerHTML = i + 1;
            document.getElementById("LINE0201Line" + i + "A").innerHTML = Barcodes;
            document.getElementById("LINE0201Line" + i + "M").innerHTML = numPackaging;
            document.getElementById("LINE0201Line" + i + "Y").innerHTML = numSingul;





            if (numSingul.trim() === "") {
                removeErrorMessageById("LINE0201erorLine" + i);
                barcodEROR("LINE0201Line" + i + "Y", "LINE0201erorLine" + i + "Y");
                document.getElementById("LINE0201Line" + i + "Y").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i + "Y").innerHTML = "123-138 ," + (i + 1) + " כמות  יחידות חסר, שורה ";

            }



            if (Barcodes.trim() === "") {
                removeErrorMessageById("LINE0201erorLine" + i);
                barcodEROR("LINE0201Line" + i + "A", "LINE0201erorLine" + i + "A");

                document.getElementById("LINE0201Line" + i + "A").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i + "A").innerHTML = "8-23 ," + (i + 1) + " ברקוד חסר , שורה ";
            }





            if (!compareStringsIgnoreCaseAndSpace(StartOfLineLINE0101, LINE0101)) {
                removeErrorMessageById("LINE0201erorLine" + i);
                barcodEROR("LINE0201Line" + i + "T", "LINE0201erorLine" + i + "T");
                document.getElementById("LINE0201erorLine" + i + "T").style.marginLeft = "-120px";
                document.getElementById("LINE0201Line" + i + "T").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i + "T").innerHTML = "0-8 ," + (i + 1) + " ערך חסר או שגוי, שורה" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + StartOfLineLINE0101 + "<br>" + ": ערך רצוי" + "<br>" + LINE0101;

            }







            //******************************************barcodes ***************************************/


            colorBorder();



        }























    }








}










function typeOrderF(typeOrder) {
    //type order line 1, 8-11  main div
    if (typeOrder === "220") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: עסקה,המלצה,הזמנת סופר פארם"
        iconV(typeOrderFromeHtml);
    }

    else if (typeOrder === "221") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: מסגרת"
        iconV(typeOrderFromeHtml);
    }


    else if (typeOrder === "105") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: רגילה"
        iconV(typeOrderFromeHtml);
    }

    else if (typeOrder === "155" || typeOrder === "237" || typeOrder === "640") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: הזמנת חלוקה"
        iconV(typeOrderFromeHtml);
    }

    else if (typeOrder === "228") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: הזמנת המלצה"
        iconV(typeOrderFromeHtml);
    }

    else if (typeOrder === "226") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: הזמנת קטיף"
        iconV(typeOrderFromeHtml);
    }

    else if (typeOrder === "300") {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: הזמנת אריזה"
        iconV(typeOrderFromeHtml);
    }

    else {
        removeErrorMessageById("typeOrderFromeHtml");
        removeErrorMessageById("typeOrderHtmlEror");
        messageRusltconstantValuesMain("typeOrderFromeHtml", "typeOrderHtmlEror");
        typeOrderFromeHtml.innerHTML = "סוג הזמנה: לא ידוע"
        typeOrderHtmlEror.innerHTML = "סוג ההזמנה חסר או שגוי ,שורה 2 ,8-11" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + typeOrder + "<br>" + ": קודי הזמנה תקינים" + "<br>" + "220=עסקה" + "<br>" +
        "221=מסגרת" + "<br>" +"105=רגילה" + "<br>" +"155,237,640=הזמנת חלוקה" + "<br>" +"228=המלצה" + "<br>" +"226=ספקי קטיף" + "<br>" +"300=הזמנת אריזה";
        iconX(typeOrderFromeHtml);
    }


}



function statusOrderF(statusOrder) {
    //type order line 1, 8-11  main div
    if (statusOrder.trim().includes("9")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: חדשה"
        iconV(statusOrderFromeHtml);
    }

    else if (statusOrder.trim()==="1") {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: מבוטל"
        iconV(statusOrderFromeHtml);
    }


    else if (statusOrder.trim().includes("17")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: הקפאה זמנית"
        iconV(statusOrderFromeHtml);
    }

    else if (statusOrder.trim().includes("33")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: שינוי כותרת"
        iconV(statusOrderFromeHtml);
    }

    else if (statusOrder.trim().includes("36")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: שינוי שורות"
        iconV(statusOrderFromeHtml);
    }


    else if (statusOrder.trim().includes("50E")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: חדשה"
        iconV(statusOrderFromeHtml);
    }

    else if (statusOrder.trim().includes("41")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: סגירה מנהלית"
        iconV(statusOrderFromeHtml);
    }

    else if (statusOrder.trim().includes("3")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: סגירה זמנית"
        iconV(statusOrderFromeHtml);
    }

    else if (statusOrder.trim().includes("24")) {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: הזמנת רכש לספק"
        iconV(statusOrderFromeHtml);
    }

    else {
        removeErrorMessageById("statusOrderFromeHtml");
        removeErrorMessageById("statusOrderHtmlEror");
        messageRusltconstantValuesMain("statusOrderFromeHtml", "statusOrderHtmlEror");
        statusOrderFromeHtml.innerHTML = "סטטוס הזמנה: לא ידוע"
        statusOrderHtmlEror.innerHTML = "סטטוס ההזמנה חסר או שגוי ,שורה 2 ,50-53" + "<br>" + " :ערך שנמצא בקובץ " + "<br>" + statusOrder + "<br>" + ": קודי סטטוס תקינים" + "<br>" + 
        "24=הזמנת רכש לספק" + "<br>" +"3=סגירת הזמנה שסופקה חלקית" + "<br>" +"41=סגירה מנהלית" + "<br>" +"50E=חדשה" + "<br>" +"36=שינוי שורות" + "<br>" +"33=שינוי כותרת" + "<br>" +
        "17=הקפאה זמנית" + "<br>" +"1=ביטול הזמנה" + "<br>" +"9=הזמנה חדשה";

        iconX(statusOrderFromeHtml);
    }


}



function colorBorder() {
    var messageRuslt1 = document.getElementById('messageRuslt1');
    var icons = messageRuslt1.querySelectorAll('.fa-solid.fa-x');

    if (icons.length > 0) {
        messageRuslt1.style.border = "7px solid #fbb7b7";
    } else {
        messageRuslt1.style.border = "7px solid #8ad78c";
    }

}





