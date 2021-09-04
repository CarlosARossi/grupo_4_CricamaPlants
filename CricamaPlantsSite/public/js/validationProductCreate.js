window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    
    form.addEventListener("submit", function(event){
        //event.preventDefault();

        let errors = []

        let name = document.querySelector("input[name='name']");
        let description = document.querySelector("input[name='description']");
        let image = document.querySelector("input[name='image']");
        let category = document.querySelector("input[name='category']");
        let price = document.querySelector("input[name='price']");

        if(name.value == ""){
            errors.push("El campo nombre no debe estar vacío");
        }else if(name.value.length < 3){
            errors.push("El nombre es muy corto");
        }
        if(description.value == ""){
            errors.push("Agrega una descripción");
        }else if(description.value.length < 15){
            errors.push("La descripción es muy corta");
        }
        if(image.value == ""){
            errors.push("Agrega una imagen");
        }
        if(category.value == ""){
            errors.push("Define una categoría");
        }
        if(price.value == ""){
            errors.push("Ingrese el valor, o es gratis?");
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