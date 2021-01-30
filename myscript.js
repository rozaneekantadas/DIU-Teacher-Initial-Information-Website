var firebaseConfig = {
    apiKey: "AIzaSyCnagJ_X2GwneklspTVGahNl4AkqoZvp4c",
    authDomain: "webappdemo-d41c4.firebaseapp.com",
    projectId: "webappdemo-d41c4",
    storageBucket: "webappdemo-d41c4.appspot.com",
    messagingSenderId: "611132440797",
    appId: "1:611132440797:web:e84d55829e50b682969b34",
    measurementId: "G-2RCJ9SED0F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var teacherInitial = [];
var teacherName = [];
var teacherDesignation = [];
var teacherDepartment = [];
var teacherEmail = [];
var teacherphone = [];
var teacherImage = [];

var status = true;

var initialSearchBox = document.getElementById("search");

function searchFuntion(){

    var initialText = initialSearchBox.value;

    if(initialText == ''){
        alert("Enter Teacher Initial");
    }
    else{
        var a = teacherInitial.indexOf(initialText);
        if(a<0){
            alert("Teacher Not Found");
        }
        else{
            var htmltSearchTag = "";
            htmltSearchTag += '<div class="card_teacher">';

                htmltSearchTag += '<div class="imgDiv"><img class="imageTcr" src="'+teacherImage[a]+'" alt=""></div>';

                htmltSearchTag += '<div class="userInfo">';

                    htmltSearchTag += '<h2 id="initialTcr">'+teacherInitial[a]+'</h2>';

                    htmltSearchTag += '<div class="info"><img class="icon" src="icon_person.png" alt=""/><span id="nameTcr">'+teacherName[a]+'</span></div>';

                    htmltSearchTag += '<div class="info"><img class="icon" src="icon_des.png" alt=""/><span id="designationTcr">'+teacherDesignation[a]+'</span></div>';

                    htmltSearchTag += '<div class="info"><img class="icon" src="icon_dept.png" alt=""/><span id="departmentTcr">'+teacherDepartment[a]+'</span></div>'

                    htmltSearchTag += '<div class="info"><img class="icon" src="icon_email.png" alt=""/><span id="emailTcr">'+teacherEmail[a]+'</span></div>';

                    htmltSearchTag += '<div class="info"><img class="icon" src="icon_phone.png" alt=""/><span id="phoneTcr">'+teacherphone[a]+'</span></div></div></div>';

                    containerDiv.innerHTML = htmltSearchTag;

                    status = false;
            // addItemToTheList(teacherInitial[a], teacherName[a], teacherDesignation[a], teacherDepartment[a], teacherEmail[a], teacherphone[a]);
        }
    }
}

var containerDiv = document.getElementById("containerDiv");
var imageDiv = document.getElementsByClassName("imageTcr");
var initialDiv = document.getElementById("initialTcr");
var nameDiv = document.getElementById("nameTcr");
var designationDiv = document.getElementById("designationTcr");
var departmentDiv = document.getElementById("departmentTcr");
var emailDiv = document.getElementById("emailTcr");
var phoneDiv = document.getElementById("phoneTcr");
var htmtElements = "";

function addItemToTheList(tinitial, tname, tdes, tdep, temail, tphone, timage){

    htmtElements += '<div class="card_teacher">';

    htmtElements += '<div class="imgDiv"><img class="imageTcr" src="'+timage+'" alt=""></div>';

    htmtElements += '<div class="userInfo">';
    
    htmtElements += '<h2 id="initialTcr">'+tinitial+'</h2>';

    htmtElements += '<div class="info"><img class="icon" src="icon_person.png" alt=""/><span id="nameTcr">'+tname+'</span></div>';

    htmtElements += '<div class="info"><img class="icon" src="icon_des.png" alt=""/><span id="designationTcr">'+tdes+'</span></div>';
        
    htmtElements += '<div class="info"><img class="icon" src="icon_dept.png" alt=""/><span id="departmentTcr">'+tdep+'</span></div>'

    htmtElements += '<div class="info"><img class="icon" src="icon_email.png" alt=""/><span id="emailTcr">'+temail+'</span></div>';
        
    htmtElements += '<div class="info"><img class="icon" src="icon_phone.png" alt=""/><span id="phoneTcr">'+tphone+'</span></div></div></div>';

    containerDiv.innerHTML = htmtElements;

    // imageDiv[0].src = timage;
    // initialDiv.innerHTML = tinitial;
    // nameDiv.innerHTML = tname;
    // designationDiv.innerHTML = tdes;
    // departmentDiv.innerHTML = tdep;
    // emailDiv.innerHTML = temail;
    // phoneDiv.innerHTML = tphone;
    
}


function FeatchAllData(){
    firebase.database().ref('teacherInfo').once('value', function(snapshot){
        snapshot.forEach(
            function(ChlidSnapshot){

                let tcrinitial = ChlidSnapshot.val().initial;
                teacherInitial.push(tcrinitial);
                let tcrname = ChlidSnapshot.val().name;
                teacherName.push(tcrname);
                let tcrdes = ChlidSnapshot.val().designation;
                teacherDesignation.push(tcrdes);
                let tcrdept = ChlidSnapshot.val().department;
                teacherDepartment.push(tcrdept);
                let tcremail = ChlidSnapshot.val().email;
                teacherEmail.push(tcremail);
                let tcrphone = ChlidSnapshot.val().contact;
                teacherphone.push(tcrphone);
                let imageUrl = ChlidSnapshot.val().image;
                teacherImage.push(imageUrl);

                addItemToTheList(tcrinitial, tcrname, tcrdes, tcrdept, tcremail, tcrphone, imageUrl);
            }
        );
    });
}

if (window.addEventListener) {
    window.addEventListener('load', FeatchAllData);
 } else if (window.attachEvent) {
    window.attachEvent('onload', FeatchAllData);
 } else { 
    window.onload = FeatchAllData;
 }