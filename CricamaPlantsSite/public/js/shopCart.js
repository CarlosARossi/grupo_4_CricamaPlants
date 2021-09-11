window.addEventListener('load', function(){
    console.log('shopCart!');
    let quantity = document.querySelectorAll("input[name='quantity']");
    let price = document.querySelectorAll(".price");
    console.log(quantity);
    console.log(price);

    quantity.forEach(item => {
    
        item.addEventListener("click", function(){
        console.log("click");
        price.innerText = 'lalala';
    console.log(price);
        })
    })


})