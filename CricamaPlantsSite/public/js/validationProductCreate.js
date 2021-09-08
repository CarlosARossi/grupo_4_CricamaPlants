window.addEventListener('load', function(){

    let form = document.querySelector('.form');
    
    form.addEventListener("submit", function(event){
        //event.preventDefault();

        let errors = [];

        let name = document.querySelector("input[name='name']");
        let description = document.querySelector("textarea[name='description']");
        let image = document.querySelector("input[name='image']");
        let category = document.querySelector("select[name='category']");
        let price = document.querySelector("input[name='price']");
        let quantity = document.querySelector("input[name='quantity']");

        if(name.value == ""){
            errors.push("Agrega un nombre");
        }else if(name.value.length < 3){
            errors.push("El nombre es muy corto, mínimo 3 caracteres");
        }
        if(description.value == ""){
            errors.push("Agrega una descripción");
        }else if(description.value.length < 15){
            errors.push("La descripción es muy corta, mínimo 15 caracteres");
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
        if(quantity.value == ""){
            errors.push("Ingrese una cantidad, aunque sea 0");
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