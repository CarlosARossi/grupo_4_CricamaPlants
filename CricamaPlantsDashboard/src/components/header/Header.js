import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser ,faSearch, faTimes, faBars} from '@fortawesome/free-solid-svg-icons'

function Header(props) {
    return (

        <header>
            
            <a href='http://localhost:3000'><img className='logo' src="/img/designs/Logo-F5E078.png" alt="Logo CriCaMa"/></a>

            <section id='menuNav'>
                <ul className='mainNav'>
                    <li><a href='http://localhost:3000/products/plantas'>Plantas</a>
                        {/* <ul>
                            <li><a href=''>Interior</a></li>
                            <li><a href=''>Exterior</a></li>
                        </ul> */}
                    </li>
                    <li><a href='http://localhost:3000/products/insumos'>Insumos</a>
                        {/* <ul>
                            <li><a href=''>Herramientas</a></li>
                            <li><a href=''>Fertilizantes</a></li>
                        </ul> */}
                    </li>
                    <li><a href='http://localhost:3000/products/macetas'>Macetas</a>
                        {/* <ul>
                            <li><a href=''>Cuadradas</a></li>
                            <li><a href=''>Redondas</a></li>
                        </ul> */}
                    </li>
                    <li><a href='http://localhost:3000/contact'>Conócenos</a></li>
                </ul>

                <ul className='iconsNav'>
                    
                    <li><a href='http://localhost:3000/shopCart'><FontAwesomeIcon icon={faShoppingCart}/></a></li>
                    {/* <% if(isLogged){ %> 
                        <li><a href='/userProfile/<%=isLogged ? userLogged.id_user : null%>'><img className='avatar' src="<%=userLogged.image%>" alt="avatar"></a>
                            <ul>
                                <li><a href='/userProfile/<%=isLogged ? userLogged.id_user : null%>'><i className="fas fa-address-card"></i> Mi Perfil</a></li>
                                <li><a href='/logout'><i className="fas fa-sign-out-alt"></i> Salir</a></li>
                            </ul>
                        </li>
                    <% }else{ %>  */}
                        <li><a href='http://localhost:3000/login'><FontAwesomeIcon icon={faUser}/></a></li>
                    {/* y */} 
                </ul>

                <a href='/' id='exitMenu'><FontAwesomeIcon icon={faTimes}/></a>
            </section>

            <form action="/searchProduct" method="post" className="search">    
                <FontAwesomeIcon icon={faSearch}/>
                <input 
                    type="text" 
                    name="search" 
                    placeholder="Buscar productos, marcas" 
                    className="searchBar"
                />
            </form>

            <a href='#menuNav' id='burgerMenu'><FontAwesomeIcon icon={faBars}/></a>

        </header>
    )
}

export default Header;