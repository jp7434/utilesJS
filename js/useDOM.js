/**
 * Run code after page load
*/

document.addEventListener("DOMContentLoaded", function() {
    // ...
});

/**
 * Modal use
*/

var myModal = document.querySelector('#idModal');

var modal = new bootstrap.Modal(myModal, {
    keyboard: false, // true to close modal with Esc key
    focus: false, // true for focus in modal when starting it
    backdrop: true, // true to allow exiting the modal on click away
});

modal.toggle();
modal.show();
modal.hide();
    
myModal.addEventListener('show.bs.modal', function (){ // When showing modal
    // ...
})

myModal.addEventListener('shown.bs.modal', function (){ // After displaying the modal
    // ...
})

myModal.addEventListener('hide.bs.modal', function (){ // When closing the modal
    // ...
})

myModal.addEventListener('hidden.bs.modal', function (){ // After closing the modal
    // ...
})

/**
 * Check if any of the values are in the variable
*/

if([valor1, valor2].includes(elemento.value)){
    // ..
}

/**
 * Get values of non-iterable object
*/

const data = {
    name: ['John'],
    lastName: ['Doe']
}

for(const [key, value] of Object.entries(data)){
    console.log(key, value[0]);
}
