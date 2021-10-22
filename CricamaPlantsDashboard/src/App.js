import React from 'react';
import './App.css';
import './components/topBar/topBar.css';
import './components/centerBar/centerBar.css';
import './components/bottomBar/bottomBar.css';
import './components/header/header.css'
import './components/footer/footer.css'
import './components/User.js';
import TopBar from './components/topBar/TopBar';
import CenterBar from './components/centerBar/CenterBar';
import BottomBar from './components/bottomBar/BottomBar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import User from './components/User';


function App(props) {
  return (
    
    <React.Fragment>

      <Header />
      
      <div className="app">
          
          <div className="topBar">
            <TopBar />
          </div>

          <div className="centerBar">
            <CenterBar />
          </div>

          <div className="bottomBar">
            <BottomBar />
          </div>

          <div className="bottomBar">
            <User />
          </div>

      </div>

      <Footer />

    </React.Fragment>
  );
}

export default App;
