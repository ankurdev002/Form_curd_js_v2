let formValid = document.getElementsByClassName("formValid");
let formdatareset = document.getElementById("formdata");
document.getElementById("crudtable").style.display = "none";
let SelectedRow = null;
let isFormValid = true;

function AddData(e) {
  e.preventDefault();
  if (inputchecker()) {
    let dataDetails = readForm();
    for (let i = 0; i < formValid.length; i++) {
      formValid[i].nextElementSibling.style.display = "none";
    }

    if (SelectedRow == null) {
      insert(dataDetails);
    } else {
      update(dataDetails);
      resetForm();
    }
    formdatareset.reset();
  } else {
    ValidForm();
  }
}

function resetForm() {
  SelectedRow = null;
  formdatareset.reset();
}

function ValidForm() {
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;
  let age = document.getElementById("age").value;
  let mob = document.getElementById("mob").value;
  let email = document.getElementById("email").value;
  let city = document.getElementById("city").value;
  if (
    name == "" ||
    password == "" ||
    age == "" ||
    mob == "" ||
    email == "" ||
    city == ""
  ) {
    for (let i = 0; i < formValid.length; i++) {
      if (formValid[i].value == "") {
        formValid[i].nextElementSibling.style.display = "block";
      } else {
        formValid[i].nextElementSibling.style.display = "none";
      }
    }
    return false;
  }
  return true;
}

function inputchecker() {
  let namechecker =
    /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/;
  let namevalue = document.getElementById("name");
  let passvalue = document.getElementById("password");
  let emailchecker = /^[a-zA-Z0-9+_.-]+@[a-zA-Z]+[.]+([com]{3})+$/;
  let emailvalue = document.getElementById("email");
  let agechecker = /^([0-1]{1}[0-9]{0,2})$/;
  let agevalue = document.getElementById("age");
  let mobchecker = /^[0-9]{10}$/;
  let mobvalue = document.getElementById("mob");
  let citychecker = /^[a-zA-Z]+$/;
  let cityvalue = document.getElementById("city");

  if (!namechecker.test(namevalue.value) || !namevalue.value) {
    namevalue.nextElementSibling.style.display = "block";
    namevalue.focus;
    return false;
  } else {
    namevalue.nextElementSibling.style.display = "none";
  }

  if (passvalue == "") {
    passvalue.nextElementSibling.style.display = "block";
    passvalue.focus;
    return false;
  } else {
    passvalue.nextElementSibling.style.display = "none";
  }

  if (!agechecker.test(agevalue.value) || !agevalue.value) {
    agevalue.nextElementSibling.style.display = "block";
    agevalue.focus;
    return false;
  } else {
    agevalue.nextElementSibling.style.display = "none";
  }
  if (!mobchecker.test(mobvalue.value) || !mobvalue.value) {
    mobvalue.nextElementSibling.style.display = "block";
    mobvalue.focus;
    return false;
  } else {
    mobvalue.nextElementSibling.style.display = "none";
  }
  if (!emailchecker.test(emailvalue.value) || !emailvalue.value) {
    emailvalue.nextElementSibling.style.display = "block";
    emailvalue.focus;
    return false;
  } else {
    emailvalue.nextElementSibling.style.display = "none";
  }

  if (!citychecker.test(cityvalue.value) || !cityvalue.value) {
    cityvalue.nextElementSibling.style.display = "block";
    cityvalue.focus;
    return false;
  } else {
    cityvalue.nextElementSibling.style.display = "none";
  }

  return isFormValid;
}

function readForm() {
  let dataDetails = {};
  dataDetails["fullname"] = document.getElementById("name").value;
  dataDetails["password"] = document.getElementById("password").value;
  dataDetails["email"] = document.getElementById("email").value;
  dataDetails["mob"] = document.getElementById("mob").value;
  dataDetails["city"] = document.getElementById("city").value;
  dataDetails["age"] = document.getElementById("age").value;
  return dataDetails;
}

function insert(detail) {
  let table = document
    .getElementById("crudtable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = detail.fullname;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = detail.password;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = detail.email;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = detail.mob;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = detail.city;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = detail.age;
  cell7 = newRow.insertCell(6);
  cell7.innerHTML = `<a onClick="Edit(this)" class="btna">Edit</a>
                   <a onClick="Delete(this)" class="btnb">Delete</a>`;

  document.getElementById("crudtable").style.display = "block";

  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}

function Edit(td) {
  SelectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = SelectedRow.cells[0].innerHTML;
  document.getElementById("password").value = SelectedRow.cells[1].innerHTML;
  document.getElementById("email").value = SelectedRow.cells[2].innerHTML;
  document.getElementById("mob").value = SelectedRow.cells[3].innerHTML;
  document.getElementById("city").value = SelectedRow.cells[4].innerHTML;
  document.getElementById("age").value = SelectedRow.cells[5].innerHTML;

  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  document.getElementById("name").focus();
}

function update(dataDetails) {
  SelectedRow.cells[0].innerHTML = dataDetails.fullname;
  SelectedRow.cells[1].innerHTML = dataDetails.password;
  SelectedRow.cells[2].innerHTML = dataDetails.email;
  SelectedRow.cells[3].innerHTML = dataDetails.mob;
  SelectedRow.cells[4].innerHTML = dataDetails.city;
  SelectedRow.cells[5].innerHTML = dataDetails.age;

  document.getElementById("Submit").style.display = "block";
  document.getElementById("Update").style.display = "none";

  var x = document.getElementById("toastupdate");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}

function Delete(td) {
  if (confirm("Are You Sure You Want To Delete Data Record ?...")) {
    row = td.parentElement.parentElement;
    document.getElementById("crudtable").deleteRow(row.rowIndex);
    formdatareset.reset();

    var x = document.getElementById("toastdelete");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 5000);
  }
}
