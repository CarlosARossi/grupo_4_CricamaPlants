import React from 'react';
import './App.css';
import './topBar/topBar.css';
import './centerBar/centerBar.css';
import './bottomBar/bottomBar.css';
import './header/header.css'
import './User.js';
import TopBar from './topBar/TopBar';
import CenterBar from './centerBar/CenterBar';
import BottomBar from './bottomBar/BottomBar';
import Header from './header/Header';
import User from './User';


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

      

      

    </React.Fragment>
  );
}

export default App;
