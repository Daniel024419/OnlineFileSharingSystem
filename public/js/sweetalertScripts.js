
function logout(){
    

swal({
  title: "Are you sure want to logout?",
  text: "",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((logout) => {
  if (logout) {
    window.location.href='/logout';
  } else {
    
  }
});

}
 

 function deleteFiles(fileId){
    
swal({
  title: "You want to delete this file?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/delete/file/'+fileId;
  } else {
    
  }
});

}


 function deleteDownloads(fileId){
    
swal({
  title: "You want to delete this download?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/delete/download/history/'+fileId;
  } else {
    
  }
});

}



 function EmptyDownloads(){
    
swal({
  title: "You want to empty this downloads table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/downloads';
  } else {
    
  }
});

}


 function EmptyFiles(){
    
swal({
  title: "You want to empty this files table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/files';
  } else {
    
  }
});

}



 function EmptyUsers(){
    
swal({
  title: "You want to empty this users table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/users';
  } else {
    
  }
});

}

 function EmptyCompanies(){
    
swal({
  title: "You want to empty this companies table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/companies';
  } else {
    
  }
});

}


 function deleteUsers(userId){
    
swal({
  title: "You want to delete this user?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
  window.location.href = "/delete/user/"+userId;
  } else {
    
  }
});

}

 function deleteComapny(comp_id){
    
swal({
  title: "You want to delete this company?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
  window.location.href = '/company/delete/'+comp_id;
  } else {
    
  }
});

}


 function deleteDepartment(dept_id){
    
swal({
  title: "You want to delete this department?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
  window.location.href = '/dept/delete/'+dept_id;
  } else {
    
  }
});

}


 function EmptyDepartment(){
    
swal({
  title: "You want to empty this department table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/department';
  } else {
    
  }
});

}

 function EmptyLogs(){
    
swal({
  title: "You want to empty this logs table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/logs';
  } else {
    
  }
});

}

 function deleteLog(logId){
    
swal({
  title: "You want to delete this log?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
  window.location.href = '/delete/log/'+logId;
  } else {
    
  }
});

}

function deleteErrLog(logId){
    
swal({
  title: "You want to delete this error log?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
  window.location.href = '/delete/error_log/'+logId;
  } else {
    
  }
});

}


 function EmptyErrorLogs(){
    
swal({
  title: "You want to empty this error logs table?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})


.then((Yes) => {
  if (Yes) {
   window.location.href = '/truncate/error_logs';
  } else {
    
  }
});

}


  function sucessDelete (message) {
    swal({
        title: 'Success',
        text: message+' successfully',
        icon: 'success',
        buttons: false,
        timer: 2100,

    });

}



  function sucessDownload (message) {
    swal({
        title: 'Download',
        text: message+' successfully',
        icon: 'success',
        buttons: false,
        timer: 2100,

    });

}

  function CreateAdmin () {

   Swal.fire({
  title: 'Create Department Admin',
  html: `
    <form id="data-form">
      <input type="text" id="username" class="swal2-input" placeholder="Username">
      <input type="password" id="password" class="swal2-input" placeholder="Password">
      <input type="text" id="company" class="swal2-input" placeholder="Company">
      <input type="tel" id="telephone" class="swal2-input" placeholder="Telephone">
      <input type="text" id="department" class="swal2-input" placeholder="Department">
      <input type="email" id="email" class="swal2-input" placeholder="Gmail">
    </form>
  `,
  showCancelButton: true,
  confirmButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  preConfirm: () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const company = document.getElementById('company').value;
    const telephone = document.getElementById('telephone').value;
    const department = document.getElementById('department').value;
    const email = document.getElementById('email').value;

    if (!username || !password || !company || !telephone || !department || !email) {
      Swal.showValidationMessage('Please fill in all fields');
      return false;
    }

    return {
      username: username,
      password: password,
      company: company,
      telephone: telephone,
      department: department,
      email: email,
    };
  },
}).then((result) => {
  if (result.isConfirmed) {
    const formData = result.value;

    // Send the input data to your server
    submitDataToServer(formData);
  }
});

function submitDataToServer(formData) {
  fetch('/save-admin-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.message) {
        Swal.fire('Success', result.message, 'success');
        
      } else {
        throw new Error('Response does not contain a message');
      }
// Reload the page after the Swal alert is closed
        location.reload();

      
    })
    .catch((error) => {
      Swal.fire('Error', 'An error occurred while saving data', 'error');
      console.error(error);
    });
}

  }


