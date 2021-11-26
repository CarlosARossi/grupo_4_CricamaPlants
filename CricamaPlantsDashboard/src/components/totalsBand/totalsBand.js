// import de react
import React, { useState, useEffect } from 'react';     

// import css
import './totalsBand.css';

// import components
import Total from '../total/Total';

function TotalsBand() {

    // Estado de todos los productos y de cada categoría
    const [products, setProducts] = useState([]);
    const [insumos, setInsumos] = useState(0);
    const [macetas, setMacetas] = useState(0);
    const [plantas, setPlantas] = useState(0);

    // Estado de todos los usuarios
    const [users, setUsers] = useState([]);

    // useEffect DidMount
    useEffect(() => {

        console.log('%cSe montó el componente', 'color: green');

        const urlProducts = 'http://localhost:3000/api/products/';
        const urlUsers = 'http://localhost:3000/api/users/';

        const fetchData = async () => {
            try {

                // fetch products
                const productsQuery = await fetch(urlProducts).then(response => response.json());
                //console.log('productsQuery', productsQuery);

                setProducts(productsQuery);
                setInsumos(productsQuery.countByCategory.insumos);
                setMacetas(productsQuery.countByCategory.macetas);
                setPlantas(productsQuery.countByCategory.plantas);

                // fetch users
                const usersQuery = await fetch(urlUsers).then(response => response.json());
                //console.log("usersQuery", usersQuery);

                setUsers(usersQuery);
                //console.log("users", users);

            } catch (e) { console.log(e) };
        }

        fetchData();
        //console.log("products", products);

    }, [])

    // useEffect willUnmount
    useEffect(() => {
        return () => console.log('%cSe desmontó el componente', 'color: red');
    }, []);




    return (
        <div id='div-totales'>
            {/*Condicional total products*/}
            {
                (products.length === 0) && <p>Cargando...</p>
            }
            {
                <Total color={'borderBlue'} name={'Productos:'} quantity={products.count} />
            }

            {/*Condicional total Insumos*/}
            {
                (insumos === 0) && <p>Cargando...</p>
            }
            {
                <Total color={'borderYellow'} name={'Insumos:'} quantity={insumos} />
            }

            {/*Condicional total macetas*/}
            {
                (macetas === 0) && <p>Cargando...</p>
            }
            {
                <Total color={'borderRed'} name={'Macetas:'} quantity={macetas} />
            }

            {/*Condicional total plantas*/}
            {
                (plantas === 0) && <p>Cargando...</p>
            }
            {
                <Total color={'borderGreen'} name={'Plantas:'} quantity={plantas} />
            }
            
            {/*Condicional total users*/}
            {
                (users.length === 0) && <p>Cargando...</p>
            }
            {
                <Total color={'borderViolet'} name={'Usuarios:'} quantity={users.count} />
            }
        </div>
    )
}

export default TotalsBand;