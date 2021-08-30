window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    
    let email = document.querySelector("input[name='email']");
    let password = document.querySelector("input[name='password']");
    
    let errors = []

    form.addEventListener("submit", function(event){
        
        if(email.value == ""){
            errors.push("El campo email no debe estar vacío");
        }
        if(password.value == ""){
            errors.push("El campo contrasena no debe estar vacío");
        }
        if (errors.length > 0){
            event.preventDefault();
            let ulErrors = document.querySelector('div.errors ul');
            for(let i = 0; i < errors.length; i++){
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            }
        }
    });

})  