
var pass_err__msg=document.getElementById('pass_err__msg');
var repass_err__msg=document.getElementById('repass_err__msg');
let submit_btn =  document.getElementById('submit_btn');
var newpassword =document.getElementById('newpassword');
var repassword =document.getElementById('repassword');
var passValue;

//lower cases
var lowerCaseLetters = /[a-z]/g;
// Validate capital letters
var upperCaseLetters = /[A-Z]/g;
//numbers
var numbers = /[0-9]/g;

newpassword.addEventListener('keyup', function verify(e) { 
    document.getElementById('repassword').value='';

    passValue=e.target.value;
   //check empty password field 
if(passValue==""){
        pass_err__msg.textContent='Input required';
        pass_err__msg.style.display='initial';
        pass_err__msg.style.color='red';
        submit_btn.disabled=true;
        document.getElementById('newpassword').style.borderBottomColor='red';
        return false;
      // alert('empty input');
    }
   //pass length
  if (passValue.length <= 8) {
    pass_err__msg.textContent='Password can not be less than 8 chars.'
    pass_err__msg.style.color='red';
    document.getElementById('newpassword').style.borderBottomColor='red';
    submit_btn.disabled=true;
    return false;
  }


 if (passValue.match(lowerCaseLetters) && passValue.match(upperCaseLetters) 
      && passValue.match(numbers) && passValue.length >= 8 )  {
    pass_err__msg.textContent='Password good 100%';
    pass_err__msg.style.color='green';
    document.getElementById('newpassword').style.borderBottomColor='green';
    submit_btn.disabled=false;
   }
   else{
    pass_err__msg.textContent='Password must contain mix chars';
    pass_err__msg.style.color='red';
    document.getElementById('newpassword').style.borderBottomColor='red';
    submit_btn.disabled=true;
    return false;
   }

  
 
});
 
//  end
function checkPass(repassword){
if(repassword==""){
        repass_err__msg.textContent='Input required';
        repass_err__msg.style.display='initial';
        document.getElementById('repassword').style.borderBottomColor='red';
        return false;
      // alert('empty input');
    }
   
if(newpassword.value===repassword && newpassword.value!="" ){
    repass_err__msg.style.display='initial';
    repass_err__msg.textContent='Password matched 100%'
    repass_err__msg.style.color='green';
    document.getElementById('repassword').style.borderBottomColor='green';
    submit_btn.disabled=false;
   }
else{
    if(repassword.value==""){
        repass_err__msg.style.display='none';
    }else{
    repass_err__msg.style.display='initial';
    repass_err__msg.textContent='Password not matched 0.0%'
    repass_err__msg.style.color='red';
    document.getElementById('repassword').style.borderBottomColor='red';
    submit_btn.disabled=true;
    return false
}
   }
//alert('repass');
}
 
 
// username
//var username=document.getElementById('Username').value;
//  end
function checkUsername(username){
    //alert(username)
   var uname_err__msg= document.getElementById('uname_err__msg')
    if(username==""){
        uname_err__msg.textContent='Input required';
        uname_err__msg.style.display='initial';
        document.getElementById('username').style.borderBottomColor='red';
        submit_btn.disabled=true;
        return false;

      // alert('empty input');
    }
       
  
           //name length
    
  if (username.length < 5 && username.length <= 1) {
    uname_err__msg.textContent='Username can not be less than 6 chars.'
    uname_err__msg.style.color='red';
    submit_btn.disabled=true;
    return false;
  }


  if (username.match(lowerCaseLetters) 
  && username.match(upperCaseLetters) 
  && username.match(numbers)) {
    // uname_err__msg.textContent='Username good 100%';
    // uname_err__msg.style.color='green';
    uname_err__msg.style.display='none';
    document.getElementById('username').style.borderBottomColor='green';
    submit_btn.disabled=false;
   }
   else{

    uname_err__msg.textContent='Username must contain mix chars';
    uname_err__msg.style.color='red';
    uname_err__msg.style.display='initial';
    document.getElementById('username').style.borderBottomColor='red';
    submit_btn.disabled=true;
    return false;

   }
    }
// end

//  end
// email
function checkEmail(email){
var email_err__msg=document.getElementById('email_err__msg');

if(email==""){
        document.getElementById('email_err__msg').textContent='Input required';
        document.getElementById('email_err__msg').style.display='initial';
        document.getElementById('email').style.borderBottomColor='red';
        submit_btn.disabled=true;
        return false;
}

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(email.match(mailformat))
{



    var list=[];
  var g = document.getElementById("check-list");
  var i;
  for (i = 0; i < g.options.length; i++) {
      var value = g.options[i].value ;
      list.push(value);
  }
  
  
   if(list.includes(email)){
    email_err__msg.textContent='Email already exist,Use different email';
    document.getElementById('email').style.borderBottomColor='red';
    submit_btn.disabled=true;
    email_err__msg.style.color='red';

    
 }else{
   email_err__msg.style.display='initial';
   email_err__msg.textContent='Email is valid';
   document.getElementById('email').style.borderBottomColor='green';
   email_err__msg.style.color='green';
   submit_btn.disabled=false; 
 }



   // end
}
else
{
    email_err__msg.textContent='Email must contain valid chars';
    email_err__msg.style.color='red';
    email_err__msg.style.display='initial';
    document.getElementById('email').style.borderBottomColor='red';
    submit_btn.disabled=true;
   return false;

}

    }
// end
//show and hide pass newpass
function showPassNew() {
   // alert('all')
    if (newpassword.type === "password") {
        newpassword.type = "text";
        document.getElementById('eye-newpass').style.display='none';
        document.getElementById('eye-close-newpass').style.display='initial';
        // alert('pass')
    } else {
        newpassword.type = "password";
        document.getElementById('eye-newpass').style.display='initial';
        document.getElementById('eye-close-newpass').style.display='none';
        
       // alert('text');
    }
  }


  //show and hide pass repass
function showPassRe() {
    // alert('all')
     if (repassword.type === "password") {
         repassword.type = "text";
         document.getElementById('eye-repass').style.display='none';
         document.getElementById('eye-close-repass').style.display='initial';
         // alert('pass')
     } else {
         repassword.type = "password";
         document.getElementById('eye-repass').style.display='initial';
         document.getElementById('eye-close-repass').style.display='none';
         
        // alert('text');
     }
   }


//    check all input




function validateForm() {
    let username = document.forms["register"]["username"].value;
    let company = document.forms["register"]["userName"].value;
    let department = document.forms["register"]["department"].value;
    let email = document.forms["register"]["email"].value;
    let password = document.forms["register"]["newpassword"].value;
    let repassword = document.forms["register"]["repassword"].value;
    let error_msg_form = document.getElementById('error-msg-form');

    if (username == "" 
    || company == "" 
    ||department== ""
    || email== "" 
    ||password== ""
    ||repassword== "" ) {
     // alert("input must be filled out");
      error_msg_form.textContent="All input are required....";
      
      return false;
    }

    
  }
  
//   setTimeout(() => {
//     error_msg_form.style.display="none";
//       }, 1000);

function checkCompany(company) {
  
if(company==""){
        document.getElementById('comp_err__msg').textContent='Input required';
        document.getElementById('comp_err__msg').style.display='initial';
        document.getElementById('comp_err__msg').style.color='red';
        document.getElementById('company').style.borderBottomColor='red';
        submit_btn.disabled=true;
        return false;
}

    var list=[];
  //var comp=  document.getElementById("comp");
  var x = document.getElementById("comp");
  var i;
  for (i = 0; i < x.options.length; i++) {
      var value = x.options[i].value ;
      list.push(value);
  }

   if(list.includes(company)){
    // document.getElementById('comp_err__msg').innerHTML='Company found';
    document.getElementById('comp_err__msg').style.display='none'
    document.getElementById('comp_err__msg').style.color='green';
    document.getElementById('company').style.borderBottomColor='green';
    submit_btn.disabled=false;
//   
 }
 
else{
    document.getElementById('comp_err__msg').style.display='initial'
    document.getElementById('comp_err__msg').innerHTML='Company not found';
    document.getElementById('comp_err__msg').style.color='red';
    document.getElementById('company').style.borderBottomColor='red';
    submit_btn.disabled=true;
  }
     
 
}
     

  //dept
function checkDept(department) {
  
if(department==""){
        document.getElementById('dept_err__msg').textContent='Input required';
        document.getElementById('dept_err__msg').style.display='initial';
        document.getElementById('department').style.borderBottomColor='red';
        submit_btn.disabled=true;
        return false;
}
 var list=[];
 var labelLst=[];
 var dept=[];
  var x = document.getElementById("dept");
  var i;
  for (i = 0; i < x.options.length; i++) {
      var value = x.options[i].value ;
      list.push(value);
      var lbl = x.options[i].label;
      labelLst.push(lbl)
      //dept[value]=lbl;
      
  }
 

  
   if(list.includes(department)){
    document.getElementById('dept_err__msg').style.display='none';
    document.getElementById('department').style.borderBottomColor='green';
    submit_btn.disabled=false;
 //   
}else{
    document.getElementById('dept_err__msg').style.display='initial';
    document.getElementById('dept_err__msg').textContent='Dept not found';
    document.getElementById('department').style.borderBottomColor='red';
    document.getElementById('dept_err__msg').style.color='red'
    submit_btn.disabled=true;
    
  }
    
  }




  function  validateLogin(password) {
     if (password=="") {
    document.getElementById('submit-btn-login').disabled=true;
      return false;
    }else{
        document.getElementById('submit-btn-login').disabled=false; 
    }
  }

  //
   