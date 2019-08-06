import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { Login, Page404 } from './Pages';
// import firebase from './Config/Firebase/firebase'
// import { connect } from 'react-redux';
// import { getUserRole, logOut } from './store/Actions/action'
import Loader from './assets/img/loader.gif'
import axios from 'axios'
import history from './history'
// import publicIp from 'public-ip'
//***************Agent Route*******************/
import { AllSellDefault, TodaySellDefault, NewDealDefault, DashboardDefault, PendingDefault, TransferDefault, CallBackDefault } from './agent'

//***************Admin Routes*******************/
import { AllSellDefaultAdmin, TodaySellDefaultAdmin, DashboardDefaultAdmin, RegisterDefault, EditUserDefault } from './admin'


//***************Closer Routes*******************/
import { DashboardDefaultCloser, NewDealDefaultCloser, TodaySellDefaultCloser, AllSellDefaultCloser, PendingDefaultCloser, TransferDefaultCloser, CallBackDefaultCloser } from './closer'
import SignUp from './Pages/Login/Signup';
// import admin from 'firebase-admin-auth';
// import serviceAccount from './admin/Register/genesis-7c1cc-firebase-adminsdk-n4z95-4ade82680a'

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://genesis-7c1cc.firebaseio.com"
// });

function PrivateRoute({ component: Component, authed = true, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

class MainRouter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      user: {},
      loader: true
    }
    this.userCheck = this.userCheck.bind(this)
  }
  componentDidMount() {

    axios.get("/getUser")
      .then(res => {
        this.setState({user:res.data})
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  //   let that = this
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       that.setState({
  //         authed: true,
  //         user: user
  //       })
  //     } else {
  //       that.setState({
  //         authed: false
  //       })
  //     }
  //   });
  }
  componentWillMount() {
    // this.props.getUserRole();
  }

  userCheck(user) {
    console.log("Chekingg===>",user)
    if (user.uid === this.state.user.uid) {
      return user.uid === this.state.user.uid;
    }
    else {
      return user.uid === this.state.user.uid;
    }
  }
  render() {
    // firebase.database().ref("blacklist").child(`${this.state.user.uid}`).on('value', (user) => {
    //   if (user.val() === true) {
    //     this.props.logOut()
    //   }
    // })
    const { authed, user, loader } = this.state;
    console.log('User',user)
    return (
      this.props.mainLoader === true ?
        <div className="loader">
          <img src={Loader} alt="" width="300" />

        </div>
        :
        <Router>
          <Switch>*/}
         {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN WORKING ROUTES WITH NODES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
         
         {/* <Route exact path="/all-users" component={EditUserDefault} />
         <Route exact path="/today-sales" component={TodaySellDefaultAdmin} />
         <Route exact path="/all-sale" component={AllSellDefaultAdmin}/>
         <Route exact path="/register" component={RegisterDefault} />
         <Route exact path="/adminDashboard" component={DashboardDefaultAdmin}/> 
        */}
         {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLOSER WORKING ROUTES WITH NODES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
         {/* <Route  path="/" exact component={Login}/>  */}
        {/* <Route  exact   path="/dashboard1" component={DashboardDefaultCloser} />
        <Route  exact   path="/new-sale" component={NewDealDefaultCloser}/>
        <Route  exact   path="/today-sales" component={TodaySellDefaultCloser}/>
        <Route  exact   path="/all-sale" component={AllSellDefaultCloser}/>
        <Route  exact   path="/pending" component={PendingDefaultCloser}/>
        <Route  exact   path="/transfer" component={TransferDefaultCloser}/>
        <Route  exact   path="/call-back" component={CallBackDefaultCloser}/>  */}






      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> AGENT WORKING ROUTES WITH NODES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
  
                      {/* <Route  path="/" exact component={Login}/>  */}
                    {/*  <Route exact path="/adminDashboard" component={DashboardDefaultAdmin} />
                      <Route exact path="/today-sales" component={TodaySellDefaultAdmin} />
                      <Route exact path="/register" component={RegisterDefault} />
                      <Route exact path="/dashboard" component={DashboardDefault}  />
                      <Route exact path="/new-sale" component={NewDealDefault}     />
                      
                    */}

                      {/* <Route  path="/signup" exact component={SignUp}/>   */}
                       {/*<Route exact             path="/dashboard" component={DashboardDefault}  />
                      <Route exact             path="/new-sale" component={NewDealDefault}     />
                      <Route exact             path="/today-sales" component={TodaySellDefault}/>
                      <Route exact             path="/all-sale" component={AllSellDefault}     />
                      <Route exact             path="/pending" component={PendingDefault}      />
                      <Route exact             path="/transfer" component={TransferDefault}    />
                      <Route exact             path="/call-back" component={CallBackDefault}   /> */}



            <Route exact path="/signup"  component={SignUp}/>  
            <Route exact path="/" render={() => <Redirect to="/login" />} /> 
            <PublicRoute authed={!!user.role} path="/login" component={Login} />
            { user.role === "Admin" ?
           
           //=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Admin<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              <Switch>
                <PrivateRoute authed={!!user.role} path="/dashboard"   component={DashboardDefaultAdmin} />
                <PrivateRoute authed={!!user.role} path="/all-sale"    component={AllSellDefaultAdmin} />
                <PrivateRoute authed={!!user.role} path="/today-sales" component={TodaySellDefaultAdmin} />
                <PrivateRoute authed={!!user.role} path="/register"    component={RegisterDefault} />
                <PrivateRoute authed={!!user.role} path="/all-users"   component={EditUserDefault} />
                <Route path="*" component={Page404} />
              </Switch>
              :
              user.role === "Closer" ?
                //=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Closers<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                <Switch>
                  <PrivateRoute authed={!!user.role} path="/dashboard" component={DashboardDefaultCloser} />
                  <PrivateRoute authed={!!user.role} path="/new-sale" component={NewDealDefaultCloser} />
                  <PrivateRoute authed={!!user.role} path="/today-sales" component={TodaySellDefaultCloser} />
                  <PrivateRoute authed={!!user.role} path="/all-sale" component={AllSellDefaultCloser} />
                  <PrivateRoute authed={!!user.role} path="/pending" component={PendingDefaultCloser} />
                  <PrivateRoute authed={!!user.role} path="/transfer" component={TransferDefaultCloser} />
                  <PrivateRoute authed={!!user.role} path="/call-back" component={CallBackDefaultCloser} />
                  <Route path="*" component={Page404} />
                </Switch>
                :
                user.role === "Agent" ?
                  //=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Agent<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                  <Switch>
                    <PrivateRoute authed={!!user.role} path="/dashboard" component={DashboardDefault}    />
                    <PrivateRoute authed={!!user.role} path="/new-sale" component={NewDealDefault}        />
                    <PrivateRoute authed={!!user.role} path="/today-sales" component={TodaySellDefault}   />
                    <PrivateRoute authed={!!user.role} path="/all-sale" component={AllSellDefault}         />
                    <PrivateRoute authed={!!user.role} path="/pending" component={PendingDefault}           />
                    <PrivateRoute authed={!!user.role} path="/transfer" component={TransferDefault}           />
                    <PrivateRoute authed={!!user.role} path="/call-back" component={CallBackDefault}           />
                    <Route path="*" component={Page404} />
                  </Switch>
                  :
                  history.push("/login")
            }
          </Switch>
        </Router>
    );
  }
}


// function mapStateToProp(state) {
//   return ({
//     admins: state.root.admins,
//     agents: state.root.agents,
//     closers: state.root.closers,
//     mainLoader: state.root.mainLoader,
//   })
// }
// function mapDispatchToProp(dispatch) {
//   return ({
//     getUserRole: () => { dispatch(getUserRole()) },
//     logOut: () => { dispatch(logOut()) }
//   })
// }


export default  MainRouter;
