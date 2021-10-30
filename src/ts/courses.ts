"use strict";
//variabler
let coursesEl = document.getElementById("courses");



//händelselyssnare
window.addEventListener('load', getCourses);

 
//Funktioner
function getCourses() {
    coursesEl.innerHTML = '';
    fetch('https://studenter.miun.se/~tika1900/writeable/webbtjansten/courses.php')
    .then(response => response.json())
    .then(data =>  {
        data.forEach(course => {
            coursesEl.innerHTML += 
            `
            <tr class="courses">
             <td> ${course.coursename} </td>
             <td> ${course.school} </td>
             <td> ${course.start} </td>
             <td> ${course.stop} </td>
            </tr>
            
`    
        })
    })
    
}