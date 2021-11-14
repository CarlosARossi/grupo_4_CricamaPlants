// import de React
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import css
import './App.css';

import '../topBar/topBar.css';
import '../centerBar/centerBar.css';
import '../header/header.css'
import '../footer/footer.css'
import '../User.js';


// import components
import TotalesBox from '../totalesBox/TotalesBox';
import TopBar from '../topBar/TopBar';
import CenterBar from '../centerBar/CenterBar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import User from '../User';


function App(props) {
  return (

    <React.Fragment>
      <Header />

      <div className="app">
          <div className="TotalesBox"><TotalesBox /></div>

          <div className="topBar"><TopBar /></div>

          <div className="centerBar"><CenterBar /></div>

          <div className=""><User /></div>

      </div>

      <Footer />

    </React.Fragment>
  );
}


export default App;
