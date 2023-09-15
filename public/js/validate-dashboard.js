
let error_msg_form = document.getElementById('error-msg-form');
let submit_btn = document.getElementById('submit_btn');


function checkDesc(desc) {
  error_msg_form.style.display = 'none';
  document.getElementById('count').innerHTML = desc.length + '/20';
  var desc_err__msg = document.getElementById('desc_err__msg');
  //check empty desc field on keyup
  if (desc == "") {
    desc_err__msg.textContent = 'Input required';
    desc_err__msg.style.display = 'initial';
    desc_err__msg.style.color = 'red';
    submit_btn.disabled = true;
    submit_btn.style.cursor='not-allowed';
    document.getElementById('desc').style.borderColor = 'red';
    return false;

  }
  else {
      submit_btn.disabled = false;
      submit_btn.style.cursor='pointer';

  }

  //desc length
  if (desc.length <= 2) {
    desc_err__msg.style.display = 'initial';
    desc_err__msg.textContent = 'Desc can not be less than 2 chars'
    desc_err__msg.style.color = 'red';
    document.getElementById('desc').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    error_msg_form.style.display = 'none';
    return false;
  } else {
      submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  //desc length
  if (desc.length > 15) {
    desc_err__msg.style.display = 'initial';
    desc_err__msg.textContent = 'Desc can not be greater than 15 chars'
    desc_err__msg.style.color = 'red';
    document.getElementById('desc').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  } else {
      submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  if (desc.length == 20 || desc.length >= 2) {

    desc_err__msg.style.display = 'none';
    document.getElementById('desc').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
     return false;
  }


  
}




function checkCompany(company) {
  error_msg_form.style.display = 'none';
  var comp_err__msg = document.getElementById('comp_err__msg');
  if (company == "") {
    comp_err__msg.textContent = 'Input required';
    comp_err__msg.style.display = 'initial';
    comp_err__msg.style.color = 'red';
    document.getElementById('company').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }else{
      submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  var list = [];
  //var comp=  document.getElementById("comp");
  var x = document.getElementById("comp");
  var i;
  for (i = 0; i < x.options.length; i++) {
    var value = x.options[i].value;
    list.push(value);
  }

  if (list.includes(company)) {
    comp_err__msg.innerHTML = 'Company found';
    comp_err__msg.style.display = 'initial'
    comp_err__msg.style.color = 'green';
    document.getElementById('company').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    //   
  }

  else {
    comp_err__msg.style.display = 'initial'
    comp_err__msg.innerHTML = 'Company not found';
    comp_err__msg.style.color = 'red';
    document.getElementById('company').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
  }


}


//dept
function checkDept(department) {
  error_msg_form.style.display = 'none';
  var dept_err__msg = document.getElementById('dept_err__msg');
  if (department == "") {
    dept_err__msg.textContent = 'Input required';
    dept_err__msg.style.display = 'initial';
    document.getElementById('department').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }
  else{
        submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }
  var list = [];
  var labelLst = [];
  var dept = [];
  var x = document.getElementById("dept");
  var i;
  for (i = 0; i < x.options.length; i++) {
    var value = x.options[i].value;
    list.push(value);
    var lbl = x.options[i].label;
    labelLst.push(lbl)
    //dept[value]=lbl;

  }



  if (list.includes(department)) {
    dept_err__msg.innerHTML = 'Department found';
    dept_err__msg.style.display = 'initial';
    dept_err__msg.style.color = 'green';
    document.getElementById('department').style.borderColor = 'green';
      submit_btn.disabled = false; submit_btn.style.cursor='pointer';    
    //   
  } else {
    dept_err__msg.style.display = 'initial';
    dept_err__msg.textContent = 'Department not found';
    document.getElementById('department').style.borderColor = 'red';
    dept_err__msg.style.color = 'red'
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';

  }

}


//  end

function validateForm() {
  let desc = document.forms["file_form"]["desc"].value;
  let company = document.forms["file_form"]["company"].value;
  let department = document.forms["file_form"]["department"].value;
  let file = document.forms["file_form"]["fileUpload"].value;

  let error_msg_form = document.getElementById('error-msg-form');

  if (file == ""
    || company == ""
    || department == ""
    || desc == "") {
    // alert("input must be filled out");
    error_msg_form.style.display = 'initial';
    error_msg_form.textContent = "All input are required....";
    return false;
  }


}

// company
//  end
function checkCompanyName(compName) {

  error_msg_form.style.display = 'none';
  document.getElementById('count').innerHTML = compName.length + '/20';
  var compName_err__msg = document.getElementById('compName_err__msg');


  if (compName == "") {
    compName_err__msg.textContent = 'Input required';
    compName_err__msg.style.display = 'initial';
    compName_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.getElementById('compName').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  //desc length
  if (compName.length > 2) {
    compName_err__msg.style.display = 'none';
    document.getElementById('compName').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;
  } else {
    compName_err__msg.style.display = 'initial';
    compName_err__msg.textContent = 'Name can not be less than 2 chars'
    compName_err__msg.style.color = 'red';
    document.getElementById('compName').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }

}



function checkCompanyLocation(comptLocation) {

  error_msg_form.style.display = 'none';
  var comptLocation_err__msg = document.getElementById('comptLocation_err__msg');

  if (comptLocation == "") {
    comptLocation_err__msg.textContent = 'Input required';
    comptLocation_err__msg.style.display = 'initial';
    comptLocation_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.querySelector('.comptLocation').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  //desc length
  if (comptLocation.length > 2) {
    comptLocation_err__msg.style.display = 'none';
    document.querySelector('.comptLocation').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;
  } else {
    comptLocation_err__msg.style.display = 'initial';
    comptLocation_err__msg.textContent = 'Location can not be less than 2 chars'
    comptLocation_err__msg.style.color = 'red';
    document.querySelector('.comptLocation').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }

}


//end
//checkCompanycompMail
function checkCompanycompMail(compMail) {
  var compMail_err__msg = document.getElementById('compMail_err__msg');

  error_msg_form.style.display = 'none';

  if (compMail == "") {
    compMail_err__msg.textContent = 'Input required';
    compMail_err__msg.style.display = 'initial';
    compMail_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.querySelector('.compMail').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (compMail.match(mailformat)) {
    compMail_err__msg.style.display = 'none';
    document.querySelector('.compMail').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;

  }
  else {
    compMail_err__msg.style.display = 'initial';
    compMail_err__msg.textContent = 'Invalid mail..'
    compMail_err__msg.style.color = 'red';
    document.querySelector('.compMail').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }

}


// checkCompanycomptel
function checkCompanycomptel(comptel) {
  var comptel_err__msg = document.getElementById('comptel_err__msg');

  error_msg_form.style.display = 'none';

  if (comptel == "") {
    comptel_err__msg.textContent = 'Input required';
    comptel_err__msg.style.display = 'initial';
    comptel_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.querySelector('.compMail').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }


  var numbers = /[0-9]/g;


  if (comptel.match(numbers) && comptel.length == 10 || comptel.length == 13) {
    comptel_err__msg.style.display = 'none';
    document.querySelector('.comptel').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;
  }
  else {
    comptel_err__msg.style.display = 'initial';
    comptel_err__msg.textContent = 'Invalid telephone number'
    comptel_err__msg.style.color = 'red';
    document.querySelector('.comptel').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }


}


// 
function validateComp() {
  let compName = document.forms["company_form"]["compName"].value;
  let comptLocation = document.forms["company_form"]["comptLocation"].value;
  let compMail = document.forms["company_form"]["compMail"].value;
  let comptel = document.forms["company_form"]["comptel"].value;

  let error_msg_form = document.getElementById('error-msg-form');

  if (compName == ""
    || comptLocation == ""
    || compMail == ""
    || comptel == "") {
    // alert("input must be filled out");
    error_msg_form.style.display = 'initial';
    error_msg_form.textContent = "All input are required....";
    return false;
  }


}


// dept
// 
// dept name
function checkdeptName(deptName) {

  error_msg_form.style.display = 'none';
  document.getElementById('count').innerHTML = deptName.length + '/20';
  var deptName_err__msg = document.getElementById('deptName_err__msg');
  if (deptName == "") {
    deptName_err__msg.textContent = 'Input required';
    deptName_err__msg.style.display = 'initial';
    deptName_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.getElementById('dept').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  //desc length
  if (deptName.length > 2) {
    deptName_err__msg.style.display = 'none';
    document.getElementById('dept').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;
  } else {
    deptName_err__msg.style.display = 'initial';
    deptName_err__msg.textContent = 'Name can not be less than 2 chars'
    deptName_err__msg.style.color = 'red';
    document.getElementById('dept').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }

}


// deptLocation
function checkdeptLocation(deptLocation) {

  error_msg_form.style.display = 'none';
  var deptLocation_err__msg = document.getElementById('deptLocation_err__msg');
  if (deptLocation == "") {
    deptLocation_err__msg.textContent = 'Input required';
    deptLocation_err__msg.style.display = 'initial';
    deptLocation_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.querySelector('.deptLocation').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  //desc length
  if (deptLocation.length > 2) {
    deptLocation_err__msg.style.display = 'none';
    document.querySelector('.deptLocation').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;
  } else {
    deptLocation_err__msg.style.display = 'initial';
    deptLocation_err__msg.textContent = 'Location can not be less than 2 chars'
    deptLocation_err__msg.style.color = 'red';
    document.querySelector('.deptLocation').style.borderColor = 'red';
    submit_btn.disabled = true;
    submit_btn.style.cursor='not-allowed';
    return false;
  }

}

// deptMail
function checkdeptMail(deptMail) {
  var deptMail_err__msg = document.querySelector('#deptMail_err__msg')
  error_msg_form.style.display = 'none';

  if (deptMail == "") {
    deptMail_err__msg.textContent = 'Input required';
    deptMail_err__msg.style.display = 'initial';
    deptMail_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    document.querySelector('.deptMail').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (deptMail.match(mailformat)) {
    deptMail_err__msg.style.display = 'none';
    document.querySelector('.deptMail').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    return false;

  }
  else {
    deptMail_err__msg.style.display = 'initial';
    deptMail_err__msg.textContent = 'Invalid mail..'
    deptMail_err__msg.style.color = 'red';
    document.querySelector('.deptMail').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  }

}


function checkdeptCompany(company) {
   
  error_msg_form.style.display = 'none';
  var dept_comp_err__msg = document.getElementById('dept_comp_err__msg');
  if (company == "") {
    dept_comp_err__msg.textContent = 'Input required';
    dept_comp_err__msg.style.display = 'initial';
    dept_comp_err__msg.style.color = 'red';
    document.getElementById('company').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    return false;
  } else {
      submit_btn.disabled = false; submit_btn.style.cursor='pointer';

  }

  var list = [];
  //var comp=  document.getElementById("comp");
  var x = document.getElementById("comp");
  var i;
  for (i = 0; i < x.options.length; i++) {
    var value = x.options[i].value;
    list.push(value);
  }

  if (list.includes(company)) {
    dept_comp_err__msg.innerHTML = 'Company found';
    dept_comp_err__msg.style.display = 'initial'
    dept_comp_err__msg.style.color = 'green';
    document.querySelector('.deptComp').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
    //   
  }

  else {
    dept_comp_err__msg.style.display = 'initial'
    dept_comp_err__msg.innerHTML = 'Company not found';
    dept_comp_err__msg.style.color = 'red';
    document.querySelector('.deptComp').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
  }


}

//tel
// checkCompanycomptel
function checkdept_tel(Dept_tel) {
  var dept_tel_err__msg = document.getElementById('dept_tel_err__msg');

  error_msg_form.style.display = 'none';

  if (Dept_tel == "") {
    dept_tel_err__msg.textContent = 'Input required';
    dept_tel_err__msg.style.display = 'initial';
    dept_tel_err__msg.style.color = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    submit_btn.style.cursor='not-allowed';
    document.querySelector('.dept_tel').style.borderColor = 'red';
    return false;

  }
  else {
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';
  }


  var numbers = /[0-9]/g;


  if (Dept_tel.match(numbers) && Dept_tel.length == 10 || Dept_tel.length == 13) {
    dept_tel_err__msg.style.display = 'none';
    document.querySelector('.dept_tel').style.borderColor = 'green';
     submit_btn.disabled = false; submit_btn.style.cursor='pointer';

    return false;
  }
  else {
    dept_tel_err__msg.style.display = 'initial';
    dept_tel_err__msg.textContent = 'Invalid telephone number'
    dept_tel_err__msg.style.color = 'red';
    document.querySelector('.dept_tel').style.borderColor = 'red';
    submit_btn.disabled = true; submit_btn.style.cursor='not-allowed';
    submit_btn.style.cursor='not-allowed';
    return false;
  }


}

// end 
function validateDept() {
  let deptName = document.forms["dept_form"]["deptName"].value;
  let deptLocation = document.forms["dept_form"]["deptLocation"].value;
  let deptMail = document.forms["dept_form"]["deptMail"].value;
  let company = document.forms["dept_form"]["company"].company;
  let tel = document.forms["dept_form"]["tel"].value;

  let error_msg_form = document.getElementById('error-msg-form');

  if (deptName == ""
    || deptLocation == ""
    || deptMail == ""
    || company == ""
    || tel == "") {
    // alert("input must be filled out");
    error_msg_form.style.display = 'initial';
    error_msg_form.textContent = "All input are required....";
    return false;
  }


}

