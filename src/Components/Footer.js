import React from 'react';
import { Button } from 'office-ui-fabric-react/lib/Button';

const FooterStyle = {
    container: {
        display: 'inline-block'
    },
    button: {
        float: 'left',
        marginRight: '20px'
    }
  }

class Footer extends React.Component {

  formClicked = () => {
      this.props.selected('form');
  }
  viewClicked = () => {
    this.props.selected('view');
  }
  render() {
    return (<div align="center" style={FooterStyle.container}>
        <Button style={FooterStyle.button} onClick={this.formClicked}>Form</Button>
        <Button onClick={this.viewClicked}>View</Button>
        </div>);
  }
 
}

export default Footer;