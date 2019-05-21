import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      show: 'form',
      handleTiming: false
    } 
  }
  selectedView = (selected) => {
    if(selected === 'view'){
      this.setState({
        show: selected,
        handleTiming: true
      })
    }
    else {
      this.setState({
        show: selected
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <Main view={this.state.show} timing={this.state.handleTiming}/>
        <Footer selected={this.selectedView}/>
      </div>
    );
  }
  
}

export default App;
