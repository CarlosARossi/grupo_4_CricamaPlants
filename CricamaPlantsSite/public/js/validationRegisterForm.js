window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    
    form.addEventListener("submit", function(event){
        //event.preventDefault();

        let errors = []

        let firstName = document.querySelector("input[name='firstName']");
        let lastName = document.querySelector("input[name='lastName']");
        let email = document.querySelector("input[name='email']");
        let image = document.querySelector("input[name='image']");
        let password = document.querySelector("input[name='password']");
        let passwordConfirm = document.querySelector("input[name='passwordConfirm']");

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
            errors.push("Agrega una imagen");
        }
        if(password.value == ""){
            errors.push("Te falta una contraseña");
        }
        if(passwordConfirm.value == ""){
            errors.push("Tenes que repetir la contraseña");
        }
        if (errors.length > 0){
            event.preventDefault();
            let ulErrors = document.querySelector('div.errors ul');
            ulErrors.innerHTML = '';
            for(let i = 0; i < errors.length; i++){
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            }
            /*  errors.forEach(error => {
                ulErrors.innerHTML += `<li>${error}</li>`
            }); */
        }
    });

})  