function selectTab(tabIndex) {
    //Hide All Tabs
    document.getElementById("tab1Content").style.display = "none";
    document.getElementById("tab2Content").style.display = "none";
    document.getElementById("tab3Content").style.display = "none";
    document.getElementById("tab4Content").style.display = "none";
    document.getElementById("tab1ContentAll").style.display = "none";
    //Show the Selected Tab
    document.getElementById("tab" + tabIndex + "Content").style.display ="block";
   
       //refreshig the table row ,by calling the search function 

    refreshTable();

   
 }

 function showAll(){
   document.getElementById("tab1ContentAll").style.display = "block";
   document.getElementById("tab1Content").style.display = "none";
   document.getElementById("tab2Content").style.display = "none";
   document.getElementById("tab3Content").style.display = "none";
   document.getElementById("tab4Content").style.display = "none";
 
      //refreshig the table row ,by calling the search function 

    refreshTable();
 }


 function refreshTable () {
   //clearing input after clicking on the tab
   document.getElementById("searhcInputNew").value='';
   //refreshig the table row ,by calling the search function 
   searchWord();
 }
 

 

 