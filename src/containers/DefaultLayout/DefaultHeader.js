import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavLink, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import Axios from 'axios';
import History from '../../history'
import { connect } from 'react-redux';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/loader.gif'
import sygnet from '../../assets/img/Final.gif'
import User from '../../assets/img/brand/user.png'
// import firebase from '../../Config/Firebase/firebase'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  logOut() {
      Axios({
        withCredentials:true,
        method:'get',
        url:"/logout",
      
      })
      .then(data=>{
      console.log(data.data);
      if(data.data.logout){
        History.push('/login')
        window.location.reload();
      }
      })  
    // console.log("logout")
    // var today = new Date();
    // var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    // var time = today.getHours() + ":" + today.getMinutes()
    // firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     if (user.email === "admin@genesis.com") {
    //       firebase.auth().signOut().then(function () {
    //         window.location = "/login";
    //       }).catch(function (error) {
    //         // An error happened.
    //       });
    //     }
    //     else {
    //       firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("offline")
    //         .then(() => {
    //           firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/logoutTime`).set(time)
    //             .then(() => {
    //               firebase.auth().signOut().then(function () {
    //                 window.location = "/login";
    //               }).catch(function (error) {
    //                 // An error happened.
    //               });
    //             })
    //         })
    //     }

    //   } else {

    //   }
    // });

  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    console.log(this.props)
    let Admin = "Unknown"
    // console.log("Username=====>>",this.props.username)
    // console.log("User=====>>",this.props.user)
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 160, height: 53, alt: 'Genesis Logo', padding: "10px" }}
          minimized={{ src: sygnet, width: 58, height: 40, alt: 'Gnesis Logo' }}
          style={{ padding: "15px" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">{this.props.user.username}: <strong>{this.props.user.email === "" ? Admin : this.props.user.username}</strong> </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={User} className="img-avatar" alt="admin" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem> */}
              <DropdownItem onClick={this.logOut.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler  /> */}
        <AppAsideToggler mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
function mapStateToProp(state) {
  return ({
    username: state.root.user
  })
}
function mapDispatchToProp(dispatch) {
  return ({

  })
}
export default connect(mapStateToProp, mapDispatchToProp)(DefaultHeader);

