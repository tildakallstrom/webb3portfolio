"use strict";
//variabler
let worksEl = document.getElementById("works");


//händelselyssnare
window.addEventListener('load', getWorks);
 
//Funktioner
function getWorks() {
    worksEl.innerHTML = '';
    fetch('https://studenter.miun.se/~tika1900/writeable/webbtjansten/workplaces.php')
    .then(response => response.json())
    .then(data =>  {
        data.forEach(work => {
            worksEl.innerHTML += 
            `
            <div class="onework">
          <h4> ${work.title}, ${work.workplace} (${work.start} - ${work.stop}) </h4>
          <p>${work.city}, ${work.country}</p>
          <p>${work.description}</p>
        </div>
      
            
`    
        })
    })
    
}


