  // script.js
  document.addEventListener('DOMContentLoaded', () => {
  
  const ComP_Ucod = document.getElementById('ComP_Ucod');
  const dataContainer = document.getElementById('dataContainer');
  const checkBtn = document.getElementById('checkBtn');
  var confirm =document.getElementById('confirm');
  let companyID = document.forms["register"]["company"];
  checkBtn.addEventListener('click', () => {

        const inputValue = ComP_Ucod.value;
        let userSelectionCompId = document.forms["register"]["company"].value;

    if(inputValue && userSelectionCompId){



    // Make an AJAX request to your Node.js server
 fetch(`/fetch-company-id?input=${inputValue}&userSelectionCompId=${userSelectionCompId}`)     
  .then(response => response.json())
      .then(result_select_company => {
        // Update the UI with the fetched data
 

         const jsonData = result_select_company.ComP_Ucod;
        // alert(jsonData);
    if (jsonData !== '404') {
    // Check if jsonData is a valid JSON object
        // dataContainer.innerHTML = jsonData;
        checkBtn.value='Verified';
        confirm.checked=true;
        checkBtn.disabled=true;
        document.getElementById('ComP_Ucod').readOnly=true;
        localStorage.removeItem('count');
        localStorage.removeItem('isLoggedIn');

       swal({
        title: 'Verification',
        text:  'Company Verified successfully',
        icon: 'success',
        buttons: false,
        timer: 2100,

    });

} else if (jsonData == '404'){

// Store data in localStorage
let count =0;

count = localStorage.getItem('count');

if (count !=='NaN') {

count = parseInt(count) + 1;

}else{

  count = 1;
}

localStorage.setItem('count', count);

//console.log('you have tried '+ localStorage.getItem('count'));

let atemp =3;
let atempts=0;
if (localStorage.getItem('count') !=='NaN') {

atempts = atemp - localStorage.getItem('count')

}else{

  atempts = atemp ;
}
    
    if (atempts == 0 ) {

    localStorage.setItem('isLoggedIn', 'true');

     window.location.href="/wait-screen";


    } else if ( atempts > 0 && atempts <= 3)  {

        swal({
        title: 'Error',
        text:  `Wrong Unique Code ,3 atempts , ${atempts}  left`,
        icon: 'warning',
        buttons: true,
        // timer: 3100,
    });

confirm.checked=false;
    }else{
        console.log("over dose");
    }

        }

        else{

            alert('not respons');
        }

      })
      .catch(error => console.error(error));



                }else{
     console.log("input empty");

       swal({
        title: 'Error',
        text:  'Company ID or Key can not be empty',
        icon: 'warning',
        buttons: true,
        timer: 3100,

    });
                }


//event click
  });

//domload
});




window.onload = function() {

// Get data from localStorage
const isLoggedInWithError = localStorage.getItem('isLoggedIn');

if (isLoggedInWithError === 'true') {
  
  window.location.href="/wait-screen";
  console.log('violation.');

} else {
  
  console.log('Please log in to continue.');
}


}