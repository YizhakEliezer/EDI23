async function supdesFlat() {


    //Compare the variable obtained from the file with the value in the input
    fileContent = fileChek.value;
    //split the value to line
    const lines = fileContent.split('\n');







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
    const MMDE02L = "MMDE02L";
    const MMDE02R = "MMDE02R";
    const SUPDES = "SUPDES";
    //constant values line 2
    const HEAD0101 = "HEAD0101";
    //constant values line 3
    const LINE0001 = "LINE0001";
    //constant values line 4
    const LINE0101 = "LINE0101";
    //constant values Barcode
    const LINE0201 = "LINE0201";
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
    const numMessageFromeDocument = lines[1].substring(8, 23);
    //time value
    const timeDocument = lines[1].substring(23, 35).trim();
    const timeDocumentLength = 12;
    const booleneLength = timeDocument.length === timeDocumentLength;
    const year = Number(timeDocument.substring(0, 4));
    const month = Number(timeDocument.substring(4, 6));
    const day = Number(timeDocument.substring(6, 8));
    const hour = Number(timeDocument.substring(8, 10));
    const minute = Number(timeDocument.substring(10, 12));
    //NumSupplierSubnetNumber+NumBranchRetailer
    const numSupplierSubnetNumberFromeDocument = lines[1].substring(104, 119);
    const numBranchRetailerFromeDocument = lines[1].substring(154, 169);
    //valueFromFile line 3
    const StartOfLineLINE0001 = lines[2].substring(0, 8);
    //valueFromFile One line before last
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







    //Checking whether there are no errors in the constantValues div If not, the div will be raised from the screen
    var constantValuesStyle = document.getElementById('constantValues');
    if (!constantValuesStyle.innerHTML.includes('<p>')) {
        console.log('No paragraphs found in the div.');
        constantValuesStyle.style.display = "none";
    }











    //**************************************Variable values in the message**************************************************** */






    //type mass line 1, 33-47  main div
    if (!compareStringsIgnoreCaseAndSpace(typeDocument, SUPDES)) {
        try {
            typeDocumentomHtmlEror.remove();
            typeDocumentFromeHtml.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("typeDocumentFromeHtml", "typeDocumentomHtmlEror");
        typeDocumentomHtmlEror.innerHTML = "33-47 , חסר או שגוי ,שורה 1 " + typeDocument + " ערך";
        typeDocumentFromeHtml.innerHTML = "סוג תעודה: משלוח"
        iconX(typeDocumentFromeHtml);
    } else {
        try {
            typeDocumentomHtmlEror.remove();
            typeDocumentFromeHtml.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("typeDocumentFromeHtml", "typeDocumentomHtmlEror");
        typeDocumentFromeHtml.innerHTML = "סוג תעודה: משלוח"
        iconV(typeDocumentFromeHtml);

    }











    //num mass line 1, 33-47  main div
    if (numMessageFromeDocument.trim() === "") {
        try {
            numMessageFromHtmlEror.remove();
            numMessageFromHtml.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("numMessageFromHtml", "numMessageFromHtmlEror");
        numMessageFromHtmlEror.innerHTML = "8-23 , ערך של מספר תעודה  חסר ,שורה 2";
        numMessageFromHtml.innerHTML = "מספר  תעודה : " + numMessageFromeDocument;
        iconX(numMessageFromHtml);
    } else {
        try {
            numMessageFromHtmlEror.remove();
            numMessageFromHtml.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("numMessageFromHtml", "numMessageFromHtmlEror");
        numMessageFromHtml.innerHTML = "מספר  תעודה : " + numMessageFromeDocument;
        iconV(numMessageFromHtml);

    }











    //date mass line 2, 23-35  main div

    try {
        dateTimeHtmlEror.remove();
        dateTimeHtml.remove();
    } catch (e) { }
    messageRusltconstantValuesMain("dateTimeHtml", "dateTimeHtmlEror");
 
    if (booleneLength === false || isNaN(booleneLength)) {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML = ", פורמט תאריך  שגוי , מספר התווים או מיקום התאריך בקובץ שגוי    "+"<br>"+"  23-35  ,שורה 2" ;
    } 
      if (year < 2023 || isNaN(year) || timeDocument.substring(0, 4)==="") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML +="<br>"+ "23-35 , פורמט תאריך שנה שגוי  ,שורה 2";
    }

      if (month < 1 || month > 12 || isNaN(month) || timeDocument.substring(4, 6)==="") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML +="<br>"+ "23-35 , פורמט תאריך חודש שגוי  ,שורה 2";
    }

      if (day < 1 || day > 31 || isNaN(day) || timeDocument.substring(6, 8)==="") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML +="<br>"+ "23-35 , פורמט תאריך יום שגוי  ,שורה 2";
    }

      if (hour < 0 || hour > 24 || isNaN(hour) || timeDocument.substring(8, 10)==="") {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML +="<br>"+ "23-35 , פורמט תאריך שעה שגוי  ,שורה 2";
    }
    
      if(minute < 0 || minute > 59 || isNaN(minute) || timeDocument.substring(10, 12)==="" ) {
        iconXTime(dateTimeHtml);
        dateTimeHtmlEror.innerHTML +="<br>"+ "23-35 , פורמט תאריך דקה שגוי  ,שורה 2";
       
    }



    dateTimeHtml.innerHTML += "תאריך  תעודה : " + day + "/" + month + "/" + year + "-" + hour + ":" + minute;
    dateTimeHtml.style.right ="32px";


    
    var dateTimeHtml1 = document.getElementById('dateTimeHtml');
    var icons = dateTimeHtml1.querySelectorAll('.fa-solid.fa-x');
    if (icons.length > 0) {
    } else {
        iconVTime(dateTimeHtml);
    }











    //num Receiver line 1, 8-23 main div
    const re = await fetch("retailerData.json");
    const response = await re.json();
    var valueKey = "";
    response.forEach(item => {
        if (NumReceivingFromeDocument.trim() === item.value) {
            valueKey = item.key;
            try {
                NumReceivingFromeDocumentHtml.remove();
                NumReceivingFromeDocumentEror.remove();
            } catch (e) { }
            messageRusltconstantValuesMain("NumReceivingFromeDocumentHtml", "NumReceivingFromeDocumentEror");
            NumReceivingFromeDocumentHtml.innerHTML = "שם הרשת : " + item.key + " , " + NumReceivingFromeDocument;
            iconV(NumReceivingFromeDocumentHtml);
        }
    });

    if (NumReceivingFromeDocument.trim() === "7290058140886") {
        try {
            NumReceivingFromeDocumentHtml.remove();
            NumReceivingFromeDocumentEror.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("NumReceivingFromeDocumentHtml", "NumReceivingFromeDocumentEror");
        NumReceivingFromeDocumentHtml.innerHTML = "שם הרשת : " + "השוק הפרטי" + " , " + NumReceivingFromeDocument;
        iconV(NumReceivingFromeDocumentHtml);
    }
    if (valueKey === "") {
        try {
            NumReceivingFromeDocumentHtml.remove();
            NumReceivingFromeDocumentEror.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("NumReceivingFromeDocumentHtml", "NumReceivingFromeDocumentEror");
        NumReceivingFromeDocumentHtml.innerHTML = NumReceivingFromeDocument + " , " + "שם הרשת : " + "רשת לא ידועה";
        NumReceivingFromeDocumentEror.innerHTML = "רשת לא ידועה ,שורה 1, 8-23";
        iconX(NumReceivingFromeDocumentHtml);
    }










    //num Branche line 2, 154-169 main div
    const reBranche = await fetch("branches.json");
    const responseBranche = await reBranche.json();
    var valueKeybranches = "";
    responseBranche.forEach(item => {
        if (numBranchRetailerFromeDocument.trim() === item.key) {
            valueKeybranches = item.value;
            try {
                numBranchRetailerFromeDocumentHtml.remove();
                numBranchRetailerFromeDocumentHtmlEror.remove();
            } catch (e) { }
            messageRusltconstantValuesMain("numBranchRetailerFromeDocumentHtml", "numBranchRetailerFromeDocumentHtmlEror");
            numBranchRetailerFromeDocumentHtml.innerHTML = "שם הסניף : " + item.value + " , " + numBranchRetailerFromeDocument;
            iconV(numBranchRetailerFromeDocumentHtml);
        }
    });

    if (valueKeybranches === "") {
        try {
            numBranchRetailerFromeDocumentHtml.remove();
            numBranchRetailerFromeDocumentHtmlEror.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("numBranchRetailerFromeDocumentHtml", "numBranchRetailerFromeDocumentHtmlEror");
        numBranchRetailerFromeDocumentHtml.innerHTML = numBranchRetailerFromeDocument + " , " + "שם הסניף : " + "סניף לא ידוע";
        numBranchRetailerFromeDocumentHtmlEror.innerHTML = "סניף לא ידוע ,שורה 2, 154-169";
        iconX(numBranchRetailerFromeDocumentHtml);
    }








    //num Sender line 1, 49-64 main div
    const reSender = await fetch("data.json");
    const responseSender = await reSender.json();
    var valueKeySender = "";
    responseSender.forEach(item => {
        if (numSenderFromeDocument.trim() === item.value) {
            valueKeySender = item.key;
            try {
                numSenderFromeDocumentHtml.remove();
                numSenderFromeDocumentEror.remove();
            } catch (e) { }
            messageRusltconstantValuesMain("numSenderFromeDocumentHtml", "numSenderFromeDocumentEror");
            numSenderFromeDocumentHtml.innerHTML = "שם הספק : " + item.key + " , " + numSenderFromeDocument;
            iconV(numSenderFromeDocumentHtml);
        }
    });

    if (valueKeySender === "") {
        try {
            numSenderFromeDocumentHtml.remove();
            numSenderFromeDocumentEror.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("numSenderFromeDocumentHtml", "numSenderFromeDocumentEror");
        numSenderFromeDocumentHtml.innerHTML = NumReceivingFromeDocument + " , " + "שם הספק : " + "ספק לא ידוע";
        numSenderFromeDocumentEror.innerHTML = "ספק לא ידוע ,שורה 1, 49-64";
        iconX(numSenderFromeDocumentHtml);
    }















    //num Sender Subnet line 2, 104-119 main div
    if (numSupplierSubnetNumberFromeDocument.trim() === numSenderFromeDocument.trim()) {
        try {
            SupplierSubnetHtml.remove();
            SupplierSubnetHtmlEror.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("SupplierSubnetHtml", "SupplierSubnetHtmlEror");
        SupplierSubnetHtml.innerHTML += numSupplierSubnetNumberFromeDocument+" :תת ספק" ;
        SupplierSubnetHtmlEror.innerHTML = "נראה שמספר התת ספק <span style='color:#ff0000'>'תואם'</span> למספק הספק הראשי, במידה והספק היה מעוניין לשלוח תחת תת ספק מסוים אז ישנה טעות בשידור , שורה 2 ,104-119";
        iconExclamationMark(SupplierSubnetHtml);

    } else {
        try {
            SupplierSubnetHtml.remove();
            SupplierSubnetHtmlEror.remove();
        } catch (e) { }
        messageRusltconstantValuesMain("SupplierSubnetHtml", "SupplierSubnetHtmlEror");
        SupplierSubnetHtml.innerHTML +=numSupplierSubnetNumberFromeDocument+ " :תת ספק" ;
        SupplierSubnetHtmlEror.innerHTML = "נראה שמספר התת ספק <span style='color:#ff0000'>'שונה'</span> ממספר הספק הראשי, במידה והספק היה מעוניין לשלוח תחת תת ספק בדוק שאכן התת הספק הנ'ל מוקם תקין , שורה 2 ,104-119";
        iconExclamationMark(SupplierSubnetHtml);

    }



















    //**************************************Fixed values in the message***************************************** */




    //StartOfLineENV00101 line 1, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineENV00101, ENV00101)) {
        try {
            ENV001011.remove();
            ENV00101Eror.remove();
        } catch (e) { }
        messageRusltconstantValues("ENV001011", "ENV00101Eror");
        ENV001011.innerHTML += "שגוי ENV00101" + "<br>";
        ENV00101Eror.innerHTML = "0-8 , חסר או שגוי, שורה 1 " + StartOfLineENV00101 + " ערך";
        iconX(ENV001011);
    }
    else {
        try {
            ENV001011.remove();
            ENV00101Eror.remove();
        } catch (e) { }
    }




    //nameDocument line 1, 23-33    constantValues div
    if (!compareStringsIgnoreCaseAndSpace(nameDocument1, MMDE02R) && !compareStringsIgnoreCaseAndSpace(nameDocument2, MMDE02L)) {
        try {
            MMDE02RMMDE02L.remove();
            MMDE02RMMDE02LEror.remove();
        } catch (e) { }
        messageRusltconstantValues("MMDE02RMMDE02L", "MMDE02RMMDE02LEror");
        MMDE02RMMDE02L.innerHTML += "שגוי MMDE02R/MMDE02L" + "<br>";
        MMDE02RMMDE02LEror.innerHTML = "23-33 , חסר או שגוי, שורה 1  " + nameDocument1 + " ערך";
        iconX(MMDE02RMMDE02L);
    } else {
        try {
            MMDE02RMMDE02L.remove();
            MMDE02RMMDE02LEror.remove();
        } catch (e) { }
    }








    //StartOfLineHEAD0101 line 2, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineHEAD0101, HEAD0101)) {
        try {
            HEAD01011.remove();
            HEAD0101Eror.remove();
        } catch (e) { }
        messageRusltconstantValues("HEAD01011", "HEAD0101Eror");
        HEAD01011.innerHTML += "שגוי HEAD0101" + "<br>";
        HEAD0101Eror.innerHTML = "0-8 , חסר או שגוי, שורה 2 " + StartOfLineHEAD0101 + " ערך";
        iconX(HEAD01011);
    }
    else {
        try {
            HEAD01011.remove();
            HEAD0101Eror.remove();
        } catch (e) { }
    }







    //StartOfLineLINE0001 line 3, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineLINE0001, LINE0001)) {
        try {
            LINE00011.remove();
            LINE0001Eror.remove();
        } catch (e) { }
        messageRusltconstantValues("LINE00011", "LINE0001Eror");
        LINE00011.innerHTML += "שגוי LINE0001" + "<br>";
        LINE0001Eror.innerHTML = "0-8 , חסר או שגוי, שורה 3 " + StartOfLineLINE0001 + " ערך";
        iconX(LINE00011);
    }
    else {
        try {
            LINE00011.remove();
            LINE0001Eror.remove();
        } catch (e) { }
    }













    //StartOfLineLINE0001 Second to last line, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineHEAD9901, HEAD9901)) {
        try {
            HEAD99011.remove();
            HEAD9901Eror.remove();
        } catch (e) { }
        messageRusltconstantValues("HEAD99011", "HEAD9901Eror");
        HEAD99011.innerHTML += "שגוי HEAD9901" + "<br>";
        HEAD9901Eror.innerHTML = "0-8 ," + (lines.length - 1) + " חסר או שגוי, שורה  " + StartOfLineHEAD9901 + " ערך";
        iconX(HEAD99011);
    }
    else {
        try {
            HEAD99011.remove();
            HEAD9901Eror.remove();
        } catch (e) { }
    }






    //StartOfLineENV00201 last line 3, 0-8  constantValues div
    if (!compareStringsIgnoreCaseAndSpace(StartOfLineENV00201, ENV00201)) {
        try {
            ENV002011.remove();
            ENV00201Eror.remove();
        } catch (e) { }
        messageRusltconstantValues("ENV002011", "ENV00201Eror");
        ENV002011.innerHTML += "שגוי ENV00201" + "<br>";
        ENV00201Eror.innerHTML = "0-8 ," + (lines.length - 0) + " חסר או שגוי, שורה  " + StartOfLineENV00201 + " ערך";
        iconX(ENV002011);
    }
    else {
        try {
            ENV002011.remove();
            ENV00201Eror.remove();
        } catch (e) { }
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
    for (var i = 3; i < lines.length - 2; i++) {

        try {
            const LINE0201erorLineT = document.getElementById("LINE0201erorLine" + i);
            LINE0201erorLineT.remove();
        }
        catch (s) { }

        try {
            const LINE0201erorLineA = document.getElementById("LINE0201erorLine" + i + "A");
            LINE0201erorLineA.remove();
        }
        catch (s) { }



        //variables
        const StartOfLineLINE0201 = lines[i].substring(0, 8);
        const StartOfLineLINE0101 = lines[i].substring(0, 8);
        const surfaceNumber = lines[i].substring(50, 68);
        const Barcodes = lines[i].substring(8, 23);
        const numPackaging = lines[i].substring(26, 41);
        const numSingul = lines[i].substring(41, 56);




        //creat tr and td to the table
        messageRusltBarcodes("LINE0201Line" + i, "LINE0201erorLine" + i);



        document.getElementById("LINE0201Line" + i + "T").innerHTML += i + 1;
        document.getElementById("LINE0201Line" + i + "A").innerHTML = Barcodes;
        document.getElementById("LINE0201Line" + i + "M").innerHTML = numPackaging;
        document.getElementById("LINE0201Line" + i + "Y").innerHTML = numSingul;





        if (compareStringsIgnoreCaseAndSpace(StartOfLineLINE0101, LINE0101)) {

            if (surfaceNumber.trim() === "") {
                document.getElementById("LINE0201Line" + i + "T").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i).innerHTML = "50-68 ," + (i + 1) + " ערך של מספר זיהוי משטח חסר , שורה ";
            }
        }
        else {

            if (!compareStringsIgnoreCaseAndSpace(StartOfLineLINE0201, LINE0201) && Barcodes.trim() === "") {
                document.getElementById("LINE0201Line" + i + "A").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i + "A").innerHTML = "8-23 ," + (i + 1) + " ברקוד חסר , שורה ";
                document.getElementById("LINE0201erorLine" + i + "A").style.marginTop = "30px";
                document.getElementById("LINE0201Line" + i + "T").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i).innerHTML = "0-8 ," + (i + 1) + " חסר או שגוי, שורה  " + StartOfLineLINE0201 + " ערך" + "<br>";

            }

            else if (!compareStringsIgnoreCaseAndSpace(StartOfLineLINE0201, LINE0201)) {
                const LINE0201erorLineA = document.getElementById("LINE0201erorLine" + i + "A");
                LINE0201erorLineA.remove();
                document.getElementById("LINE0201Line" + i + "T").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i).innerHTML = "0-8 ," + (i + 1) + " חסר או שגוי, שורה  " + StartOfLineLINE0201 + " ערך" + "<br>";
            }

            else if (Barcodes.trim() === "") {
                const LINE0201erorLineT = document.getElementById("LINE0201erorLine" + i);
                LINE0201erorLineT.remove();

                document.getElementById("LINE0201Line" + i + "A").innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
                document.getElementById("LINE0201erorLine" + i + "A").innerHTML = "8-23 ," + (i + 1) + " ברקוד חסר , שורה ";
            }




        }


        //******************************************barcodes ***************************************/


        colorBorder();



    }





























}





















function showTooltip(valueFromFile, eror) {
    var tooltip = document.getElementById(eror);
    var targetElement = document.getElementById(valueFromFile);
    var iconElement = targetElement.querySelector('.fa-x');
    var ExclamationMark = targetElement.querySelector('.fa-triangle-exclamation');
    if (iconElement || ExclamationMark) {
        var rect = targetElement.getBoundingClientRect();
        var topPosition = rect.top + window.scrollY - tooltip.offsetHeight - 10;
        var leftPosition = rect.left + window.scrollX + (targetElement.offsetWidth - tooltip.offsetWidth) / 2;

        // Set position of tooltip and display it
        tooltip.style.top = topPosition + "px";
        tooltip.style.left = leftPosition + "px";
        tooltip.style.display = "block";
    }
}

function hideTooltip(eror) {
    var tooltip = document.getElementById(eror);
    tooltip.style.display = "none";
}





function iconX(element) {
    return element.innerHTML += `<i  class="fa-solid fa-x" style="color: #fa0000;font-size: 12px;"></i>`;
}


function iconV(element) {
    return element.innerHTML += `<i  class="fa-solid fa-check" style="color: #54f000;font-size: 12px;"></i>`;

}


function iconExclamationMark(element) {
    return element.innerHTML += `<i  class="fa-solid fa-triangle-exclamation" style="color: #FFD43B;font-size: 15px;"></i>`;

}

function iconXTime(element) {
    return element.innerHTML = `<i  class="fa-solid fa-x" style="position:absolute;color: #fa0000;font-size: 12px;right:-22px;top:3px"></i>`;
}


function iconVTime(element) {
    return element.innerHTML += `<i  class="fa-solid fa-check" style="position:absolute;color: #54f000;font-size: 12px;right:-22px;top:3px"></i>`;
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













