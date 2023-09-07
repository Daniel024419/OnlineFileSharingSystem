  // script.js
  document.addEventListener('DOMContentLoaded', () => {
  
  const ComP_Ucod = document.getElementById('ComP_Ucod');
  const dataContainer = document.getElementById('dataContainer');
  const checkBtn = document.getElementById('checkBtn');
  var confirm =document.getElementById('confirm');
  var company = document.getElementById('company');
  checkBtn.addEventListener('click', () => {
    const inputValue = ComP_Ucod.value;

    // Make an AJAX request to your Node.js server
    fetch(`/fetch-company-id?input=${inputValue}`)
      .then(response => response.json())
      .then(result_select_company => {
        // Update the UI with the fetched data
        if (result_select_company) {
        dataContainer.innerHTML = result_select_company;
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

        } else {

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
        icon: 'Warning',
        buttons: true,
        // timer: 3100,
    });

confirm.checked=false;
    }else{
    	console.log("over dose");
    }

        }

      })
      .catch(error => console.error(error));
  });
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