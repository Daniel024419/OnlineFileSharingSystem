
//admin
function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searhcInputNew");
    filter = input.value.toUpperCase();
    table = document.getElementById("recents");

    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
          
        }
      }       
    }
  }



//customer
var input, filter, table, tr, td, i,alltables;
    alltables = document.querySelectorAll("table[data-name=recents]");
    input = document.getElementById("searhcInputNew");

  function searchWord() {
    
    filter = input.value.toUpperCase();
    alltables.forEach(function(table){

//
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }

        //
    });
  }



 