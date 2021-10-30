//hämta webbplatser
let websitesEl = document.getElementById("websites");

window.addEventListener('load', getWebsites);

function getWebsites() {
    websitesEl.innerHTML = '';
    fetch('https://studenter.miun.se/~tika1900/writeable/webbtjansten/websites.php')
    .then(response => response.json())
    .then(data =>  {
        data.forEach(website=> {
            websitesEl.innerHTML += 
            `
            <div class="website">
            <h2 class="webh2">${website.title}</h2>
            <p>${website.description}</p>
            <button class="webbtn" onclick="window.location.href='${website.url}'">Besök ${website.title} &gt;&gt;</button>
            </div>
            <div class="container">
            <a href="${website.url}">
            <picture>
              <img src="img/${website.image}.png" alt="${website.image}" class="tdimg">
           </picture>
 </a>
 <div class="middle">
 <button class="text" onclick="window.location.href='${website.url}'">Besök ${website.title} &gt;&gt;</button>
</div>
 </div>

`    
        })
    })
    
}
