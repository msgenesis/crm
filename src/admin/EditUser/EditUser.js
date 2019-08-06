import React, { Component } from 'react';
import {
    Row,
    Button,
    Table, Input, InputGroup, InputGroupAddon, InputGroupText,
    Col,
    Card, CardBody, CardHeader, Badge,
    FormGroup,
    Label,
} from 'reactstrap';
import XLSX from 'xlsx'
import fileSaver from 'file-saver'
import { getUser } from '../../store/Actions/action'
import { connect } from 'react-redux';
// import firebase from '../../Config/Firebase/firebase'
import $ from 'jquery';
// import admin from 'firebase-admin-auth';
import AgentIcon from '../../assets/img/brand/agent.png';
import Workbook from 'react-excel-workbook'

import axios from 'axios';




 class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllUsers: [],
            username: " ",
            email: " ",
            password: "",
            repeatPass: "",
            sales: [],
            error: "",
            color: "",
            viewSaleModal: "none",
            viewSale: [],
            saleUser: "",
            EditUser:""
        }
        // this.downloadSale = this.downloadSale.bind(this)
    }


    // componentDidMount(nextPageToken) {
    //     var today = new Date();
    //     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             if (user.email === "admin@genesis.com") {

    //             }
    //             else {
    //                 $(window).blur(function () {
    //                     // console.log('blur')
    //                     firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("invisible")
    //                 });
    //                 $(window).focus(function () {
    //                     // console.log('focus')
    //                     firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("online")
    //                 });
    //             }
    //         } else {

    //         }
    //     });
    //     let that = this;
    //     admin.auth().listUsers(1000, nextPageToken)
    //         .then(function (listUsersResult) {
    //             listUsersResult.users.forEach(async function (userRecord) {
    //                 if (userRecord.email !== "admin@gmail.com") {
    //                     let Allsales = []
    //                     await firebase.database().ref('/').child(`NewDeals`).once('value', (sales) => {
    //                         for (var key in sales.val()) {
    //                             if (sales.val()[key][userRecord.uid] !== undefined) {
    //                                 for (var key1 in sales.val()[key][userRecord.uid]) {
    //                                     // console.log("Sales.val()==>",sales.val()[key][userRecord.uid][key1])
    //                                     Allsales.push(sales.val()[key][userRecord.uid][key1])
    //                                 }
    //                             }

    //                         }
    //                     })
    //                     userRecord.Sales = Allsales;
    //                     userRecord.Modal = "none"
    //                     that.state.AllUsers.push(userRecord)
    //                     that.setState({
    //                         AllUsers: that.state.AllUsers
    //                     })
    //                 }
    //             });
    //             if (listUsersResult.pageToken) {

    //             }
    //         })
    //         .catch(function (error) {
    //             console.log("Error listing users:", error);
    //         });
    //     let user = firebase.auth().currentUser
    //     let agent = "Admin"
    //     this.props.getUser(user, agent)
    // }
    componentDidMount(){
        axios.get('/all-user')
    .then( (response) => {
        console.log(response.data);
        response.data.map(v => v.Modal = "none") // this patch is to remove Edit User Modal on Every User Render
        this.setState({AllUsers: response.data})

     })
     .catch( (error) =>{
     console.log(error);
    });

    }
    // downloadSale(uid, i) {
    //     firebase.database().ref('/').child(`NewDeals/2-4-2019/pQandou9bfZsGR6pUOjyyHqQnTJ3`).on("child_added", (data) => {
    //         this.state.sales.push(data.val())
    //         this.setState({
    //             sales: this.state.sales
    //         })
    //     })
    // }

    updateUser(id, i) {
        console.log("update user id ",id)
        let { username, email, password, repeatPass, AllUsers } = this.state;
        let that = this;
        if (username === "" || email === "" || password === "" || repeatPass === "") {
            this.setState({
                error: "please fill the required fields!",
                color: "red"
            })
        } else {
            // admin.auth().updateUser(uid, {
            //     email: email === " " ? AllUsers[i].email : email,
            //     password: password,
            //     displayName: username === " " ? AllUsers[i].displayName : username,
            // })
            axios.patch(`/users/${id}`,{
                    email: email === " " ? AllUsers[i].email : email,
                    password: password,
                    username: username.trim() === "" ? AllUsers[i].displayName : username,
                })
                .then( (response) =>{
                    that.setState({
                        error: 'Successfully updated user',
                        color: "green"
                    })
                    console.log(response)
                })
                .catch( (error) => {
                    that.setState({
                        error: error.message,
                        color: "red"
                    })
                });
        }
       
    }
    deleteUser(id) {
        console.log(id)
        axios.delete(`/users/${id}`).then( (response) => {
            console.log(response);
          })
          .catch( (error) => {
            console.log(error);
          });
    }

    AgentSales(id,username){
        console.log("id of agent",id)
        axios.get(`/AgentSales/${id}`)
        .then( (response) => {
            console.log(response)
            // response.data.map(v => v.Modal = "none") // this patch is to remove Edit User Modal on Every User Render
            // this.setState({AllUsers: response.data})
            this.setState({ viewSaleModal: "block", viewSale: response.data, saleUser: username })
         })
         .catch( (error) =>{
         console.log(error);
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                        <thead className="thead-light">
                            <tr>
                                <th className="text-center"><i className="icon-people"></i></th>
                                <th>User</th>
                                <th className="text-center">Creation</th>
                                <th className="text-center">lastSignIn</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>View</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.AllUsers.map((v, e) => {
                                console.log(v)
                                return <tr>
                                    <td className="text-center">
                                        <div className="avatar">
                                            <img src={AgentIcon} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                    </td>
                                    <td>
                                        <div>{v.username}</div>
                                        <div className="small text-muted">
                                            {v.email}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span>{new Date(v.createdAt).toLocaleTimeString() }</span>
                                    </td>
                                    <td className="text-center">
                                        <span>{new Date(v.lastSignInDate).toLocaleDateString()}</span>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                            <div className="float-left">
                                                <Button color="outline-primary" onClick={() => {
                                                    let { AllUsers } = this.state;
                                                    console.log('shoaib')
                                                    axios({
                                                        withCredentials:true,
                                                        method:'get',
                                                        url:'/editUser',
                                                        params:{
                                                             id:v._id
                                                        }
                                                    })
                                                    .then(data=>{
                                                        console.log('shoaib\n')
                                                        console.log(data)
                                                        AllUsers[e].Modal = "block"
                                                        this.setState({
                                                            AllUsers: AllUsers,        
                                                            username:data.data.username.username
                                                        })
                                                    })
                                                    .catch(err=>{
                                                        console.log(err)
                                                    })
                                                }}><i className="fa fa-pencil"></i>{" "}Edit</Button>

                                                <div id="transferModal" className="modal" style={{ position: 'fixed', zIndex: 1, paddingTop: '100px', left: 0, top: 0, right: 0, width: '40%', height: '100%', overflow: 'auto', margin: "0 auto", marginTop: "90px", display: v.Modal }}>
                                                    <div className="modal-content">
                                                        <div><p style={{ float: 'left', marginTop: 5 }}><b>{v.displayName}</b></p><p style={{ float: 'right' }} className="close" onClick={() => {
                                                            let { AllUsers } = this.state;
                                                            AllUsers[e].Modal = "none"
                                                            this.setState({
                                                                AllUsers: AllUsers
                                                            })
                                                        }}>&times;</p></div>
                                                        <InputGroup className="mb-3">
                                                            <InputGroupAddon addonType="prepend">    
                                                                <InputGroupText>
                                                                    <i className="icon-user"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            {console.log(this.state.username)}
                                                            <Input type="text" placeholder="Username" value={this.state.username.trim() === "" ? v.displayName : this.state.username} autoComplete="username" onChange={e => this.setState({ username: e.target.value })} />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>@</InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input type="text" placeholder="Email" value={this.state.email.trim() === "" ? v.email : this.state.email} autoComplete="email" onChange={e => this.setState({ email: e.target.value })} />
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
                                                        <Button color="primary" block onClick={this.updateUser.bind(this, v._id, e)}>Update</Button>
                                                        <div style={{ textAlign: 'center', marginTop: 20, color: this.state.color }}>
                                                            <h6>{this.state.error}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                            <div className="float-left"></div>
                                            <Button color="outline-danger" onClick={this.deleteUser.bind(this, v._id)}><i className="fa fa-trash"></i>{" "}Delete</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="clearfix">
                                            <div className="float-left"></div>
                                            <Button color="outline-primary" onClick={this.AgentSales.bind(this,v._id,v.username)}><i className="fa fa-eye"></i>{" "}View Sales</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <Workbook filename={v.username + ".xlsx"} element={<div className="clearfix">
                                            <div className="float-left"></div>
                                            <Button color="outline-success" onClick={() => {
                                            }}><i className="fa fa-download"></i>{" "}Download</Button>
                                        </div>}>
                                            <Workbook.Sheet data={v.viewSale} name="Sheet A">
                                            <Workbook.Row>
                                                <Workbook.Column label="ID" value="ID" />
                                            </Workbook.Row>
                                                <Workbook.Column label="Date" value="date" />
                                                <Workbook.Column label="Full Name" value="fullName" />
                                                <Workbook.Column label="Phone" value="phone" />
                                                <Workbook.Column label="Phone2" value="phone2" />
                                                <Workbook.Column label="Cell" value="cell" />
                                                <Workbook.Column label="Address" value="address" />
                                                <Workbook.Column label="City" value="city" />
                                                <Workbook.Column label="State" value="state" />
                                                <Workbook.Column label="Zip Code" value="zipCode" />
                                                <Workbook.Column label="Email" value="email" />
                                                <Workbook.Column label="DOB" value="dob" />
                                                <Workbook.Column label="MMN" value="mmn" />
                                                <Workbook.Column label="SSN" value="ssn" />
                                                <Workbook.Column label="Notes" value="Notes" />
                                            </Workbook.Sheet>
                                        </Workbook>
                                    </td>
                                </tr>
                            })
                            }
                        </tbody>
                    </Table>
                </Row>
                <div id="transferModal" className="modalView" style={{ position: 'fixed', zIndex: 1, paddingTop: '100px', left: 0, top: 0, right: 0, width: '60%', height: '100%', overflow: 'auto', margin: "0 auto", display: this.state.viewSaleModal }}>
                    <div>
                        <div className="modal-content">
                            <div><p style={{ float: 'right' }} className="close" onClick={() => {
                                this.setState({
                                    viewSaleModal: "none",
                                    viewSale: [],
                                    saleUser: ""
                                })
                            }}>&times;</p></div>
                            <Row style={{ pointerEvents: this.state.pointerEvents }}>
                                <Col xs="12" lg="12">
                                    <Card>
                                        <CardHeader style={{ backgroundColor: "#2f353a", color: "#fff" }}>
                                            <i className="fa fa-align-justify"></i>{this.state.saleUser} Sales
                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Full Name</th>
                                                        <th>Contact Number</th>
                                                        <th>Time</th>
                                                        <th>Date</th>
                                                        <th>Status</th>
                                                        <th>Download</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.viewSale.map((v, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{v._id}</td>
                                                                <td>{v.FullName}</td>
                                                                <td>{v.ContactNumber}</td>
                                                                <td>{v.Time}</td>
                                                                <td>{v.Date}</td>
                                                                <td title={v.Status === "Call Back" ? v.Status + " " + v.Status : ""}>
                                                                    <Badge style={{ width: 100, height: 25, paddingTop: 7, backgroundColor: v.Status === "Pending" ? '#ffab00' : v.Status === "Transfer" ? '#e4e5e6' : v.Status === "Kick Back" ? "#ff7043" : v.Status === "Dublicated" ? "#ff8a65" : v.Status === "Approved" ? '#4caf50' : v.Status === "Rejected" ? "#d32f2f" : '#81d4fa' }}><i className={v.Status === "Pending" ? "fa fa-spinner" : v.Status === "Transfer" ? "fa fa-exchange" : v.Status === "Kick Back" ? "fa fa-backward" : v.Status === "Dublicated" ? "fa fa-clone" : v.Status === "Approved" ? "fa fa-check" : v.Status === "Rejected" ? "fa fa-exclamation-triangle" : "fa fa-phone"}></i>{v.Status === "Call Back" ? <i className="fa fa-clock"></i> : " "} {v.Status}</Badge>
                                                                </td>
                                                                <td>
                                                                    <Workbook filename={v._id + ".xlsx"} element={<div className="clearfix">
                                                                        <div className="float-left"></div>
                                                                        <Button color="outline-success" onClick={() => {
                                                                        }}><i className="fa fa-download"></i>{" "}Download</Button>
                                                                    </div>}>
                                                                        <Workbook.Sheet data={[v]} name="Sheet A">
                                                                            <Workbook.Column label="ID" value="ID" />
                                                                            <Workbook.Column label="Date" value="date" />
                                                                            <Workbook.Column label="ID" value="ID" />
                                                                            <Workbook.Column label="Date" value="date" />
                                                                            <Workbook.Column label="Full Name" value="fullName" />
                                                                            <Workbook.Column label="Phone" value="phone" />
                                                                            <Workbook.Column label="Phone2" value="phone2" />
                                                                            <Workbook.Column label="Cell" value="cell" />
                                                                            <Workbook.Column label="Address" value="address" />
                                                                            <Workbook.Column label="City" value="city" />
                                                                            <Workbook.Column label="State" value="state" />
                                                                            <Workbook.Column label="Zip Code" value="zipCode" />
                                                                            <Workbook.Column label="Email" value="email" />
                                                                            <Workbook.Column label="DOB" value="dob" />
                                                                            <Workbook.Column label="MMN" value="mmn" />
                                                                            <Workbook.Column label="SSN" value="ssn" />
                                                                            <Workbook.Column label="Notes" value="Notes" />
                                                                        </Workbook.Sheet>
                                                                    </Workbook>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



function mapStateToProp(state) {
    return ({         
        name: state.root.name,
        admins: state.root.admins,
        agents: state.root.agents,
        closers: state.root.closers,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        getUser: (user, agent) => { dispatch(getUser(user, agent)) }
    })
}
const s2ab =s => {
  
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
    
}
const DownloadUser = ({ filename , data}) =>{
    let wb = XLSX.utils.book_new();
        wb.Props = {
                Title: "SheetJS Tutorial",
                Subject: "Test",
                Author: "Red Stapler",
                CreatedDate: new Date(2017,12,19)
        };
        
        wb.SheetNames.push("User Sheet");
        let ws_data = [['hello' , 'world']];
        let ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["Test Sheet"] = ws;
        let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        
                saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `${filename}.xlsx`);
    
}

// (  <Workbook filename={filename + ".xlsx"} element={<div className="clearfix">
// <div className="float-left"></div>
// <Button color="outline-success" onClick={() => {
// }}><i className="fa fa-download"></i>{" "}Download</Button>
// </div>}>
// <Workbook.Sheet data={[data]} name="Sheet A">
//     <Workbook.Column label="ID" value="ID" />
//     <Workbook.Column label="Date" value="date" />
//     <Workbook.Column label="ID" value="ID" />
//     <Workbook.Column label="Date" value="date" />
//     <Workbook.Column label="Full Name" value="fullName" />
//     <Workbook.Column label="Phone" value="phone" />
//     <Workbook.Column label="Phone2" value="phone2" />
//     <Workbook.Column label="Cell" value="cell" />
//     <Workbook.Column label="Address" value="address" />
//     <Workbook.Column label="City" value="city" />
//     <Workbook.Column label="State" value="state" />
//     <Workbook.Column label="Zip Code" value="zipCode" />
//     <Workbook.Column label="Email" value="email" />
//     <Workbook.Column label="DOB" value="dob" />
//     <Workbook.Column label="MMN" value="mmn" />
//     <Workbook.Column label="SSN" value="ssn" />
//     <Workbook.Column label="Notes" value="Notes" />
// </Workbook.Sheet>
// </Workbook>)
export default connect(mapStateToProp, mapDispatchToProp)(EditUser);

