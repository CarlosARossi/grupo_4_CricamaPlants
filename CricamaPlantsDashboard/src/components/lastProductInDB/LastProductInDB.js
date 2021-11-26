// import de react
import React, { useState, useEffect } from 'react';

// import css
import './LastProductInDB.css'


function LastProductInDB(props) {

    //const [products, setProducts] = useState([]);
    const [lastProduct, setLastProduct] = useState({});

    // useEffect DidMount
    useEffect(() => {

        console.log('%cSe montó el componente', 'color: green');

        const urlProducts = 'http://localhost:3000/api/products/';

        const fetchData = async () => {
            try {

                // fetch products
                fetch(urlProducts)
                    .then(response => response.json())
                    .then(data => {

                        //setProducts((data.data));
                        /* console.log(data.products[data.products.length - 1].id); */

                        const urlLastProduct = `http://localhost:3000/api/products/${data.products[data.products.length - 1].id}`//probar con [-1]

                        fetch(urlLastProduct)
                            .then(response2 => response2.json())
                            .then(data2 => {
                                setLastProduct(data2);
                                /* console.log(lastProduct.data.name); */

                            })

                    })

            } catch (e) { console.log(e) };
        }

        fetchData();
        //console.log("lastProduct2",products[products.length-1]);
        //console.log("products", products);
        //console.log("lastProduct", lastProduct);
        //console.log("nameLastProduct", lastProduct.detail[0].name);

    }, [])


    useEffect(() => {
        return () => console.log('%cSe desmontó el componente', 'color: red');
    }, [])


    return (
            <article class="articleMain">
                <a href={(lastProduct.data) ? 'http://localhost:3000/productDetail/'+ (lastProduct.data.id_product) : <p>Cargando...</p>  }>
                    <figure>
                        <img class='image' src={(lastProduct.data) ? (lastProduct.data.image) : <h5>Cargando...</h5>} alt="Product" />
                    </figure>
                    <section class="box-article">
                        <p class="price">Ultimo Producto:</p>
                        {
                            (lastProduct.data) ? <p class="name">{lastProduct.data.name}</p> : <p class="name">Cargando...</p>
                        }
                        <p>Privilegios del producto:</p>
                        <ul id='second-section-ul-lastMovieIn'>
                            {(lastProduct.detail && lastProduct.detail.length > 0) ? (lastProduct.detail[0].info_category.privileges.map((p, i) => {
                            return <li key={i}>{p.privilege}</li>
                            })) : <h5>Cargando...</h5>}
                        </ul>
                    </section>
                </a>
            </article>
    )
}

export default LastProductInDB;