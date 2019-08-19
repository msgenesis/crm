import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'
import Agent from '../../assets/img/brand/agent.png'
import axios from 'axios'
// import firebase from '../../Config/Firebase/firebase'
// import admin from 'firebase-admin-auth';
import './style.css'
const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class AdminDefaultAside extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            agentList: [],
            AllUsers: [],
            checked: false,
            ip: "",
            ipList:{ip:["123.123.123.123"]}
        };
        this.toggle = this.toggle.bind(this);
        this.getIP = this.getIP.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    componentDidMount(nextPageToken) {
    //     var today = new Date();
    //     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //     firebase.database().ref('/').child(`AgentAvtivity/${date}`).on('value', (data) => {
    //         this.setState({
    //             agentList: []
    //         })
    //         for (var key in data.val()) {
    //             this.state.agentList.push(data.val()[key])
    //             this.setState({
    //                 agentList: this.state.agentList
    //             })
    //         }
    //     })
    //     let that = this;
    //     admin.auth().listUsers(1000, nextPageToken)
    //         .then(function (listUsersResult) {
    //             listUsersResult.users.forEach(function (userRecord) {
    //                 that.state.AllUsers.push(userRecord.toJSON())
    //                 that.setState({
    //                     AllUsers: that.state.AllUsers
    //                 })
    //             });
    //             if (listUsersResult.pageToken) {

    //             }
    //         })
    //         .catch(function (error) {
    //             console.log("Error listing users:", error);
    //         });
        this.getIP()
    }


    handleChange(i, checked, uid) {
        console.log(i, checked)
        console.log(checked)
        if (checked === true) {
            admin.auth().updateUser(uid, {
                disabled: true
            })
                .then(function (userRecord) {
                    // firebase.database().ref("blacklist").child(uid).set(true);
                })
                .catch(function (error) {
                    console.log("Error updating user:", error);
                });
        } else {
            admin.auth().updateUser(uid, {
                disabled: false
            })
                .then(function (userRecord) {
                    // firebase.database().ref("blacklist").child(uid).set(false);
                })
                .catch(function (error) {
                    console.log("Error updating user:", error);
                });

        }
    }
    getIP() {
        // firebase.database().ref('/').child(`AccessIP`).on('child_added', (data) => {
        //         this.state.ipList.push(data.val())
        //         this.setState({
        //             ipList: this.state.ipList
        //         })
        // })
        axios.get('/accessIp')
        .then( res => {
            console.log(res.data)
        //   this.setState({ipList:res.data})
        })
        .catch( err =>{
          console.log(err)
        });
      
    }
    addNewIp() {
        let {ipList,ip} =this.state
        if (ip !== "") {
        ipList.ip.push(ip)
        this.setState({ipList})
        
        axios.patch(`/accessIp/${ipList._id}`,{
           ip: ipList.ip
        })
        .then( res =>{
            console.log(res)
        })
        .catch( err => {
            console.log(err)
        });
            // firebase.database().ref('/').child(`AccessIP/${format}`).set({ ip: this.state.ip, access: true })
            //     .then(() => {
            //         this.setState({
            //             ip: ""
            //         })
            //     })
        }
    }
    deleteIP(id) {
        // let format = ip.split('.').join('');
        // firebase.database().ref('/').child(`AccessIP/${format}`).remove();
        // this.state.ipList.splice(i, 1)
        // this.setState({
        //     ipList: this.state.ipList
        // })
        let {ipList} =this.state
        const newip= ipList.ip.filter((ip,i)=> i!==id )
        ipList.ip =newip
        this.setState({ipList})

        axios.patch(`/accessIp/${ipList._id}`,{
            ip: ipList.ip
         })
         .then( res =>{
             console.log(res)
         })
         .catch( err => {
             console.log(err)
         });
    }
    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;
        console.log(this.state)
        console.log("list of ip is", this.state.ipList)
        return (
            <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                            onClick={() => {
                                this.toggle('1');
                            }}>
                            <i className="icon-list"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                            onClick={() => {
                                this.toggle('2');
                            }}
                       >
                            <i className="icon-settings"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classNames({ active: this.state.activeTab === '3' })}
                            onClick={() => {
                                this.toggle('3');
                            }}
                       >
                            <span className="cui-lock-locked" aria-hidden="true"></span>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <ListGroup className="list-group-accent" tag={'div'}>
                            <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem>
                            {this.state.agentList.length === 0 ?
                                null
                                :
                                this.state.agentList.map((v, i) => {
                                    if (v.email !== "admin@gmail.com") {
                                        return <div key={i}>
                                            {v.status === 'online' ?
                                                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-success list-group-item-divider">
                                                    <div className="avatar float-right">
                                                        <img className="img-avatar" src={Agent} alt="admin@bootstrapmaster.com"></img>
                                                    </div>
                                                    <div>Agent: <strong>{v.name}</strong> </div>
                                                    <small className="text-muted mr-3">
                                                        <i className="icon-clock"></i>&nbsp; {v.loginTime}
                                                    </small>
                                                    <small className="text-muted">
                                                        <i className="icon-location-pin"></i>&nbsp;<i className="icon-cup"></i>&nbsp;<i className="icon-earphones-alt"></i>
                                                    </small>
                                                </ListGroupItem>
                                                :
                                                v.status === 'invisible' ?
                                                    <ListGroupItem action tag="a" href="#" className="list-group-item-accent-warning list-group-item-divider">
                                                        <div className="avatar float-right">
                                                            <img className="img-avatar" src={Agent} alt="admin@bootstrapmaster.com"></img>
                                                        </div>
                                                        <div>{v.userStatus}: <strong>{v.name}</strong> </div>
                                                        <small className="text-muted mr-3">
                                                            <i className="icon-clock"></i>&nbsp; {v.loginTime}
                                                        </small>
                                                        <small className="text-muted">
                                                            <i className="icon-location-pin"></i>&nbsp;<i className="icon-cup"></i>&nbsp;<i className="icon-earphones-alt"></i>
                                                        </small>
                                                    </ListGroupItem>
                                                    :
                                                    <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                                                        <div className="avatar float-right">
                                                            <img className="img-avatar" src={Agent} alt="admin@bootstrapmaster.com"></img>
                                                        </div>
                                                        <div>{v.userStatus}: <strong>{v.name}</strong> </div>
                                                        <small className="text-muted mr-3">
                                                            <i className="icon-clock"></i>&nbsp; {v.loginTime}
                                                        </small>
                                                        <small className="text-muted">
                                                            <i className="icon-location-pin"></i>&nbsp;<i className="icon-cup"></i>&nbsp;<i className="icon-earphones-alt"></i>
                                                        </small>
                                                    </ListGroupItem>
                                            }
                                        </div>
                                    }
                                }
                                )
                            }
                        </ListGroup>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                        <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Access IPs</ListGroupItem>
                        <div style={{ marginTop: 10 }}>
                            <input type="text" className="format" value={this.state.ip} onChange={(e) => { this.setState({ ip: e.target.value }) }} />
                            <Button onClick={this.addNewIp.bind(this)} style={{ marginTop: 10, float: "right", width: "100%" }} size="sm" color={'outline-dark'}><i className="fa fa-ip"></i> Add IP</Button>
                            <div style={{ marginTop: 50 }}>
                                {  this.state.ipList.ip.map((v, i) => {
                                    return <div key={i} style={{ border: '1px solid green', padding: '5px',marginTop: 5 }}>
                                        {v}
                                        <i onClick={this.deleteIP.bind(this,i)} style={{ float: "right", fontSize: 18, color: "red", cursor: "pointer" }} className="icon-trash"></i>
                                    </div>
                                })
                                }

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                        <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Acoount Disabled</ListGroupItem>
                        {this.state.AllUsers.map((v, i) => {
                            if (v.email === "admin@genesis.com") {
                                return null
                            } else {

                                return <div className="aside-options" key={i}>
                                    <div className="clearfix mt-3">
                                        <small><b>{v.displayName}</b></small>
                                        <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} checked={v.disabled} size={'sm'} onChange={(e) => this.handleChange(i, e.target.checked, v.uid)} />
                                        <div>
                                            <small className="text-muted">{v.email}</small>
                                        </div>
                                    </div>
                                </div>
                            }

                        }
                        )}
                    </TabPane>
                </TabContent>
            </React.Fragment>
        );
    }
}

AdminDefaultAside.propTypes = propTypes;
AdminDefaultAside.defaultProps = defaultProps;

export default AdminDefaultAside;
