import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function Header(props) {
    return (

        <header>

            <section id='menuNav'>
                <ul className='mainNav'>
                    <li><p>Plantas</p>
                        <ul>
                            <li><p>Interior</p></li>
                            <li><p>Exterior</p></li>
                        </ul>
                    </li>
                    <li><p>Insumos</p>
                        <ul>
                            <li><p>Herramientas</p></li>
                            <li><p>Fertilizantes</p></li>
                        </ul>
                    </li>
                    <li><p>Macetas</p>
                        <ul>
                            <li><p>Cuadradas</p></li>
                            <li><p>Redondas</p></li>
                        </ul>
                    </li>
                    <li><p>Productos</p></li>
                    <li><p>Contacto</p></li>
                </ul>

            </section>
            
            <FaShoppingCart className="shopCar"/>
            <FaSearch className="search"/>
            

            <form action="/searchProduct" method="post" className="search">    
                <input 
                    type="text" 
                    name="search" 
                    placeholder="Buscar productos, marcas" 
                    class="searchBar"
                />
            </form>

        </header>
    )
}

export default Header;