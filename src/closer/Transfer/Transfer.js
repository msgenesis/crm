import React, { Component } from 'react';
import {
    Col,
    Row,
    Card, CardBody, CardHeader, Badge, Table, Popover, PopoverBody, PopoverHeader, Button
} from 'reactstrap';
import $ from 'jquery';
// import firebase from '../../Config/Firebase/firebase'
import './style.css'
import { updateDeal, getUser } from '../../store/Actions/action'
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input'
import axios from 'axios'


const KEYS_TO_FILTERS = ['ID', 'fullName']
class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            popover: [],
            searchTerm: ""
        }
        this.toggle = this.toggle.bind(this)
        this.searchUpdated = this.searchUpdated.bind(this)

    }
    componentDidMount() {
        axios.get("/salesBy/Transfer")
        .then(res=> {
            this.setState({data: res.data})
            console.log(res)
        })
        // var today = new Date();
        // var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         if (user.email === "admin@genesis.com") {

        //         }
        //         else {
        //             $(window).blur(function () {
        //                 // console.log('blur')
        //                 firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("invisible")
        //             });
        //             $(window).focus(function () {
        //                 // console.log('focus')
        //                 firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("online")
        //             });
        //         }

        //     } else {

        //     }
        // });

    }
    // componentWillMount() {
    //     var today = new Date();
    //     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //     let uid = firebase.auth().currentUser.uid
    //     firebase.database().ref('/').child(`NewDeals`).on('child_added', (data) => {
    //         this.setState({ data: [] })
    //         setTimeout(() => {
    //             for (var key in data.val()[uid]) {
    //                 if (data.val()[uid][key].status.statusCloser === "Transfer") {
    //                     this.state.popover.push({ isOpen: false })
    //                     this.state.data.push(data.val()[uid][key])
    //                     this.setState({
    //                         data: this.state.data,
    //                         popover: this.state.popover
    //                     })
    //                 }
    //             }
    //         }, 10)
    //     })
    //     firebase.database().ref('/').child(`NewDeals/${date}/${uid}`).on('value', (data) => {
    //     })
    //     let user = firebase.auth().currentUser
    //     let agent = "Agent"
    //     this.props.getUser(user, agent)
    // }
    toggle(i) {
        let { popover } = this.state;
        popover[i].isOpen = true
        this.setState({
            popover: this.state.popover,
        });
    }
    toggleClose(i) {
        let { popover } = this.state;
        popover[i].isOpen = false
        this.setState({
            popover: this.state.popover,
        });
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    render() {
        const filter = this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader style={{ backgroundColor: "#2f353a", color: "#fff" }}>
                                <i className="fa fa-align-justify" style={{ marginTop: 10 }}></i> Transfers
                                <div className="card-header-actions">
                                    <SearchInput style={{ width: '100%', height: '35px', borderRadius: "28px" }} className="search-input" onChange={this.searchUpdated} placeholder="Search Sales" />
                                    <i className="fa fa-search" style={{ position: "absolute", right: 30, top: 23, color: "#000" }}></i>
                                </div>
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
                                            <th>Transfer To</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filter.map((v, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{v._id}</td>
                                                    <td>{v.FullName}</td>
                                                    <td>{v.Status === "Transfer" ? <b>✦✦✦✦✦✦✦✦✦✦</b> : v.phone}</td>
                                                    <td>{v.Time}</td>
                                                    <td>{v.Date}</td>
                                                    <td>
                                                    <Badge style={{ width: 100, height: 25, paddingTop: 7, backgroundColor: v.Status === "Pending" ? '#ffab00' : v.Status === "Transfer" ? '#e4e5e6' : v.Status === "Kick Back" ? "#ff7043" : v.Status === "Dublicated" ? "#ff8a65" : v.Status === "Approved" ? '#4caf50' : v.Status === "Rejected" ? "#d32f2f" : '#81d4fa' }}><i className={v.Status === "Pending" ? "fa fa-spinner" : v.Status === "Transfer" ? "fa fa-exchange" : v.Status === "Kick Back" ? "fa fa-backward" : v.Status === "Dublicated" ? "fa fa-clone" : v.Status === "Approved" ? "fa fa-check" : v.Status === "Rejected" ? "fa fa-exclamation-triangle" : "fa fa-phone"}></i>{v.Status === "Call Back" ? <i className="fa fa-clock"></i> : " "} {v.Status}</Badge>
                                                    
                                                    </td>
                                                    {v.Status === "Transfer" ?

                                                        <td style={{ textDecoration: "underline" }}><b>{v.Status}</b></td>

                                                        :
                                                        <td><select className="format" value={typeof this.state.transferCloser[i] === "undefined" ? "Select" : this.state.transferCloser[i].transferCloser}
                                                            onChange={(e) => {
                                                                let { transferCloser } = this.state;
                                                                transferCloser[i] = { transferCloser: e.target.value };
                                                                this.setState({ transferCloser: this.state.transferCloser })
                                                            }}>
                                                            <option value="Select">Select</option>
                                                            {this.props.closers.map((v, i) => {
                                                                return <option key={i} value={JSON.stringify({ id: v.uid, name: v.username })} name={v.username}>{v.username}</option>
                                                            })}
                                                        </select> </td>

                                                    }
                                                    <td> <Button className="mr-1" color="outline-secondary" id={'Popover-' + i} onClick={() => this.toggle(i)}>
                                                        <i className="fa fa-search"></i>  View
                                                    </Button>
                                                        {
                                                            this.state.popover.length === 0 ?
                                                                null
                                                                :
                                                                <Popover placement={"top"} isOpen={this.state.popover[i].isOpen} target={'Popover-' + i} toggle={() => this.toggleClose(i)}>
                                                                    <PopoverHeader style={{ backgroundColor: "#2f353a", color: "#fff" }}>ID#{v.ID} Notes</PopoverHeader>
                                                                    <PopoverBody>{v.closerNotes}</PopoverBody>
                                                                </Popover>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }).reverse()}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
function mapStateToProp(state) {
    return ({
        closers: state.root.closers
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        updateDeal: (data) => { dispatch(updateDeal(data)) },
        getUser: (user, agent) => { dispatch(getUser(user, agent)) }
    })
}


export default connect(mapStateToProp, mapDispatchToProp)(Transfer);
