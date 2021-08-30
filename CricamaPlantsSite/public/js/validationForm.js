 window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    let firstName = document.querySelector("input[name='firstName']");
    let lastName = document.querySelector("input[name='lastName']");
    let email = document.querySelector("input[name='email']");
    let image = document.querySelector("input[name='image']");
    let password = document.querySelector("input[name='password']");
    let passwordConfirm = document.querySelector("input[name='passwordConfirm']");

    let errors = []

    form.addEventListener("submit", function(event){
        //event.preventDefault();
        if(firstName.value == ""){
            errors.push("El campo nombre no debe estar vacío");
        }
        if(lastName.value == ""){
            errors.push("El campo apellido no debe estar vacío");
        }
        if(email.value == ""){
            errors.push("El campo email no debe estar vacío");
        }
        if(image.value == ""){
            errors.push("Pon una imagen");
        }
        if(password.value == ""){
            errors.push("El campo contrasena no debe estar vacío");
        }
        if(passwordConfirm.value == ""){
            errors.push("coloca la misma contrasena");
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