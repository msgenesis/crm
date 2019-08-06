import React, { Component } from 'react';
import { Button, Card, CardBody, FormGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Label } from 'reactstrap';
// import firebase from '../../Config/Firebase/firebase'
// import admin from 'firebase-admin-auth';
import { getUser } from '../../store/Actions/action'
import { connect } from 'react-redux';
import Axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPass: "",
      role: "Select",
      error: "",
      color: ""
    }
    this.Register = this.Register.bind(this)
  }
  Register() {
    let { username, email, password, repeatPass, role } = this.state;
    let that = this;
    if (username === "" && email === "" && password === "" && repeatPass === "" && role === "Select") {
      this.setState({
        error: "Please Fill The Forms",
        color: "red"
      })
      setTimeout(() => {
        this.setState({
          error: "",
          color: ""
        })
      }, 4000)
    } else {
      let user={
        email: `${username}@gmail.com`,
        emailVerified: false,         
        password: password,           
       username: username,            
       customClaims: role             
      }
      Axios({
        url:'/createUser',
        method:'post',
        data:user,
        withCredentials:true
      })
      .then(data=>{
        if (data.data.save){

          that.setState({
            username: "",
            email: "",
            password: "",
            repeatPass: "",
            role: "Select",
            error: "Successfully created new user ✓",
            color: "green",
            
          })

        }
        else{
          that.setState({
            error: "Could not proceed with the request X",
            color: "red",
           
          })
        }
      })
      // admin.auth().createUser({
      //   email: `${username}@gmail.com`,
      //   emailVerified: false,         
      //   password: password,           
      //   username: username,                
      //   customClaims: role               
      // })
      //   .then(function (userRecord) {
      //     let userData = {
      //       username: username,
      //       email: email,
      //       password: userRecord.passwordHash,
      //       role: role,
      //       uid: userRecord.uid
      //     }
      //     console.log(userRecord)
      //     firebase.database().ref('/').child(`Users/${userData.role}/${userData.uid}`).set(userData)
          // that.setState({
          //   error: "Successfully created new user ✓",
          //   color: "green"
          // })
      //   })
      //   .catch(function (error) {
      //     that.setState({
      //       error: error.message,
      //       color: "red"
      //     })
      //   });
    }
  }
  // listAllUsers(nextPageToken) {
  //   // List batch of users, 1000 at a time.
  //   admin.auth().listUsers(1000, nextPageToken)
  //     .then(function (listUsersResult) {
  //       listUsersResult.users.forEach(function (userRecord) {
  //         console.log("user", userRecord.toJSON());
  //       });
  //       if (listUsersResult.pageToken) {
  //         // List next batch of users.
  //         this.listAllUsers(listUsersResult.pageToken)
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error listing users:", error);
  //     });
  // }
  // componentWillMount() {
  //   this.listAllUsers();
  //   let user = firebase.auth().currentUser
  //   let agent = "Admin"
  //   this.props.getUser(user, agent)
  // }
  render() {
    return (
      <div className="align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12" lg="10" xl="12">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create User account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Username" autoComplete="username" onChange={e => this.setState({ username: e.target.value })} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" autoComplete="email" onChange={e => this.setState({ email: e.target.value })} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" autoComplete="new-password" onChange={e => this.setState({ password: e.target.value })} />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" autoComplete="new-password" onChange={e => this.setState({ repeatPass: e.target.value })} />
                  </InputGroup>
                  <FormGroup>
                    <Label htmlFor="ccmonth">Select Role</Label>
                    <Input type="select" name="ccmonth" id="ccmonth" onChange={e => this.setState({ role: e.target.value })}>
                      <option value="Select">Select</option>
                      <option value="Closer">Closer</option>
                      <option value="Agent">Agent</option>
                    </Input>
                  </FormGroup>
                  <Button color="primary" block onClick={this.Register}>Create Account</Button>
                  <div style={{ textAlign: 'center', marginTop: 20, color: this.state.color }}>
                    <h6>{this.state.error}</h6>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProp(state) {
  return ({
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    getUser: (user, agent) => { dispatch(getUser(user, agent)) }
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(Register);
