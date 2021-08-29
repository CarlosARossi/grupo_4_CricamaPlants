window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    let firstName = document.querySelector("input[name='firstName']");
    let lastName = document.querySelector("input[name='lastName']");


    form.addEventListener("submit", function(event){
        event.preventDefault();
        if(firstName.value == ""){
            alert("El campo nombre no debe estar vacío");
        }
        if(lastName.value == ""){
            alert("El campo apellido no debe estar vacío");
        }
    });

})