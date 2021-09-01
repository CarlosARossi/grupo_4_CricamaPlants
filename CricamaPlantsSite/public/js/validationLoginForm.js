window.addEventListener('load', function(){

    let form = document.querySelector('.form');

    form.addEventListener("submit", function(event){
        
        let errors = [];

        let email = document.querySelector("input[name='email']");
        let password = document.querySelector("input[name='password']");

        if(email.value == ""){
            errors.push("Te falta el email");
        }
        if(password.value == ""){
            errors.push("Te falta la contraseña");
        }
        if (errors.length > 0){
            event.preventDefault();
            let ulErrors = document.querySelector('div.errors ul');
            ulErrors.innerHTML = '';
            /* for(let i = 0; i < errors.length; i++){
                ulErrors.innerHTML += "<li>" + errors[i] + "</li>"
            } */
            errors.forEach(error => {
                ulErrors.innerHTML += `<li>${error}</li>`
            });
        }
    });

})  