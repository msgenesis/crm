import React, { Component, lazy } from 'react';
import {
  Col,
  Row,
  Card, CardBody, CardHeader, CardColumns
} from 'reactstrap';
import { getUser } from '../../store/Actions/action'
import { connect } from 'react-redux';
import firebase from '../../Config/Firebase/firebase'
import $ from 'jquery';
import { Doughnut, Pie } from 'react-chartjs-2';
import { askForPermissioToReceiveNotifications } from '../../push-notification';

const Widget04 = lazy(() => import('../../views/Widgets/Widget04'));


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaySale: [],
      totalSale: [],
      doughnut: {},
      pie: {},
      CallBack: 0,
      Transfer: 0
    }

  }


  filter = () => {
    // let { doughnut } = this.state;
    var CallBack = this.state.todaySale.filter(function (el) {
      return el.status === "Call Back"
    });
    var Transfer = this.state.todaySale.filter(function (el) {
      return el.status === "Transfer"
    });
    var Pending = this.state.todaySale.filter(function (el) {
      return el.status === "Pending"
    });
    var CallBack1 = this.state.totalSale.filter(function (el) {
      return el.status === "Call Back"
    });
    var Transfer1 = this.state.totalSale.filter(function (el) {
      return el.status === "Transfer"
    });
    var Pending1 = this.state.totalSale.filter(function (el) {
      return el.status === "Pending"
    });
    this.setState({
      CallBack: CallBack1.length,
      Transfer: Transfer1.length
    })
    this.setState({
      pie: {
        labels: [
          'Call Back',
          'Transfer',
          'Pending',
        ],
        datasets: [
          {
            data: [CallBack1.length, Transfer1.length, Pending1.length],
            backgroundColor: [
              '#81d4fa',
              '#e4e5e6',
              '#ffa726',
            ],
            hoverBackgroundColor: [
              '#81d4fa',
              '#e4e5e6',
              '#ffa726',
            ],
          }],
      },
      doughnut: {
        labels: [
          'Call Back',
          'Transfer',
          'Pending',
        ],
        datasets: [
          {
            data: [CallBack.length, Transfer.length, Pending.length],
            backgroundColor: [
              '#81d4fa',
              '#e4e5e6',
              '#ffa726',
            ],
            hoverBackgroundColor: [
              '#81d4fa',
              '#e4e5e6',
              '#ffa726',
            ],
          }],
      }
    })
  }
  // componentWillMount() {
  //   var today = new Date();
  //   var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  //   let uid = firebase.auth().currentUser.uid
  //   firebase.database().ref('/').child(`NewDeals`).on('value', (data) => {
  //     if (data.val() !== null) {
  //       for (var key in data.val()) {
  //         for (var key1 in data.val()[key][uid]) {
  //           this.state.totalSale.push(data.val()[key][uid][key1].status)
  //           this.setState({
  //             totalSale: this.state.totalSale
  //           })
  //           this.filter()
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
  // componentDidMount() {
  //   var today = new Date();
  //   var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       if (user.email === "admin@genesis.com") {

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
  // }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="6" md="3">
            <Widget04 icon="icon-basket-loaded" color="#e4e5e6" header={this.state.totalSale !== [] ? this.state.totalSale.length + ".00" : "00.00"} value="25">Total Sale</Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04 icon="icon-basket-loaded" color="#e4e5e6" header={this.state.todaySale !== [] ? this.state.todaySale.length + ".00" : "00.00"} value="25">Today Sale</Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04 icon="icon-phone" color="#81d4fa" header={this.state.CallBack !== "" ? this.state.CallBack + ".00" : "00.00"} value="25">Call Back</Widget04>
          </Col>
          <Col sm="6" md="3">
            <Widget04 icon="icon-shuffle" color="#e4e5e6" header={this.state.Transfer !== "" ? this.state.Transfer + ".00" : "00.00"} value="25">Transfer</Widget04>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardColumns className="cols-2">
              <Card>
                <CardHeader>
                  Today Sale
              <div className="card-header-actions">
                  </div>
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
              <div className="card-header-actions">
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Pie data={this.state.pie} />
                  </div>
                </CardBody>
              </Card>
            </CardColumns>
          </Col>
          {/* <button onClick={askForPermissioToReceiveNotifications}>push notification</button> */}
        </Row>
      </div>
    );
  }
}



function mapStateToProp(state) {
  return ({
    name: state.root.name
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    getUser: (user, agent) => { dispatch(getUser(user, agent)) }
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(Dashboard);

