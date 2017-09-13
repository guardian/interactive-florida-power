var xhr = new XMLHttpRequest;

xhr.open('GET', process.env.PATH + '/resultsmap.html',false);
xhr.send();

var maphtml = xhr.responseText;


var maps = [].slice.call(document.querySelectorAll(".gv-map"));

maps.forEach(function(m){
  m.innerHTML += maphtml;
  setTimeout(function(){m.style.paddingBottom = "0px"})
 // ;
})
