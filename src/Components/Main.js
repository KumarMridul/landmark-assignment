import React, {Fragment} from 'react';

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

class Main extends React.PureComponent {
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
        this.timedRecords = [];
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
            let recordsArray = JSON.parse(JSON.stringify(this.records));
            for(var i=0;i<recordsArray.length;i++) {
                let createdTime = recordsArray[i].time;
                let timeRange = this.displayCurrentTime().split(':'),
                   hour = parseInt(timeRange[0]),
                   min = parseInt(timeRange[1]);
                let createdTimeRange = createdTime.split(':'),
                   chour = parseInt(createdTimeRange[0]),
                   cmin = parseInt(createdTimeRange[1]);
              
                let diffhour = hour - chour,
                     diffmin = min - cmin;
                if(diffhour === 0) {
                    recordsArray[i].time = `${diffmin} minute ago`; 
                }

                if (diffhour > 0) {
                    recordsArray[i].time = `${diffhour} hour ago`; 
                }

                if(diffmin === 0) {
                    recordsArray[i].time = `just now`;
                }
        }
         this.timedRecords = recordsArray;
      }
    }
    displayCurrentTime() {
        var date = new Date();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return (hours + ":" + minutes + ":" + seconds);
    }; 
      handleSubmit(event) {
        event.preventDefault();  
        let emailFound = false;
        for(var i=0;i<this.records.length;i++) {
            if(this.records[i].email === this.state.email) {
                emailFound = true;
                break;
            }
        }
        if (!emailFound) {
            this.records = [...this.records, { time: this.displayCurrentTime(), name: this.state.name, phone: this.state.phone, email: this.state.email, password: this.state.password, id: (parseInt(Math.random()*111)).toString()}];
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
      {this.timedRecords.length === 0 && <div> No Records Submitted</div>}
        { this.timedRecords.length > 0 && 
        <table className="table">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>Created Time</th>
            </tr>
        </thead>
        <tbody>
            {this.timedRecords.map((record, index) => {
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