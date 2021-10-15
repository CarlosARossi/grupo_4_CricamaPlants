import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faEnvelope, faMapMarkerAlt, faMobileAlt} from '@fortawesome/free-solid-svg-icons'
import {faCcVisa, faCcMastercard, faCcPaypal, faInstagram, faYoutube, faFacebookSquare} from '@fortawesome/free-brands-svg-icons'

function Footer(props) {
    return (
    <footer>
        <section className="footerContent">
            <p id="brandFooter">Cricama Plants</p>
        </section>

        <section className="footerContent">
            <h2 className='footerTitle'>Navegación</h2>

            <ul className='footerNav'>
                <li><a href='/products/plantas'>Plantas</a></li>
                <li><a href='/products/insumos'>Insumos</a></li>
                <li><a href='/products/macetas'>Macetas</a></li>
                <li><a href='/contact'>Conócenos</a></li>
            </ul>
        </section>

        <section className="footerContent">
            <h2 className='footerTitle'>Contactanos</h2>
            <ul className='footerContact'>
                <li><FontAwesomeIcon icon={faMobileAlt} className="iconContact"/> <a href="https://api.whatsapp.com/send?phone=+5491133907970">011-3390-7970</a></li>
                <li><FontAwesomeIcon icon={faMapMarkerAlt} className="iconContact"/> <p>Avenida Siempreviva 742</p></li>
                <li><FontAwesomeIcon icon={faEnvelope} className="iconContact"/> <a href="mailto:cricamaplants@gmail.com?Subject=Consulta%20vía%20web">cricamaplants@gmail.com</a></li>
                <li><FontAwesomeIcon icon={faClock} className="iconContact"/> <p>Lun a Vie 9:30 a 18:30hs</p></li>
            </ul>
        </section>

        <section className="footerContent">
            <h2 className='footerTitle'>Medios de pago</h2>
            <ul className="iconPay">    
                <li><FontAwesomeIcon icon={faCcVisa}/></li>
                <li><FontAwesomeIcon icon={faCcMastercard}/></li>
                <li><FontAwesomeIcon icon={faCcPaypal}/></li>
            </ul>
        </section>

        <section className="footerContent">
            <h2 className='footerTitle'>Redes sociales</h2>
            <ul className="iconSocial">
                <li><FontAwesomeIcon icon={faInstagram}/></li>
                <li><FontAwesomeIcon icon={faFacebookSquare}/></li>
                <li><FontAwesomeIcon icon={faYoutube}/></li>
            </ul>    
        </section>

        <p id='copyright'>Copyright © 2021-2021 CriCaMa Plants</p>
    </footer>
    )
}

export default Footer;