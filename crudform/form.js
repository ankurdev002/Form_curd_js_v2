let formValid = document.getElementsByClassName("formValid");
document.getElementById("crudtable").style.display="none";
function validateForm(){
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let mob = document.getElementById("mob").value;
    let city = document.getElementById("city").value;

    
    if(name =="" 
    || age == ""
    || password==""
    || email == ""
    || mob == ""
    || city == ""){
        for(let i=0;i<formValid.length;i++){
            if(formValid[i].value == ""){
                formValid[i].nextElementSibling.style.display="block";
            }
            else{
                formValid[i].nextElementSibling.style.display="none";
            }
        }
        return false;
    }
    return true;
}



function inputchecker(data){

    let namechecker=/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/;
    let namevalue=document.getElementById("name");
    let emailchecker=/^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.]+([com]{3})+$/;
    let emailvalue=document.getElementById("email");
    let agechecker=/^([0-1]{1}[0-9]{0,2})$/;
    let agevalue=document.getElementById("age");
    let mobchecker=/^[0-9]{10}$/;
    let mobvalue=document.getElementById("mob");
    let citychecker=/^[a-zA-Z]+$/;
    let cityvalue=document.getElementById("city");

    switch(data){
    case 'name':
    if( !namechecker.test(namevalue.value)){
        namevalue.nextElementSibling.style.display="block";
        namevalue.focus;
        return false;
    }
    else{
        namevalue.nextElementSibling.style.display="none";
    }break;

    case 'age':
    if(!agechecker.test(agevalue.value)){
        agevalue.nextElementSibling.style.display="block";
        agevalue.focus;
        return false;
    }
    else{
        agevalue.nextElementSibling.style.display="none";
    }break;

    case 'mob':
    if(!mobchecker.test(mobvalue.value)){
        mobvalue.nextElementSibling.style.display="block";
        mobvalue.focus;
        return false;
    }
    else{
        mobvalue.nextElementSibling.style.display="none";
    }break;

    case 'email':
    if(!emailchecker.test(emailvalue.value)){
        emailvalue.nextElementSibling.style.display="block";
        emailvalue.focus;
        return false;
    }
    else{
        emailvalue.nextElementSibling.style.display="none";
    }break;

    case 'city':
    if(!citychecker.test(cityvalue.value)){
        cityvalue.nextElementSibling.style.display="block";
        cityvalue.focus;
        return false;
    }
    else{
        cityvalue.nextElementSibling.style.display="none";
    }break;
}
   
}  

//display data from local storage
function showData(){
    let datalist;
    if(localStorage.getItem("datalist") == null){
        datalist = [];
    }
    else{
        datalist = JSON.parse(localStorage.getItem("datalist"));
    }
    
    let html = "";

    datalist.forEach(function (element,index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.password + "</td>";
        html += "<td>" + element.mob + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.city + "</td>";
        html += '<td><a onclick="deleteData('+index+')" class="btnb">Delete</a><a onclick="updateData('+index+')" class="btna">Edit</a></td>';
        html += "</tr>";
    });
    document.querySelector("#crudtable tbody").innerHTML =html;
}
//Loads all data when page is loaded
document.onload= showData();
//add data
function AddData(e){
    e.preventDefault()
    if(validateForm()== true){
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        let mob = document.getElementById("mob").value;
        let city = document.getElementById("city").value;

        for(let i=0;i<formValid.length;i++){
                formValid[i].nextElementSibling.style.display="none";
            
        }

        let datalist;
        if(localStorage.getItem("datalist") == null){
            datalist = [];
        }
        else{
            datalist = JSON.parse(localStorage.getItem("datalist"));
        }
        datalist.push({
            name: name,
            age: age,
            password: password,
            email: email,
            mob: mob,
            city: city,
        });
        localStorage.setItem("datalist",JSON.stringify(datalist));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mob").value = "";
        document.getElementById("city").value = "";


        document.getElementById("crudtable").style.display="block";

        formdata.reset();

        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }
    
}

//delete data from localstorage
function deleteData(index){
    let datalist;
    if(localStorage.getItem("datalist") == null){
        datalist = [];
    }
    else{
        datalist = JSON.parse(localStorage.getItem("datalist"));
    }

    datalist.splice(index , 1);
    localStorage.setItem("datalist", JSON.stringify(datalist));
    showData();

    var x = document.getElementById("toastdelete")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);

}

//update funciton
function updateData(index){
    //button replace from submit to update
    document.getElementById("Submit").style.display="none";
    document.getElementById("Update").style.display="block";
    for(let i=0;i<formValid.length;i++){
        formValid[i].nextElementSibling.style.display="none";
}
    let datalist;
    if(localStorage.getItem("datalist") == null){
        datalist = [];
    }
    else{
        datalist = JSON.parse(localStorage.getItem("datalist"));
    }

    document.getElementById("name").value = datalist[index].name;
    document.getElementById("age").value = datalist[index].age;
    document.getElementById("password").value = datalist[index].password;
    document.getElementById("email").value = datalist[index].email;
    document.getElementById("mob").value = datalist[index].mob;
    document.getElementById("city").value = datalist[index].city;


    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            datalist[index].name = document.getElementById("name").value;
            datalist[index].age = document.getElementById("age").value;
            datalist[index].password = document.getElementById("password").value;
            datalist[index].email = document.getElementById("email").value;
            datalist[index].mob = document.getElementById("mob").value;
            datalist[index].city = document.getElementById("city").value;


            localStorage.setItem("datalist",JSON.stringify(datalist));

            for(let i=0;i<formValid.length;i++){
                formValid[i].nextElementSibling.style.display="none";
        }

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("password").value = "";
            document.getElementById("email").value = "";
            document.getElementById("mob").value = "";
            document.getElementById("city").value = "";


            document.getElementById("Submit").style.display="block";
            document.getElementById("Update").style.display="none";

            for(let i=0;i<formValid.length;i++){
                formValid[i].nextElementSibling.style.display="none";
        }



            var x = document.getElementById("toastupdate")
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
        }
    }

 

}