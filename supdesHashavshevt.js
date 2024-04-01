

async function supdesHashavshevt(){

  
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









// /******************************************* */

            let currentValidnumMessage = '';
            let currentVariable = '';
            let variables = [];
            for (let l = 0; l < lines.length; l++) {
                const isValidnumMessage = lines[l].substring(151, 158).trim();

                if (isValidnumMessage === "") {
                    // Value is empty, add to the current variable
                    currentVariable += '\n' + lines[l];
                } else if (isValidnumMessage !== currentValidnumMessage || currentValidnumMessage === "") {
                    // Value changed or previous value was empty, create a new variable
                    if (currentVariable !== '' && currentValidnumMessage !== "") {
                        variables.push(currentVariable);
                    }

                    // Update current values
                    currentValidnumMessage = isValidnumMessage;
                    currentVariable = lines[l];
                } else {
                    // Value is the same, add to the current variable
                    currentVariable += '\n' + lines[l];
                }
            }





            // Add the last variable (if any) to the list
            if (currentVariable !== '') {
                variables.push(currentVariable);
            }




            // if (variables.length > 1 ) {

                const erorMss = document.getElementById('erorMssHashavshevet');
                erorMss.style.display = "block";
                const erorMssP = document.getElementById('erorMssSelectHashavshevetP');
                erorMssP.innerHTML = ",נראה שמדובר בתעודות מרובות במבנה חשבשבת" ;
                erorMssP.innerHTML += "<br>" + "Enter אנא בחר את  התעודה לבדיקה ולאחר מכן לחץ";
                const select = document.getElementById('erorMssSelectHashavshevet');
                erorMss.appendChild(select);

                const optionDe = document.createElement('option');
                optionDe.value = "";
                optionDe.innerText = "בחר תעודה";
                select.appendChild(optionDe);

    
                const optionAll = document.createElement('option');
                optionAll.value = fileChek.value;
                optionAll.id="all";
                optionAll.innerText = "הכל";
                select.appendChild(optionAll);
      

               


                for (let l = 0; l < variables.length; l++) {
                    const isValidnumMessage = lines[l].substring(151, 158).trim();
                    const option = document.createElement('option');
                    option.value = variables[l];
                    option.innerText = isValidnumMessage;
                    select.appendChild(option);
                }


           



                var selectElement = document.getElementById("erorMssSelectHashavshevet");
                selectElement.addEventListener('change', function () {
                    var selectedValue = this.value;
                    fileChek.value = selectedValue;
                     document.getElementById('erorMss').style.display = 'none';
                });
                     

            // }






        

    
            
          

 







     





        // function compareStringsIgnoreCaseAndSpace(valueFromFile, constantValue) {
        //     // Check if value is defined and not empty
        //     if (valueFromFile === undefined || valueFromFile.trim() === "") {
        //         return false;
        //     }
        //     // Remove spaces from both the value and target strings
        //     const formattedValue = valueFromFile.trim();
        //     const formattedTarget = constantValue.trim();

        //     // Check if the formatted value is exactly equal to the formatted target
        //     return formattedTarget === formattedValue;
        // }





}

