
/**
 * Template 
 */


/**
 * Fetch Function 
 */


 //Source: function from Treehouse Unit 5 Fetch API Workshop
 //use fetch to get data from api
         fetch("https://randomuser.me/api/?results=12&inc=picture,name,email,location,city,state,postcode,cell,dob&nat=US")
              .then(checkStatus)  
              .then(res => res.json())
              .then(data => {  
                 employeeData = data.results;
                 generateEmployee(employeeData);
                 openModal(employeeData) 
             })
              .catch(error => console.log('Error', error))
     
 /**
  * Check Status Functions 
  */
 
 //Source: function from Treehouse Unit 5 Fetch API Workshop
 //check status of response
 function checkStatus(response) {
     if (response.ok) {
         return Promise.resolve(response);
     } else {
         return Promise.reject(new Error(response.statusText));
     }
 }
 
 
 /**
  * Gallery Function 
  */
 
 //create a variable to grab the gallery element
 let gallery = document.getElementById('gallery')
 
 //Source: from Treehouse Unit 5 Fetch API Workshop
 //create a function to generate 12 employee cards and append to the gallery
 function generateEmployee(data){
     data.map(employee => {
     let employeeCard = `
         <div class="card">
         <div class="card-img-container">
             <img class="card-img" src=${employee.picture.medium} alt="profile picture">
         </div>
         <div class="card-info-container">
             <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
             <p class="card-text">${employee.email}</p>
             <p class="card-text cap">${employee.location.city}</p>
         </div>
     </div>
         `;
         gallery.insertAdjacentHTML('beforeend', employeeCard);
     })     
 
 
 } 
 
 /**
  * Modal Function 
  */
 
 //create a variable to grab the modal element
 let body = document.querySelector('body');
 
 //add a function to generate the modal with the detailed employee info
 function generateModal(employee){
    
     let modalInfo = `
     <div class="modal-container">
                 <div class="modal">
                     <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                     <div class="modal-info-container">
                         <img class="modal-img" src=${employee.picture.medium} alt="profile picture">
                         <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                         <p class="modal-text">${employee.email}</p>
                         <p class="modal-text cap">${employee.location.city}</p>
                         <hr>
                         <p class="modal-text">${employee.cell}</p>
                         <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                         <p class="modal-text">Birthday: ${formatDob(employee.dob.date)} </p>
                     </div>
                 </div>
     
     `;
 
     body.insertAdjacentHTML('beforeend', modalInfo);
        
    
    //create variables to grab the modal close button
    let closeBtn = document.getElementById('modal-close-btn');
    let modalContainer = document.querySelector('.modal-container')

    //Add an event listener to the close button
    closeBtn.addEventListener('click', () => {
        body.removeChild(modalContainer);
        }
        )


 //Source - Grepper - https://www.codegrepper.com/code-examples/javascript/remove+time+from+date+javascript
 //Source - Grepper -  https://www.codegrepper.com/search.php?q=split%20date
 //function to format DOB
    function formatDob(dob){
      let removeT  = dob.split('T')[0];
      let split = removeT.split('-');
      return split [1] + '/' + split [2] + '/' + split [0];   
    }      

 }
 



 
 /**
  * Open Modal Function 
  */
 
 // function to open the modal 
    function openModal(employeeData){
        //add an event listener to the gallery
        gallery.addEventListener('click', (e) =>{
            //create a variable to grab the card that was clicked
            let card = e.target.parentElement.parentElement;
            //create a variable to grab the index of the card that was clicked
            let index = Array.from(card.parentElement.children).indexOf(card);
            let employee = employeeData[index];
            generateModal(employee);
            
        })
    }



 