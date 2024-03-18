

//ondrop file
function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
}

function handleFileInput(event) {
    const files = event.target.files;
    handleFiles(files);

}






//name file+format file
function handleFiles(files) {
    //format file
    const allowedTypes = ['text/plain','','application/msword',];
    if (allowedTypes.includes(files[0].type)) {
    } else {
        alert(' פורמט ('+files[0].type+") אינו מתאים ,אנא בחרו קובץ בפורמט תקין. ");
        // Clear the file input to prevent submitting an invalid file
        fileInput.value = '';
    }

    //name file
    const fileName = files[0].name;
    document.getElementById('file-name').innerText = ` ${fileName} :קובץ נקלט  `;
    checkForValue(files[0]);
}






//input file clice on input id-file-input that on the function handleFileInput
function triggerFileInput() {
    document.getElementById('file-input').click();
}






//read file and save in variable fileContentSearch
function checkForValue(file) {
    const reader = new FileReader();
    reader.onload = function (event) {

        fileContent = event.target.result;
        fileContentSearch = fileContent;
        // see the file in input fileChek in the web
        const fileChek=document.getElementById("fileChek");
        fileChek.value="";
        fileChek.value = fileContent;
        DesignScreenGoesUp();


//Check if the user has selected a screen other than

        if (file > 1) {
            //Check the selected file structure type and run the appropriate function
            // var selectedOption = document.getElementById("menuTypeStructure").value;
            // var fileTypeC = document.getElementById("menuTypefile").value;
            // if (selectedOption === "fileStructure") {
            //     alert("לא נבחר מבנה המסר לבדיקה");
            // } else if (selectedOption === "fletFile") {
            //     if (fileTypeC==="fileType"){
            //         alert("לא נבחר סוג המסר לבדיקה");
            //     }
            //     else if (fileTypeC === "supdes"){
            //         chekFileFletSupdes();
            //     }
            //     else if (fileTypeC === "order"){
            //         chekFileFletOrder();
            //     }
            //     else if (fileTypeC === "mmdr"){
            //         console.log("mmdr")
            //     }
            //     else if (fileTypeC === "return"){
            //         console.log("return")
            //     }

            // }
            // else if (selectedOption === "hashavshevt") {
            //     chekFileHashavshevtSupdes();
            // }

         
       

            if(fileChek.value.includes("ENV")){
                if(fileChek.value.includes("SUPDES")){
                 try{
                     document.getElementById("buttonEror").click();
                 }catch(e){}
                 supdesFlat();
                }
                else{
                 const erorMss = document.getElementById('erorMss');
                     erorMss.style.display = "block";
                      const erorMssP = document.getElementById('erorP');
                      erorMssP.innerHTML="נראה שהתעודה שנבחרה ללא סוג מסר רצוי לבדיקה , או שהערך של 'סוג תעודה' במסר שגוי";
                      erorMssP.innerHTML+="<br>"+" אנא בחר את סוג התעודה לבדיקה ולאחר מכן לחץ אנטר";
 
                      var TypeSelect = document.getElementById("erorMssSelect").value;
                      if (TypeSelect === "supdes") {
                         supdesFlat();
                         document.getElementById('erorMss').style.display= 'none';
                      }
 
                }
              
              }
             else{
                 chekFileHashavshevtSupdes();
             }
 
           

        }


    };
    reader.readAsText(file);
}





































function messageRusltconstantValues(idValue,idValueEror){

    const constantValues = document.getElementById('constantValues');
        constantValues.style.display="block"
    const constantValuesP = document.createElement('p');
    constantValuesP.id =idValue;
    constantValues.appendChild(constantValuesP);
    const idValueE = document.getElementById(idValue);

  

    const erorWindos = document.getElementById('erorWindos');
    const erorWindosDiv = document.createElement('div');
    erorWindosDiv.id = idValueEror;
    erorWindos.appendChild(erorWindosDiv);


    idValueE.setAttribute("onmouseover", "showTooltip("+"'"+idValue+"'"+","+"'"+idValueEror+"'"+")");
    idValueE.setAttribute("onmouseout", "hideTooltip("+"'"+idValueEror+"'"+")");

}



function messageRusltconstantValuesMain(idValue,idValueEror){

    const constantValues = document.getElementById('main');
    constantValues.style.display="block"
    const constantValuesP = document.createElement('p');
    constantValuesP.id =idValue;
    constantValues.appendChild(constantValuesP);
    const idValueE = document.getElementById(idValue);
  

    const erorWindos = document.getElementById('erorWindos');
    const erorWindosDiv = document.createElement('div');
    erorWindosDiv.id = idValueEror;
    erorWindos.appendChild(erorWindosDiv);



    idValueE.setAttribute("onmouseover", "showTooltip("+"'"+idValue+"'"+","+"'"+idValueEror+"'"+")");
    idValueE.setAttribute("onmouseout", "hideTooltip("+"'"+idValueEror+"'"+")");

}












function messageRusltBarcodes(idValue,idValueEror){
    const barcodes = document.getElementById('barcodes');
    const constantValues = document.getElementById('barcodesTable');
    barcodes.style.display="block"

    const constantValuesTr = document.createElement('tr');
    constantValuesTr.id =idValue;

    const constantValuesT = document.createElement('td');
    constantValuesT.id =idValue+"Y";

    const constantValuesA = document.createElement('td');
    constantValuesA.id =idValue+"A";

    const constantValuesM = document.createElement('td');
    constantValuesM.id =idValue+"M";

    const constantValuesY = document.createElement('td');
    constantValuesY.id =idValue+"T";


    constantValues.appendChild(constantValuesTr);


    constantValuesTr.appendChild(constantValuesT);
    constantValuesTr.appendChild(constantValuesM);
    constantValuesTr.appendChild(constantValuesA);
     constantValuesTr.appendChild(constantValuesY);


    const idValueE = document.getElementById(idValue);
  

    const erorWindos = document.getElementById('erorWindos');
    const erorWindosDiv = document.createElement('div');
    erorWindosDiv.id = idValueEror;
    erorWindos.appendChild(erorWindosDiv);




    const idValueA = document.getElementById(idValue+"A");

    const erorWindosDivA= document.createElement('div');
    erorWindosDivA.id = idValueEror+"A";
    erorWindos.appendChild(erorWindosDivA);

    



    idValueE.setAttribute("onmouseover", "showTooltip("+"'"+idValue+"'"+","+"'"+idValueEror+"'"+")");
    idValueE.setAttribute("onmouseout", "hideTooltip("+"'"+idValueEror+"'"+")");


    idValueA.setAttribute("onmouseover", "showTooltip("+"'"+idValue+"A"+"'"+","+"'"+idValueEror+"A"+"'"+")");
    idValueA.setAttribute("onmouseout", "hideTooltip("+"'"+idValueEror+"A"+"'"+")");


}












































function DesignScreenGoesUp(){
    //Change the appearance of the screen after uploading a file for the first time
    const upFile = document.querySelector('.upFile');
    const messageRuslt1 = document.getElementById('messageRuslt1');
    const titelUpFile = document.querySelector('.titelUpFile');
    const titelFile = document.getElementById('titelFile');
    const dropzone = document.getElementById('drop-zone');
    const filename = document.getElementById('file-name');
    const uploadicon = document.getElementById('upload-icon');
    const icons = document.getElementById('icons');
    const iconAndhandleDropP = document.getElementById('iconAndhandleDropP');
    const uploadiconDiv = document.getElementById('upload-iconDiv');
    const fileChek=document.getElementById("fileChek");

    if (fileContent != undefined) {
        fileChek.style.display = 'block';
        messageRuslt1.style.display = 'block';
        upFile.style.position = 'absolute';
        upFile.style.right = '45px';
        upFile.style.top = '20px';
        upFile.style.width = '450px';
        upFile.style.height = '250px';
        upFile.style.border = '1px solid #bdb8b8';
        dropzone.style.width = '85%';
        dropzone.style.height = '50%';
        dropzone.style.top = '58%';
        titelFile.style.display = 'block';
        filename.style.display = 'block';
        uploadicon.style.top = '70%';
        titelUpFile.style.display = 'none';
        uploadicon.style.width = '17%';
        uploadicon.style.height = '16%';
        icons.style.fontSize = '50px';
        icons.style.top = '10px';
        iconAndhandleDropP.style.fontSize = '15px';
        uploadicon.style.width = '100%';
        uploadicon.style.height = '100%';
        uploadicon.style.top = '50%';
        uploadiconDiv.style.width = '17%';
        uploadiconDiv.style.height = '16%';
        uploadiconDiv.style.top = '70%';
     

    }
}






