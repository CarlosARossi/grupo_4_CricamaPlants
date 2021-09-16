window.addEventListener('load', function(){
    console.log('shopCart!');
    let quantity = document.querySelectorAll("input[name='quantity']");
    let price = document.querySelectorAll(".price");
    let form = document.querySelectorAll(".quantityForm");


    form.forEach(item=>{
        item.addEventListener('submit', function(e){
            quantity.addEventListener('change',this,false)
        })
    })
 /*    quantity.forEach(item => {
    
        item.addEventListener("change", function(e){
            console.log('send');
            form.addEventListener("submit",this,false)
            console.log("click",e.target.dataset.product);
        })
    }) */


})