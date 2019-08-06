import React, { Component, lazy } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardColumns,
  Progress,
  Table
} from "reactstrap";
import { getUser } from "../../store/Actions/action";
import { connect } from "react-redux";
// import firebase from '../../Config/Firebase/firebase'
import { Doughnut, Pie } from "react-chartjs-2";
// import admin from 'firebase-admin-auth';
import AgentIcon from "../../assets/img/brand/agent.png";
const Widget04 = lazy(() => import("../../views/Widgets/Widget04"));

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doughnut: {},
      pie: {},
      totalSale: 0,
      todaySale: 0,
      Transfer: 0,
      todayTransfer: 0,
      CallBack: 0,
      todayCallback: 0,
      pending: 0,
      todayPending: 0,
      AllUsers: []
    };
  }
   filter=(that)  => {
    // let { doughnut } = this.state;
    // var CallBack = this.state.todaySale.filter(function (el) {
    //   return el.status === "Call Back" || el.statusCloser === "Call back"
    // });
    // var Transfer = this.state.todaySale.filter(function (el) {
    //   return el.status === "Transfer" || el.statusCloser === "Transfer"
    // });
    // var Pending = this.state.todaySale.filter(function (el) {
    //   return el.status === "Pending" || el.statusCloser === "Pending"
    // });
    // var KickBack = this.state.todaySale.filter(function (el) {
    //   return el.status === "Kick Back" || el.statusCloser === "Kick Back"
    // });
    // var CallBack1 = this.state.totalSale.filter(function (el) {
    //   return el.status === "Call Back" || el.statusCloser === "Call back"
    // });
    // var Transfer1 = this.state.totalSale.filter(function (el) {
    //   return el.status === "Transfer" || el.statusCloser === "Transfer"
    // });
    // var Pending1 = this.state.totalSale.filter(function (el) {
    //   return el.status === "Pending" || el.statusCloser === "Pending"
    // });
    // var KickBack1 = this.state.totalSale.filter(function (el) {
    //   return el.status === "Kick Back" || el.statusCloser === "Kick Back"
    // });

    // this.setState({
    //   CallBack: CallBack1.length,
    //   Transfer: Transfer1.length
    // })
    
    // const {} = that.props
    // console.log("filer props is",that.props)
    // this.setState({
    //   pie: {
    //     labels: [
    //       "Call Back",
    //       "Transfer",
    //       "Pending",
    //       "Kick Back",
    //       "Approved",
    //       "Rejected"
    //     ],
    //     datasets: [
    //       {
    //          data: [
    //           that.props.countings.todayCallback,
    //           that.props.countings.todayTransfer,
    //           that.props.countings.todayPending,
    //         ],
    //         backgroundColor: [
    //           "#81d4fa",
    //           "#e4e5e6",
    //           "#ffab00",
    //           "#ff7043",
    //           "#66bb6a",
    //           "#c62828"
    //         ],
    //         hoverBackgroundColor: [
    //           "#81d4fa",
    //           "#e4e5e6",
    //           "#ffab00",
    //           "#ff7043",
    //           "#66bb6a",
    //           "#c62828"
    //         ]
    //       }
    //     ]
    //   },
    //   doughnut: {
    //     labels: [
    //       "Call Back",
    //       "Transfer",
    //       "Pending",
    //       "Kick Back",
    //       "Approved",
    //       "Rejected"
    //     ],
    //     datasets: [
    //       {
    //         data: [this.props.countings.callback, this.props.countings.transfer,this.props.countings.pending],
    //         backgroundColor: [
    //           "#81d4fa",
    //           "#e4e5e6",
    //           "#ffab00",
    //           "#ff7043",
    //           "#66bb6a",
    //           "#c62828"
    //         ],
    //         hoverBackgroundColor: [
    //           "#81d4fa",
    //           "#e4e5e6",
    //           "#ffab00",
    //           "#ff7043",
    //           "#66bb6a",
    //           "#c62828"
    //         ]
    //       }
    //     ]
    //   }
    // });
  };
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   this.setState({
  //     CallBack: nextProps.countings.callback,
  //     todayCallback: nextProps.countings.todayCallback,
  //     Transfer: nextProps.countings.transfer,
  //     todaySale: nextProps.countings.todaySale,
  //     todayTransfer: nextProps.countings.todayTransfer,
  //     totalSale: nextProps.countings.totalSale,
  //     Pending: nextProps.countings.pending,
  //     todayPending: nextProps.countings.todayPending
  //   });
  // }
  // componentWillReceMount(){
  //   console.log(this.props)
  // }

  // componentDidMount() {
   
    //   var today = new Date();
    //   var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //   let uid = firebase.auth().currentUser.uid
    //   firebase.database().ref('/').child(`NewDeals`).on('value', (data) => {
    //     if (data.val() !== null) {
    //       for (var key in data.val()) {
    //         for (var key1 in data.val()[key]) {
    //           for (var key2 in data.val()[key][key1]) {
    //             this.state.totalSale.push(data.val()[key][key1][key2].status)
    //             this.setState({
    //               totalSale: this.state.totalSale
    //             })
    //             this.filter()
    //           }
    //         }
    //       }
    //       this.setState({ todaySale: [] })
    //       if (data.val()[date] === undefined) {
    //         console.log("undifoined")
    //       } else {
    //         setTimeout(() => {
    //           for (var key in data.val()[date][uid]) {
    //             this.state.todaySale.push(data.val()[date][uid][key].status)
    //             this.setState({ todaySale: this.state.todaySale })
    //             this.filter()
    //           }
    //         }, 10)
    //       }
    //     }
    //   })
    //   let user = firebase.auth().currentUser
    //   // console.log("=>>>>>>>", user)
    //   let agent = "Agent"
    //   this.props.getUser(user, agent)
  // }
  componentWillReceiveProps(newProps) {
    const {todayCallback,todayTransfer,todayPending,callback,transfer,pending} = newProps.countings
    this.setState({
      pie: {
        labels: [
          "Call Back",
          "Transfer",
          "Pending",
          "Kick Back",
          "Approved",
          "Rejected"
        ],
        datasets: [
          {
             data: [callback, transfer,pending],
            backgroundColor: [
              "#81d4fa",
              "#e4e5e6",
              "#ffab00",
              "#ff7043",
              "#66bb6a",
              "#c62828"
            ],
            hoverBackgroundColor: [
              "#81d4fa",
              "#e4e5e6",
              "#ffab00",
              "#ff7043",
              "#66bb6a",
              "#c62828"
            ]
          }
        ]
      },
      doughnut: {
        labels: [
          "Call Back",
          "Transfer",
          "Pending",
          "Kick Back",
          "Approved",
          "Rejected"
        ],
        datasets: [
          {
            data: [
              todayCallback,
                todayTransfer,
                todayPending,
             ],
            backgroundColor: [
              "#81d4fa",
              "#e4e5e6",
              "#ffab00",
              "#ff7043",
              "#66bb6a",
              "#c62828"
            ],
            hoverBackgroundColor: [
              "#81d4fa",
              "#e4e5e6",
              "#ffab00",
              "#ff7043",
              "#66bb6a",
              "#c62828"
            ]
          }
        ]
      }
    });
    // this.filter(this)
  //   var today = new Date();
  //   var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       if (user.email === "admin@gmail.com") {

  //       }
  //       else {
  //         $(window).blur(function () {
  //           // console.log('blur')
  //           firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("invisible")
  //         });
  //         $(window).focus(function () {
  //           // console.log('focus')
  //           firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("online")
  //         });
  //       }

  //     } else {

  //     }
  //   });
  //   let that = this;
  //   admin.auth().listUsers(1000, nextPageToken)
  //     .then(function (listUsersResult) {
  //       listUsersResult.users.forEach(function (userRecord) {
  //         if (userRecord.email !== "admin@gmail.com") {
  //           that.state.AllUsers.push(userRecord)
  //           that.setState({
  //             AllUsers: that.state.AllUsers
  //           })
  //         }
  //       });
  //       if (listUsersResult.pageToken) {

  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error listing users:", error);
  //     });
  }

  render() {
    const {callback,pending, todayCallback,todayPending,todaySale, todayTransfer, totalSale,transfer } = this.props.countings
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="6" md="3">
            <Widget04
              icon="icon-basket-loaded"
              color="#e4e5e6"
              header={
                totalSale !== 0
                  ? totalSale + ".00"
                  : "00.00"
              }
              value="25"
            >
              Total Sale
            </Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04
              icon="icon-basket-loaded"
              color="#e4e5e6"
              header={
                todaySale !== 0
                  ? todaySale + ".00"
                  : "00.00"
              }
              value="25"
            >
              Today Sale
            </Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04
              icon="icon-phone"
              color="#81d4fa"
              header={
                callback !== 0
                  ? callback + ".00"
                  : "00.00"
              }
              value="25"
            >
              Call Back
            </Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04
              icon="icon-shuffle"
              color="#e4e5e6"
              header={
                transfer !== 0
                  ? transfer + ".00"
                  : "00.00"
              }
              value="25"
            >
              Transfer
            </Widget04>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardColumns className="cols-2">
              <Card>
                <CardHeader>
                  Today Sale
                  <div className="card-header-actions" />
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Doughnut data={this.state.doughnut} />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  All Sale
                  <div className="card-header-actions" />
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Pie data={this.state.pie} />
                  </div>
                </CardBody>
              </Card>
            </CardColumns>
          </Col>
          <Table
            hover
            responsive
            className="table-outline mb-0 d-none d-sm-table"
          >
            <thead className="thead-light">
              <tr>
                <th className="text-center">
                  <i className="icon-people" />
                </th>
                <th>User</th>
                <th className="text-center">Email</th>
                <th className="text-center">Role</th>
                <th>Sale</th>
              </tr>
            </thead>
            <tbody>
              {this.props.stats.map((v, i) => {
                return (
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img
                          src={AgentIcon}
                          className="img-avatar"
                          alt="admin@bootstrapmaster.com"
                        />
                      </div>
                    </td>
                    <td>
                      <div>{v.username}</div>
                      <div className="small text-muted">{v.email}</div>
                    </td>
                    <td className="text-center">
                      <span>{v.email}</span>
                    </td>
                    <td className="text-center">
                      <span>{v.role}</span>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right" />
                      </div>
                      <Progress
                        className="progress-xs"
                        color="success"
                        value="50"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    name: state.root.name,
    admins: state.root.admins,
    agents: state.root.agents,
    closers: state.root.closers
  };
}
function mapDispatchToProp(dispatch) {
  return {
    getUser: (user, agent) => {
      dispatch(getUser(user, agent));
    }
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(Dashboard);
