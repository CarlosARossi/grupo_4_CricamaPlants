window.addEventListener('load', function(){

    let quantityForm = document.querySelectorAll(".quantityForm");

    quantityForm.forEach(form=>{

        form.querySelector("input[name='quantity']").addEventListener('change', (e) => {

            const target = e.target;
            const value = target.value;
            const form = target.parentElement.parentElement;

            if(value !== null && value >= 1){
                form.submit()
            }

        })

    })

})