
import React from 'react';
import logo from '../logo.png';

const HeaderStyle = {
  header: {
    display: 'block',
    borderBottom: '1px solid #e8e4e4',
    paddingBottom: '20px',
    paddingTop: '20px'
  },
  headerHeading: {
    display: 'inline-block',
    marginLeft: '-50px'
  },
   logo : {
      float: 'left',
      height: '3.5rem',
      paddingRight: '30px'
   }
}
function Header() {
  return (
    <div style={HeaderStyle.header}>
    <img style={HeaderStyle.logo} src={logo} alt="Logo" />
    <h1 style={HeaderStyle.headerHeading}>  My Company</h1>
    </div>
    )
}

export default Header;