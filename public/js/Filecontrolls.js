//play audio
var audio = document.getElementById("audioFile");

function play() {
  audio.play();
}

function pause(){
  audio.pause();
}
const fileContainer = document.querySelector("#files");
const desc = document.getElementById("desc");
const link_download = document.getElementById("link-download");
const descDate = document.getElementById("descDate");
const link_share = document.getElementById("link-share");
//



var file = document.getElementsByTagName("th");

for (var i = 0; i < file.length; i++) {

  

  file[i].addEventListener("click", function (e) {
  link_download.style.display='initial';
  link_share.style.display='initial';
  descDate.style.display='initial';
    if (e.target.src) {
      previewleft.data = e.target.src;
      // adding desc to preview
      // adding desc to preview
      if (e.target.classList.contains("video")) {
        var text=e.target.id;

        desc.innerHTML=text.slice(0,-30);
       link_download.href="/download/file/"+e.target.id;
      
       link_share.href="/share/file/"+e.target.id;
      }

      document.getElementById("img").style.display = "none";
    }

    if (e.target.classList.contains("img")) {
      if (e.target.id == "pdfCover") {
        var pdfFile = document.getElementById("pdfFile");
        //use object to preview
        previewleft.style.display = "block";
        document.getElementById("img").style.display = "none";
        previewleft.data = pdfFile.src;
        audio.pause();
      } else {
        //use image tag to preview
        previewleft.style.display = "none";
        document.getElementById("img").style.display = "block";
        document.getElementById("img").src = e.target.src;
        audio.pause();
      }

      // adding desc to preview
      var text=e.target.alt;
      desc.innerHTML = text.slice(0,-30);
      // download
      link_download.href="/download/file/"+e.target.alt;
      // share
      
      link_share.href="/share/file/"+e.target.alt;
 

      //pausing audio
      if (e.target.id == "noAudio") {
        audio.pause();
      }
    } else {
      //any file
      document.getElementById("img").style.display = "none";
      previewleft.style.display = "block";
      audio.pause();
    }


  });
} //pauding audio on double click

 
