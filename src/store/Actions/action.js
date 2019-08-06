import ActionTypes from "../Constants/constant";
// import firebase from '../../Config/Firebase/firebase'
import history from "../../history";

export function getUser(user, who) {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  let AgentActivity = {
    name: "Shoaib Noor",
    email: "shoaibnoor95@hotmail.com",
    loginDate: "24/07/2019",
    loginTime: "20:20 PM",
    status: "online",
    userStatus: "online"
  };

  // firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}`).once("value", (data) => {
  // if (data.val() === null) {
  // firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}`).set(AgentActivity)
  // }
  // else {
  // firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("online")
  // }

  // })
  return dispatch =>
    dispatch({ type: ActionTypes.GETUSER, payload: "shoaib Noor" });
}
export function AddNewDeal(data) {
  // let uid = firebase.auth().currentUser.uid
  // let key = firebase.database().ref('/').child(`NewDeals/${data.date}/${uid}`).push().key
  data.key = key;
  data.uid = uid;
  // firebase.database().ref('/').child(`NewDeals/${data.date}/${uid}/${key}`).set(data)
  //   .then(() => {
  //     firebase.database().ref('/').child("RandomID").set({ id: data.ID })
  //       .then(() => {
  //         if (data.status.status === "Transfer") {
  //           data.status.statusCloser = "Pending";
  //           firebase.database().ref('/').child(`NewDeals/${data.date}/${data.status.transferCloserID}/${key}`).set(data)
  //         }
  //       })
  //   })
  return dispatch => dispatch({ type: ActionTypes.ADDNEWDEAL, payload: "45" });
}
export function updateDeal(data) {
  let uid = firebase.auth().currentUser.uid;
  // firebase.database().ref('/').child(`NewDeals/${data.date}/${uid}/${data.key}`).set(data)
  return dispatch => dispatch({ type: ActionTypes.UPDATEDEAL, payload: "45" });
}
export function getUserRole() {
  return function(dispatch) {
    // firebase.database().ref('/').child(`Users/`).on("value", (data) => {
    //   dispatch({ type: ActionTypes.ADMINS, payload: data.val(), mainLoader: false})
    // })
  };
}

export function logOut() {
  console.log("logout");
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  // firebase.auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     if (user.email === "admin@genesis.com") {
  //       firebase.auth().signOut().then(function () {
  //         history.push('/login');
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
  //                 window.location.reload();
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
