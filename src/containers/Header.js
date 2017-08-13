import React from 'react';
import '../components/App.css';

const Header = () => {
  return (
    <div>
        <header className="b-root__header">
          <div className="header__item header__item_jobup">JobUp</div>
          <div className="header__item header__item_dashboard">Dashboard</div>
          <div className="header__item header__item_history">History</div>
          <div className="header__item header__item_profile">Profile</div>
        </header>
    </div>
  )
}

export default Header
