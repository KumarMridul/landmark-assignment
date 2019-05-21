import React, {Fragment} from 'react';

//import { Button } from 'office-ui-fabric-react/lib/Button';

const MainStyle = {
  formElement: {
    marginBottom: '20px',
    marginTop: '20px'
  },
  errorStyle: {
      color: 'red',
      fontWeight: 'bold'
  },
  gridStyle: {
      display: 'grid',
      borderBottom: '1px solid #e8e4e4',
      marginBottom: '20px'
  },
  formStyle: {
      marginBottom: '20px',
      borderBottom: '1px solid #e8e4e4'
  },
  labelStyle: {
      marginRight: '20px'
  },
  formMainStyle: {
      marginBottom: '20px'
  }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
            emailError: false
        };
        this.records = [];
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleNameChange(event) {
        this.setState({name: event.target.value});
      }
      handlePhoneChange(event) {
        this.setState({phone: event.target.value});
      }
      handleEmailChange(event) {
        this.setState({email: event.target.value});
      }
      handlePasswordChange(event) {
        this.setState({password: event.target.value});
      }
      handleTiming= () => {
        if (this.records.length>0) {
            let recordsArray = [...this.records];
            for(var i=0;i<recordsArray.length;i++) {
                let createdTime = recordsArray[i].time;
                let timeRange = new Date().toTimeString().split(' G')[0].split(':'),
                   hour = parseInt(timeRange[0]),
                   min = parseInt(timeRange[1]),
                   sec = parseInt(timeRange[2]);
                let createdTimeRange = createdTime.split(' G')[0].split(':'),
                   chour = parseInt(createdTimeRange[0]),
                   cmin = parseInt(createdTimeRange[1]),
                   csec = parseInt(createdTimeRange[2]);
               // if (hour !== 0) {
                let diffhour = `${hour - chour} hours`,
                     diffmin = `${min - cmin} minutes`,
                     diffsec =  `${sec - csec} seconds ago`;
                     recordsArray[i].time = `${diffhour} ${diffmin} ${diffsec}`;    
            //     }
            //     else {
            //         if ((hour - chour) < 0)
            //     }    
            // }
        }
         this.records = recordsArray;
      }
    }  
      handleSubmit(event) {
        event.preventDefault();  
        debugger;
        let emailFound = false;
        for(var i=0;i<this.records.length;i++) {
            if(this.records[i].email === this.state.email) {
                emailFound = true;
                break;
            }
        }
        if (!emailFound) {
            this.records = [...this.records, { time: new Date().toTimeString(), name: this.state.name, phone: this.state.phone, email: this.state.email, password: this.state.password, id: (parseInt(Math.random()*111)).toString()}];
            this.setState(({
                emailError: false
            }),() => {
                alert('Record successfully added!!');
            })

        }
        else {
            this.setState({
                emailError: true 
            })
        }
      }       
  render(){
    const {view, timing} = this.props; 
    if (timing) {
        this.handleTiming();
    }
  return ( 
  <Fragment>
        {
           view === 'form' ? 
           <div style={MainStyle.formStyle}> 
            <form onSubmit={this.handleSubmit} style= {MainStyle.formMainStyle}>
                <div style= {MainStyle.formElement}>
                    <label style={MainStyle.labelStyle}>Name</label>
                    <span><input type="text" name="name" value={this.state.name} placeholder="Enter Name" onChange={this.handleNameChange}/></span>
                </div>
                <div style= {MainStyle.formElement}>
                    <label style={MainStyle.labelStyle}>Phone</label>
                    <span><input type="tel" name="phone" value={this.state.phone} placeholder="Enter Phone" onChange={this.handlePhoneChange}/></span>
                </div>
                <div style= {MainStyle.formElement}>
                    <label style={MainStyle.labelStyle}>Email</label>
                    <span><input type="email" name="name" value={this.state.email} placeholder="Enter Email" onChange={this.handleEmailChange}/></span>
                    {this.state.emailError && <div style= {MainStyle.errorStyle}>Email id already exists</div>}
                </div>
                <div style= {MainStyle.formElement}>
                    <label style={MainStyle.labelStyle}>Password</label>
                    <span><input type="password" name="name" value={this.state.password} placeholder="Enter Password" onChange={this.handlePasswordChange}/></span>
                </div>
                <input type="submit" value="Submit" />
                </form>
        </div>: 
      <div style={MainStyle.gridStyle}>
        { this.records.length > 0 && 
        <table className="table">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>Time</th>
            </tr>
        </thead>
        <tbody>
            {this.records.map((record, index) => {
                return (<tr key={index}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.phone}</td>
                    <td>{record.email}</td>
                    <td>{record.password}</td>
                    <td>{record.time}</td>
                </tr>)
            })}
        </tbody>
        </table>
        }
      </div>
        }
   </Fragment> 
  )
}
}


export default Main;