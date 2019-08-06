import React, { Component } from 'react';
import {
    Col,
    Row,
    Card, CardBody, CardHeader, Badge, Table, Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import $ from 'jquery';
// import firebase from '../../Config/Firebase/firebase'
import './style.css'
import Cards from 'react-credit-cards';
import NumberFormat from 'react-number-format';
import { updateDeal, getUser } from '../../store/Actions/action'
import { connect } from 'react-redux';
import luhn from 'luhn';
import { Visa, Master, Amex, Discover } from '../../agent/NewDeal/Icons';
import SearchInput, { createFilter } from 'react-search-input'
import Workbook from 'react-excel-workbook'
import axios from 'axios'


const KEYS_TO_FILTERS = ['_id', 'FullName', 'Status']


class AllSell extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            transferModalDisplay: "none",
            data:[],
            viewSale:{},
            cardIds:[],
            modal: "none",
            edit: false,
            fullName: ' ',
            phone: ' ',
            SocialSecurityNumber:"",
            phone2: ' ',
            cell: ' ',
            address: '',
            city: ' ',
            state: ' ',
            zipCode: '',
            email: ' ',
            error:'',
            dob: ' ',
            bankName: ' ',
            bankNumber: ' ',
            nameOnCard: ' ',
            mmn: ' ',
            ssn: ' ',
            cc: ' ',
            cvc: ' ',
            exp: ' ',
            bal: ' ',
            aval: ' ',
            lastPay: ' ',
            lastPayDate: " ",
            duePay: ' ',
            duePayDate: " ",
            aprl: ' ',
            cardIndex: 0,
            focused: "cc",
            ccError: "",
            ccBorder: "",
            cardDetail: [],
            addNewCard: false,
            ccBackground: "",
            bankNameBorder: "",
            bankNameBackground: "",
            bankNumberBorder: "",
            bankNumberBackground: "",
            balBorder: "",
            balBackground: "",
            avalBorder: "",
            avalBackground: "",
            lastPayBorder: "",
            lastPayBackground: "",
            lastPayDateBorder: "",
            lastPayDateBackground: "",
            duePayBorder: "",
            duePayBackground: "",
            duePayDateBorder: "",
            aprlBorder: "",
            aprlBackground: "",
            cardExpire: "",
            cardScheme: "",
            transferCloser: [],
            Notes: " ",
            searchTerm: '',
            transferModal: [],
            transferPassword: "",
            transferError: "",
            statusUpdateDisplay: "none",
            statusUpdate: "Status Updated 🗸",
            pointerEvents: "auto",
            SecurityWord: ' ',
            Education: "Select",
            EmploymentStatus: "Select",
            HousingStatus: "Select",
            ChequinAccount: "Select",
            OtherLoan: "Select",
            Company: " ",
            Designation: " ",
            AnnualIncome: "",
            MonthlyMortgages: " ",
            SecurityWordBorder: "",
            SecurityWordBackground: "",
            EducationBorder: "",
            EducationBackground: "",
            HousingStatusBorder: "",
            HousingStatusBackground: "",
            ChequinAccountBorder: "",
            ChequinAccountBackground: "",
            OtherLoanBorder: "",
            OtherLoanBackground: "",
            CompanyBorder: "",
            CompanyBackground: "",
            DesignationBorder: "",
            DesignationBackground: "",
            AnnualIncomeBorder: "",
            AnnualIncomeBackground: "",
            MonthlyMortgagesBorder: "",
            MonthlyMortgagesBackground: "",
            EmploymentStatusBorder: "",
            EmploymentStatusBackground: "",
            oldCardList: [],
            oldSSNList: [],
            oldPhoneList: [],
            CloserNotes: " ",
            SSNError: "",
            SSNBorder: "",
            statusAgent: "",
            Cards:[],
            statusCloser: ""
        }
        this.reset = this.reset.bind(this)
        this.searchUpdated = this.searchUpdated.bind(this)

    }
    componentDidMount() {
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

    
    }
    saveCard(){
    let { bankName, bankNumber, nameOnCard, cc, cvc, exp, bal, aval, lastPay, lastPayDate, duePay, duePayDate, aprl, cardScheme, cardExpire, issuer } = this.state;
    var is_valid = luhn.validate(cc);

    if (cc === "") {
        this.setState({
            ccError: "Insert card number ☒",
            ccBorder: "red"
        })
    }
     if (is_valid === false) {
        this.setState({
            ccError: "Invalid card number ✗",
            ccBorder: "red"
        })
    }
     if (nameOnCard === "") {
        this.setState({
            nameOnCardError: "Please Fill The Field",
            nameOnCardBorder: "red"
        })
    }
     if (exp === "") {
        this.setState({
            expError: "Please Fill The Field",
            expBorder: "red"
        })
    }
     if (cardExpire === true) {
        this.setState({
            expError: "Credit Card Expired",
            expBorder: "red"
        })
    }
     if (cvc === "") {
        this.setState({
            cvcError: "Please Fill The Field",
            cvcBorder: "red"
        })
    }
     if (bankName === "") {
        this.setState({
            bankNameError: "Please Fill The Field",
            bankNameBorder: "red"
        })
    }
     if (bal === "") {
        this.setState({
            balError: "Please Fill The Field",
            balBorder: "red"
        })
    }
     if (aval === "") {
        this.setState({
            avalError: "Please Fill The Field",
            avalBorder: "red"
        })
    }
     if (lastPay === "") {
        this.setState({
            lastPayError: "Please Fill The Field",
            lastPayBorder: "red"
        })
    }
     if (lastPayDate === "") {
        this.setState({
            lastPayDateError: "Please Fill The Field",
            lastPayDateBorder: "red"
        })
    }
     if (duePay === "") {
        this.setState({
            duePayError: "Please Fill The Field",
            duePayBorder: "red"
        })
    }
     if (duePayDate === "") {
        this.setState({
            duePayDateError: "Please Fill The Field",
            duePayDateBorder: "red"
        })
    }
     if (aprl === "") {
        this.setState({
            aprlError: "Please Fill The Field",
            aprlBorder: "red"
        })
    }
    else {
        let cardDetail = {
            bankName: bankName,
            bankNumber: bankNumber,
            nameOnCard: nameOnCard,
            cc: cc,
            cvc: cvc,
            exp: exp,
            bal: bal,
            aval: aval,
            lastPay: lastPay,
            lastPayDate: lastPayDate,
            duePay: duePay,
            duePayDate: duePayDate,
            aprl: aprl,
            card: true,
            cardScheme: cardScheme
            ,duplicated:this.state.duplicated,
        }
        if (issuer === "mastercard") {
            this.setState({
                master: this.state.master + 1
            })
        } else if (issuer === "visa") {
            this.setState({
                visa: this.state.visa + 1
            })
        } else if (issuer === "discover") {
            this.setState({
                discover: this.state.discover + 1
            })
        } else if (issuer === "amex") {
            this.setState({
                amex: this.state.amex + 1
            })
        }
        let cardDetails={
        issuer,
        cardDetail
        }
        axios({
            withCredentials:true,
            method:'post',
            url:'/saveCard',
            data:cardDetail
        })
        .then(data=>{
            if(data.data.save){
                let cards=this.state.cardIds;
                cards.push(data.data.cards)
                console.log(data.data.cards)
                this.setState({
                    cardIds:cards
                })
            }
        })
        // this.state.cards.push(issuer)
        // this.state.cardDetail.push(cardDetail)
        this.setState({
            cardDetail: this.state.cardDetail,
            cards: this.state.cards,
            bankName: "",
            bankNumber: "",
            nameOnCard: "",
            cc: "",
            cvc: "",
            exp: "",
            bal: "",
            aval: "",
            lastPay: "",
            lastPayDate: "",
            duePay: "",
            duePayDate: "",
            aprl: "",
            ccBorder: "",
            ccError: "",
            bankNameBorder: "",
         
            bankNumberBorder: "",
            cardScheme: "",
            ccBackground: "",
            bankNameBackground: "",
            bankNumberBackGround: "",
            nameOnCardBorder: "",
            nameOnCardBackground: "",
            expBorder: "",
            expBackground: "",
            cvcBorder: "",
            cvcBackground: "",
            balBorder: "",
            balBackground: "",
            avalBorder: "",
            avalBackground: "",
            lastPayBorder: "",
            lastPayBackground: "",
            duePayBorder: "",
            duePayBackground: "",
            aprlBorder: "",
            aprlBackground: "",
            cardExpire: "",
            lastPayDateError: "",
            lastPayDateBorder: "",
            lastPayDateBackground: "",
            duePayDateError: "",
            duePayDateBorder: "",
            duePayDateBackground: "",
        })
    }

}
    updateDeal() {
        let { fullName, phone, phone2, cell, address, city, state, zipCode, Notes,
            email, dob, mmn, ssn, cc, bankName, bal, aval, lastPay, duePay,MotherMediansName,
            aprl, nameOnCard, cvc, exp, cardIndex, bankNumber, SecurityWord, AnnualIncome,SocialSecurityNumber,
            ChequinAccount, EmploymentStatus, HousingStatus, MonthlyMortgages, Company,OtherLoan,
            Designation, Education, CloserNotes, lastPayDate, duePayDate } = this.state;
            // console.log(this.state)
          
            // if(!luhn.validate(cc)){
            //     this.setState({
            //         ccBorder: "red",
            //         ccBackground: "#f6e0df",
            //         ccError: "Invalid card number ✗",
            //     })
                
            // }
        if (cc.trim()  === "") {
            let cart=this.state.cardIds
          cart.push(this.state.viewSale.CardID);
            let deal = {
                fullName: fullName.trim() === "" ? this.state.viewSale.FullName : fullName,
                ContactNumber: phone === "" ? this.state.viewSale.ContactNumber : phone,
                phone2: phone2.trim() === "" ? this.state.viewSale.Phone2 : phone2,
                cell: cell.trim() === "" ? this.state.viewSale.CellNumber : cell,
                Address: address.trim() === "" ? this.state.viewSale.Address : address,
                city: city.trim() === "" ? this.state.viewSale.City : city,
                state: state.trim() === "" ? this.state.viewSale.State : state,
                ZipCode: zipCode.trim() === "" ? this.state.viewSale.ZipCode : zipCode,
                email: email.trim() === "" ? this.state.viewSale.Email : email,
                DateOfBirth: dob.trim() === "" ? this.state.viewSale.DateOfBirth : dob,
                MotherMediansName: mmn.trim() === "" ? this.state.viewSale.MotherMediansName : mmn,
                SocialSecurityNumber: ssn.trim() === "" ? this.state.viewSale.SocialSecurityNumber : ssn,
                CardID: cart,
                card: false,
                Notes: Notes.trim() === "" ? this.state.viewSale.Notes : Notes,
                CloserNotes: CloserNotes.trim() === "" ? this.state.viewSale.CloserNotes === undefined ? "nill" : this.state.CloserNotes : CloserNotes,
                AgentStatus: this.state.viewSale.AgentStatus,
                callbackDate: this.state.viewSale.callbackDate,
                callbackTime: this.state.viewSale.callbackTime,
                CloserId: this.state.viewSale.CloserId,
                AgentId: this.state.viewSale.AgentId,
                CloserStatus: this.state.viewSale.CloserStatus,
                TransferDate: this.state.viewSale.TransferDate === undefined ? "" : this.state.viewSale.TransferDate,
                SecurityWord: SecurityWord.trim() === "" ? this.state.viewSale.SecurityWord : SecurityWord,
                Annualincome: AnnualIncome.trim() === "" ? this.state.viewSale.Annualincome : Annualincome,
                Education: Education === "Select" ? this.state.viewSale.Education : Education,
                Designation: Designation.trim() === "" ? this.state.viewSale.Designation : Designation,
                Company: Company.trim() === "" ? this.state.viewSale.Company : Company,
                HousingStatus: HousingStatus === "Select" ? this.state.viewSale.HousingStatus : HousingStatus,
                EmployementStatus: EmploymentStatus === "Select" ? this.state.viewSale.EmployementStatus.EmployementStatus : EmploymentStatus,
                OtherLoans: OtherLoan === "Select" ? this.state.viewSale.OtherLoans : OtherLoan,
                MonthlyRentMortgage: MonthlyMortgages.trim() === "" ? this.state.viewSale.MonthlyRentMortgage : MonthlyMortgages,
                ChequinAccounts: ChequinAccount === "Select" ? this.state.viewSale.ChequinAccounts : ChequinAccount
                
            };
        let identity= this.state.viewSale._id;
           console.log(deal) 
           axios({
               withCredentials:true,
               method:'post',
               url:'/UpdateDeal',
               data:{
                   identity,
                   deal
               }
           })   
           .then(data=>{
               console.log(data.data)
           })
           .catch(err=>{
               this.setState({
                   error:'Could not proceed with the request'
               })
           })      
            // this.setState({ edit: false, pointerEvents: "auto", cardDetail: [] })
            // // this.props.updateDeal(deal)
            // this.state.data.splice(this.state.modalIndex, 1, deal)
            // this.reset()
        }
        // else {
        //     let cardDetailUpdate = {
        //         bankName: bankName === " " ? this.state.data.cardDetail[cardIndex].bankName : bankName,
        //         bankNumber: bankNumber === " " ? this.state.data.cardDetail[cardIndex].bankNumber : bankNumber,
        //         nameOnCard: nameOnCard === " " ? this.state.data.cardDetail[cardIndex].nameOnCard : nameOnCard,
        //         cc: cc === " " ? this.state.data.cardDetail[cardIndex].cc : cc,
        //         cvc: cvc === " " ? this.state.data.cardDetail[cardIndex].cvc : cvc,
        //         exp: exp === " " ? this.state.data.cardDetail[cardIndex].exp : exp,
        //         bal: bal === " " ? this.state.data.cardDetail[cardIndex].bal : bal,
        //         aval: aval === " " ? this.state.data.cardDetail[cardIndex].aval : aval,
        //         lastPay: lastPay === " " || lastPay === "" ? this.state.data.cardDetail[cardIndex].lastPay : lastPay,
        //         lastPayDate: lastPayDate === " " || lastPayDate === "" ? this.state.data.cardDetail[cardIndex].lastPayDate : lastPayDate,
        //         duePay: duePay === " " || duePay === "" ? this.state.data.cardDetail[cardIndex].duePay : duePay,
        //         duePayDate: duePayDate === " " || duePayDate === "" ? this.state.data.cardDetail[cardIndex].duePayDate : duePayDate,
        //         aprl: aprl === " " ? this.state.data.cardDetail[cardIndex].aprl : aprl,
        //         card: true,
        //         cardScheme: this.state.data.cardDetail[cardIndex].cardScheme
        //     }
        //     let { data } = this.state;
        //     data.cardDetail[cardIndex] = cardDetailUpdate;
        //     this.setState({ data })
        //     let deal = {
        //         fullName: fullName === " " ? this.state.data.fullName : fullName,
        //         phone: phone === " " ? this.state.data.phone : phone,
        //         phone2: phone2 === " " ? this.state.data.phone2 : phone2,
        //         cell: cell === " " ? this.state.data.cell : cell,
        //         address: address === " " ? this.state.data.address : address,
        //         city: city === " " ? this.state.data.city : city,
        //         state: state === " " ? this.state.data.state : state,
        //         zipCode: zipCode === " " ? this.state.data.zipCode : zipCode,
        //         email: email === " " ? this.state.data.email : email,
        //         dob: dob === " " ? this.state.data.dob : dob,
        //         date: this.state.data.date,
        //         time: this.state.data.time,
        //         key: this.state.data.key,
        //         mmn: mmn === " " ? this.state.data.mmn : mmn,
        //         ssn: ssn === " " ? this.state.data.ssn : ssn,
        //         card: true,
        //         cardDetail: this.state.data.cardDetail,
        //         ID: this.state.data.ID,
        //         uid: this.state.data.uid,
        //         Notes: Notes.trim() === "" ? this.state.viewSale.Notes : Notes,
        //         CloserNotes: CloserNotes.trim() === "" ? this.state.viewSale.CloserNotes === undefined ? "nill" : this.state.viewSale.CloserNotes : CloserNotes,
        //         status: {
        //             status: this.state.viewSale.status,
        //             callbackDate: this.state.data.status.callbackDate,
        //             callbackTime: this.state.data.status.callbackTime,
        //             transferCloserID: this.state.data.status.transferCloserID,
        //             transferAgentID: this.state.data.status.transferAgentID,
        //             transferAgentName: this.state.data.status.transferAgentName,
        //             statusCloser: this.state.oldSSNList.indexOf(ssn) !== - 1 || this.state.oldCardList.indexOf(this.state.data.cardDetail[cardIndex].cc) !== -1 || this.state.oldPhoneList.indexOf(phone) !== -1 ? "Dublicated" : this.state.data.status.statusCloser,
        //             transferDate: this.state.data.status.transferDate === undefined ? "" : this.state.data.status.transferDate
        //         },
        //         otherDetail: {
        //             SecurityWord: SecurityWord === " " ? this.state.data.otherDetail.SecurityWord : SecurityWord,
        //             AnnualIncome: AnnualIncome === " " ? this.state.data.otherDetail.AnnualIncome : AnnualIncome,
        //             Education: Education === "Select" ? this.state.data.otherDetail.Education : Education,
        //             Designation: Designation === " " ? this.state.data.otherDetail.Designation : Designation,
        //             Company: Company === " " ? this.state.data.otherDetail.Company : Company,
        //             HousingStatus: HousingStatus === "Select" ? this.state.data.otherDetail.HousingStatus : HousingStatus,
        //             EmploymentStatus: EmploymentStatus === "Select" ? this.state.data.otherDetail.EmploymentStatus : EmploymentStatus,
        //             OtherLoan: OtherLoan === "Select" ? this.state.data.otherDetail.OtherLoan : OtherLoan,
        //             MonthlyMortgages: MonthlyMortgages === " " ? this.state.data.otherDetail.MonthlyMortgages : MonthlyMortgages,
        //             ChequinAccount: ChequinAccount === "Select" ? this.state.data.otherDetail.ChequinAccount : ChequinAccount
        //         }
        //     }

        //     console.log("secound")
        //     this.setState({ edit: false, pointerEvents: "auto", cardDetail: [] })
        //     this.props.updateDeal(deal)
        //     this.state.data.splice(this.state.modalIndex, 1, deal)
        //     this.reset()
        // }

    }
    showModal(i,event) {
        console.log( i  + "Shoaib")
        event.preventDefault()
        axios({
            url:'/viewSale',
            withCredentials:true,
            method:'get',
            params:{
                id:i
            }
        })
        .then(res=>{

            console.log(res.data)
            if(res.data){

                
                this.setState({
                    modalIndex: i,
                    modal: "block",
                    pointerEvents: "none",
                    viewSale:res.data.sale,
                    Cards:res.data.cards
                })
            }     
        })
    }
     componentWillMount() {
        axios.get('/all-sales')
      .then( (res) => {
          this.setState({
              data:res.data
            })
        console.log(res);
      })
      .catch( (err) =>{
        console.log(err);
      });
    //     // var today = new Date();
    //     // var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //     let uid = firebase.auth().currentUser.uid
    //     this._isMounted = true;
    //     await firebase.database().ref('/').child(`NewDeals`).on('child_added', (data) => {
    //         for (var key in data.val()) {
    //             for (var key1 in data.val()[key]) {
    //                 if (data.val()[key][key1].cardDetail === "") {

    //                 }
    //                 else {
    //                     for (var i = 0; i < data.val()[key][key1].cardDetail.length; i++) {
    //                         this.state.oldPhoneList.push(data.val()[key][key1].phone)
    //                         this.state.oldSSNList.push(data.val()[key][key1].ssn)
    //                         this.state.oldCardList.push(data.val()[key][key1].cardDetail[i].cc)
    //                         this.setState({
    //                             oldCardList: this.state.oldCardList,
    //                             oldSSNList: this.state.oldSSNList,
    //                             oldPhoneList: this.state.oldPhoneList
    //                         })
    //                     }
    //                 }
    //             }
    //         }
    //         setTimeout(() => {
    //             for (var key in data.val()[uid]) {
    //                 if (this._isMounted) {
    //                     this.state.transferModal.push({ display: "none" })
    //                     this.state.data.push(data.val()[uid][key])
    //                     this.setState({
    //                         data: this.state.data,
    //                         transferModal: this.state.transferModal
    //                     })
    //                 }
    //             }
    //         }, 10)
    //     })
    //     let user = firebase.auth().currentUser
    //     let agent = "Agent"
    //     this.props.getUser(user, agent)
    }
    handleBlur() {
        var is_valid = luhn.validate(this.state.cards[0].CreditCardNumber);
        fetch(`https://lookup.binlist.net/${this.state.cards[0].CreditCardNumber}`)
            .then(response => response.json())
            .then((json) => {
                if (json.bank.phone !== undefined) {
                    this.setState({
                        bankNumber: json.bank.phone,
                        bankNumberBackground: "#d4eed8",
                        bankNumberBorder: "green"
                    })
                }
                if (json.bank.name !== undefined) {
                    this.setState({
                        bankName: json.bank.name,
                        bankNameBackground: "#d4eed8",
                        bankNameBorder: "green"
                    })
                }
                this.setState({ cardScheme: json.scheme })
            })
            .catch((err) => {
                console.log("error", err)
            })
        if (this.state.cc.trim() === "") {
            this.setState({
                ccBorder: "red",
                ccBackground: "#f6e0df",
                ccError: "Insert card number ☒",
            })
        }
        else if (is_valid === false) {
            this.setState({
                ccBorder: "red",
                ccBackground: "#f6e0df",
                ccError: "Invalid card number ✗",
            })
        }
        else if (this.state.oldCardList.indexOf(this.state.cc.replace(/\s/g, '')) !== -1) {
            this.setState({
                ccBorder: "#c62828",
                ccBackground: "",
                ccError: "This card already used please contact to Admin!",
            })
        }
        else {
            this.setState({
                ccBackground: "#d4eed8",
                ccBorder: "green",
                ccError: "Valid Card Number ✓",
            })
        }
    }
        Card() {
        let { data, bankName, bankNumber, nameOnCard, cc, cvc, exp, cardExpire, bal, aval, lastPay, duePay, aprl, cardScheme } = this.state;
        var is_valid = luhn.validate(cc);
        if (cc === " ") {
            this.setState({
                ccBackground: "#f6e0df",
                ccBorder: "red",
                ccError: "Insert card number ☒",
            })
        }
        else if (is_valid === false) {
            this.setState({
                ccBackground: "#f6e0df",
                ccBorder: "red",
                ccError: "Invalid card number ✗",
            })
        }
        else if (nameOnCard === "") {
            this.setState({
                nameOnCardBackground: "#f6e0df",
                nameOnCardBorder: "red"
            })
        }
        else if (cvc.length < 2) {
            this.setState({
                cvcBackground: "#f6e0df",
                cvcBorder: "red"
            })
        }
        else if (exp === " ") {
            this.setState({
                expBackground: "#f6e0df",
                expBorder: "red"
            })
        }
        else if (cardExpire === true) {
            this.setState({
                expBackground: "#f6e0df",
                expBorder: "red"
            })
        }
        else if (exp.indexOf(" ") !== -1) {
            this.setState({
                expBackground: "#f6e0df",
                expBorder: "red"
            })
        }
        else if (bankName.length < 2) {
            this.setState({
                bankNameBorder: "red",
                bankNameBackground: "#f6e0df"
            })
        }
        else if (bal === " ") {
            this.setState({
                balBorder: "red",
                balBackground: "#f6e0df"
            })
        }
        else if (aval === " ") {
            this.setState({
                avalBorder: "red",
                avalBackground: "#f6e0df"
            })
        }
        else if (lastPay.trim() === "") {
            this.setState({
                lastPayBorder: "red",
                lastPayBackground: "#f6e0df"
            })
        }
        else if (duePay.trim() === "") {
            this.setState({
                duePayBorder: "red",
                duePayBackground: "#f6e0df"
            })
        }
        else if (aprl === " ") {
            this.setState({
                aprlBorder: "red",
                aprlBackground: "#f6e0df"
            })
        }
        else {
            if (this.state.data.cardDetail === "") {
                let cardDetail = {
                    bankName: bankName,
                    bankNumber: bankNumber,
                    nameOnCard: nameOnCard,
                    cc: cc,
                    cvc: cvc,
                    exp: exp,
                    bal: bal,
                    aval: aval,
                    lastPay: lastPay,
                    duePay: duePay,
                    aprl: aprl,
                    card: true,
                    cardScheme: cardScheme === "" ? "Unknown" : cardScheme
                }
                this.state.cardDetail.push(cardDetail)
                this.setState({
                    cardDetail: this.state.cardDetail,
                    addNewCard: false
                })
                data.card = true
                data.cardDetail = this.state.cardDetail
                this.setState({ data })
            }
            else {
                let cardDetail = {
                    bankName: bankName,
                    bankNumber: bankNumber,
                    nameOnCard: nameOnCard,
                    cc: cc,
                    cvc: cvc,
                    exp: exp,
                    bal: bal,
                    aval: aval,
                    lastPay: lastPay,
                    duePay: duePay,
                    aprl: aprl,
                    card: true,
                    cardScheme: cardScheme === "" ? "Unknown" : cardScheme
                }
                this.state.cardDetail.push(cardDetail)
                this.setState({
                    cardDetail: this.state.cardDetail,
                    addNewCard: false,
                })
                data.card = true
                this.setState({ data })
                if (!this.state.data.cardDetail) {
                    data.cardDetail = this.state.cardDetail
                    this.setState({ data })
                }
                else {
                    let cardArr = this.state.data.cardDetail.concat(this.state.cardDetail)
                    console.log(cardArr)
                    data.cardDetail = cardArr
                    this.setState({
                        data,
                        bankName: ' ',
                        bankNumber: ' ',
                        nameOnCard: ' ',
                        mmn: ' ',
                        ssn: ' ',
                        cc: ' ',
                        cvc: ' ',
                        exp: ' ',
                        bal: ' ',
                        aval: ' ',
                        lastPay: ' ',
                        duePay: ' ',
                        aprl: ' ',
                    })
                    console.log("Renderr==>>>", this.state.data.cardDetail, this.state.modalIndex)

                }

            }
        }

    }
    addNewCard() {
        let { data } = this.state;
        data.card = false
        this.setState({ data })
        this.setState({
            bankName: " ",
            bankNumber: " ",
            nameOnCard: " ",
            cc: " ",
            cvc: " ",
            exp: " ",
            bal: " ",
            aval: " ",
            lastPay: " ",
            duePay: " ",
            aprl: " ",
            ccBorder: " ",
            ccError: " ",
            bankNameBorder: " ",
            bankNumberBorder: " ",
            cardScheme: " ",
            addNewCard: true,
            cardExpire: ""
        })
    }
    cardExpiry(value) {
        let val = value.substring(0, 2);
        let max = '12';
        if (val.length === 1 && val[0]> max[0]) {
            val = '0' + val;
        }
        if (val.length === 2) {
            if (Number(val) === 0) {
                val = '01';

                //this can happen when user paste number
            } else if (val> max) {
                val = max;
            }
        }
        let month = val;
        let date = value.substring(2, 4);

        return month + (date.length ? '/' + date : '');
    }
    cardExpiryCheck() {
        let { exp } = this.state;
        const month = exp.substring(0, 2)
        const year = 20 + exp.substring(3)
        const expiryDate = new Date(year + '-' + month + '-01');
        if (expiryDate < new Date()) {
            this.setState({ expBorder: "red", expBackground: "#f6e0df", cardExpire: true })
        }
        else if (exp === " " || exp.indexOf('/') === -1) {
            this.setState({ expBorder: "red", expBackground: "#f6e0df" })
        }
        else {
            if (exp.indexOf(" ") === -1 && exp.length === 5) {
                this.setState({
                    expBorder: "green", expBackground: "#d4eed8", cardExpire: false
                })
            }
        }
    }
    onCLose() {
        let { data } = this.state;
        if (data.cardDetail !== "") {
            data.card = true
        }
        this.setState({
            modalIndex: 0,
            modal: "none",
            edit: false,
            cardIndex: 0,
            addNewCard: false,
            pointerEvents: "auto"

        })
        this.reset()
    }
    saleTransfer(admin, i) {
        let { data, transferPassword } = this.state;
        var today = new Date();
        let user = firebase.auth().currentUser;
        let that = this;
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        if (typeof admin === 'undefined' || transferPassword === "") {
            this.setState({
                transferErrorDisplay: "block"
            })
        } else {
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, transferPassword)
                .then((res) => {
                    let Admin = JSON.parse(admin.transferCloser);
                    data[i].status.status = "Transfer";
                    data[i].status.transferAdminID = Admin.id;
                    data[i].status.transferAdminName = Admin.name;
                    data[i].status.statusCloser = "Transfer";
                    data[i].status.statusAdmin = "Pending";
                    firebase.database().ref('/').child(`NewDeals/${date}/${Admin.id}/${data[i].key}`).set(data[i])
                        .then(() => {
                            firebase.database().ref('/').child(`NewDeals/${data[i].date}/${data[i].status.transferCloserID}/${data[i].key}`).set(data[i])
                                .then(() => {
                                    this.setState({
                                        data: this.state.data
                                    })
                                    console.log("chal raha hai", data)
                                })
                        })
                    that.setState({
                        transferErrorDisplay: "none"
                    })
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        that.setState({
                            transferErrorDisplay: "block",
                            transferErrorMessage: "Incorrect password !"
                        })
                    } else {
                        that.setState({
                            transferErrorDisplay: "block",
                            transferErrorMessage: errorMessage
                        })
                    }
                });
        }
    }
    // componentWillUnmount() {
    //     this._isMounted = false;
    // }
    reset() {
        this.setState({
            modalIndex: 0,
            modal: "none",
            edit: false,
            fullName: ' ',
            phone: ' ',
            cell: ' ',
            address: ' ',
            city: ' ',
            state: ' ',
            zipCode: '',
            email: ' ',
            dob: ' ',
            bankName: ' ',
            bankNumber: ' ',
            nameOnCard: ' ',
            mmn: ' ',
            ssn: ' ',
            cc: ' ',
            cvc: ' ',
            exp: ' ',
            bal: ' ',
            aval: ' ',
            lastPay: ' ',
            duePay: ' ',
            aprl: ' ',
            cardIndex: 0,
            focused: "cc",
            ccError: "",
            ccBorder: "",
            nameOnCardBackground: "",
            nameOnCardBorder: "",
            cvcBorder: "",
            cvcBackground: "",
            expBorder: "",
            expBackground: "",
            cardDetail: [],
            addNewCard: false,
            ccBackground: "",
            bankNameBorder: "",
            bankNameBackground: "",
            bankNumberBorder: "",
            bankNumberBackground: "",
            balBorder: "",
            balBackground: "",
            avalBorder: "",
            avalBackground: "",
            lastPayBorder: "",
            lastPayBackground: "",
            duePayBorder: "",
            duePayBackground: "",
            aprlBorder: "",
            aprlBackground: "",
            cardExpire: "",
            cardScheme: "",
            transferCloser: [],
            Notes: " ",
            SecurityWordBorder: "",
            SecurityWordBackground: "",
            EducationBorder: "",
            EducationBackground: "",
            HousingStatusBorder: "",
            HousingStatusBackground: "",
            ChequinAccountBorder: "",
            ChequinAccountBackground: "",
            OtherLoanBorder: "",
            OtherLoanBackground: "",
            CompanyBorder: "",
            CompanyBackground: "",
            DesignationBorder: "",
            DesignationBackground: "",
            AnnualIncomeBorder: "",
            AnnualIncomeBackground: "",
            MonthlyMortgagesBorder: "",
            MonthlyMortgagesBackground: "",
            EmploymentStatusBorder: "",
            EmploymentStatusBackground: ""
        })
    }
    statusModalOpen(i) {
        let { transferModal } = this.state;
        transferModal[i].display = "block"
        this.setState({
            transferModal: transferModal,
            pointerEvents: "none"
        })
    }
    onTransferCLose(i) {
        let { transferModal } = this.state;
        transferModal[i].display = "none"
        this.setState({
            transferModal: transferModal,
            pointerEvents: "auto",
            transferCloser: []
        })
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    kickBack(transferAgentID, transferAgentName, key, transferCloserID, transferCloserName, date, saleDate, i, transferAdminID, transferAdminName) {
        return
        let { data, CloserNotes } = this.state;
        var today = new Date();
        var dateToday = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let status = {
            status: "Transfer",
            statusAdmin: "",
            statusCloser: "Kick Back",
            statusFromCloser: "Kick Back",
            callbackDate: "",
            callbackTime: "",
            transferCloserID: transferCloserID,
            transferCloserName: transferCloserName,
            transferAgentID: transferAgentID,
            transferAgentName: transferAgentName,
            transferDate: date,
            transferAdminID: transferAdminID,
            transferAdminName: transferAdminName
        }
        data[i].status = status;
        data[i].CloserNotes = CloserNotes;
        this.setState({
            data: this.state.data
        })
        // firebase.database().ref('/').child(`NewDeals/${dateToday}/${transferCloserID}/${key}`).set(this.state.data[i])
        //     .then(() => {
        //         data.splice(i, 1)
        //         this.setState({
        //             data: this.state.data
        //         })
        //         firebase.database().ref('/').child(`NewDeals/${date}/${transferAdminID}/${key}`).remove()
        //             .then(() => {
        //                 if (dateToday !== saleDate) {
        //                     firebase.database().ref('/').child(`NewDeals/${saleDate}/${transferCloserID}/${key}`).remove()
        //                 }
        //             })
        //     })
    }
    findPhone(phone,e){
        e.preventDefault();
        if(phone.trim()=="")
        {

            axios({
                withCredentials:true,
                method:'get',
                url:'/findphone',
                params:{
                    id:phone
                }
            })
            .then(data=>{
                if(this.state.found){
                    this.setState({ phoneBorder: '#c62828', phoneError: "This Phone already used please contact to admin" })   
                }
            })
        }
    }
    updateStatus(agentID, closerID, adminID, salekey) {
        console.log("1")
        firebase.database().ref('/').child(`NewDeals`).on('value', (data) => {
            for (var key in data.val()) {
                if (data.val()[key][agentID]) {
                    if (data.val()[key][agentID][salekey]) {
                        firebase.database().ref('/').child(`NewDeals/${key}/${agentID}/${salekey}/status/status`).set(this.state.statusAgent)
                        // .then(()=>{
                        //     firebase.database().ref('/').child(`NewDeals/${key}/${adminID}/${salekey}/status/statusCloser`).set(this.state.statusCloser).then(()=>{
                        //         firebase.database().ref('/').child(`NewDeals/${key}/${adminID}/${salekey}/status/status`).set(this.state.statusAgent)  
                        //     })
                        // })
                    }
                }
                if (data.val()[key][closerID]) {
                    if (data.val()[key][closerID][salekey]) {
                        // firebase.database().ref('/').child(`NewDeals/${key}/${closerID}/${salekey}/status/statusCloser`).set(this.state.statusCloser)
                        // .then(()=>{
                        //     firebase.database().ref('/').child(`NewDeals/${key}/${adminID}/${salekey}/status/statusCloser`).set(this.state.statusCloser)
                        //     .then(()=>{
                        //         firebase.database().ref('/').child(`NewDeals/${key}/${adminID}/${salekey}/status/status`).set(this.state.statusAgent)
                        //         this.setState({
                        //             statusUpdateDisplay: "block"
                        //         })
                        //         setTimeout(() => {
                        //             this.setState({
                        //                 statusUpdateDisplay: "none"
                        //             })
                        //         }, 3000)
                        //     })
                        // })
                    }
                }
            }
        })
    }
    render() {
        const OtherLoanOptions =["Select","Loan","Mortgages","Loan-Mortgages","Other"]
        const ChequinAccountOptions =["Select","Chequin","Saving","Chequin-Saving","None"]
        const HousingStatusOptions = ["Select","Own Home","Rent","Other"]
        const EmploymentStatusOptions =["Select","Employed Full-Time","Employed Part-Time","Self-Employed","Unemployed","Retired","College Student","Other"]
        const EducationOptions =["Select","Less than a high school diploma","High school diploma or GED","Some college or associate degree","Bachelor's Degree","Advanced/Graduate Degree"]
        const StatusOptions = ['Transfer','Pending','Approved','Rejected','Charged Back']


        console.log(this.state.viewSale)
        const filter = this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        let { fullName, phone,phone2,cell, address,city, state,
            zipCode, email, dob, bankName, bankNumber, nameOnCard,
            mmn, ssn, cc, cvc, exp, bal, aval, lastPay, duePay, aprl,
            SecurityWord, EmploymentStatus, HousingStatus,
            ChequinAccount, OtherLoan, Company, Designation, MonthlyMortgages,
            Annualincome, CloserNotes, duePayDate, lastPayDate, Education } = this.state;
         
            let user = {};
        return (
            <div className="animated fadeIn">
                <Row style={{ pointerEvents: this.state.pointerEvents }}>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader style={{ backgroundColor: "#2f353a", color: "#fff" }}>
                                <i className="fa fa-align-justify" style={{ marginTop: 10 }}></i> All Sales
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
                                            <th>View</th>
                                            <th>Kick Back</th>
                                            <th>View Status</th>
                                            <th>Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data.map((v, i) => {
                                            // let { transferAgentID, transferAgentName, transferCloserID, transferCloserName, transferDate, transferAdminID, transferAdminName } = v.status;
                                            return (
                                                <tr key={i}>
                                                    <td>{v._id}</td>
                                                    <td>{v.FullName}</td>
                                                    <td>{v.status === "Transfer" || v.status === "Duplicated" ? <b>**********</b> : v.phone}</td>
                                                    <td>{new Date(v.createdAt).toLocaleTimeString()}</td>
                                                    <td>{new Date(v.createdAt).toDateString()}</td>
                                                    <td title={v.status === "Call Back" ? v.callbackDate + " " + v.callbackTime : ""}>
                                                        <Badge style={{ width: 100, height: 25, paddingTop: 7, backgroundColor: v.Status === "Pending" ? '#ffab00' : v.Status === "Transfer" ? '#e4e5e6' : v.Status === "Kick Back" ? "#ff7043" : v.Status === "Duplicated" ? "#ff8a65" : v.Status === "Approved" ? '#4caf50' : v.Status === "Rejected" ? "#d32f2f" : '#81d4fa' }}><i className={v.Status === "Pending" ? "fa fa-spinner" : v.Status === "Transfer" ? "fa fa-exchange" : v.Status === "Kick Back" ? "fa fa-backward" : v.Status === "Duplicated" ? "fa fa-clone" : v.Status === "Approved" ? "fa fa-check" : v.Status === "Rejected" ? "fa fa-exclamation-triangle" : "fa fa-phone"}></i>{v.Status === "Call Back" ? <i className="fa fa-clock"></i> : " "} {v.Status}</Badge>
                                                    </td>
                                                    <td>
                                                        {v.Status.statusAdmin === "Duplicated" ?
                                                            <Button size="sm" color={'outline-dark'} disabled><i className="fa fa-exclamation-circle"></i> Disabled</Button>
                                                            :
                                                            <Button size="sm" onClick={this.showModal.bind(this,v._id)} color={v.Status.statusAdmin === "Transfer" ? 'outline-dark' : 'outline-primary'} ><i className={v.Status === "Transfer" ? "fa fa-exclamation-circle" : "fa fa-search"}></i> {v.Status === "Transfer" ? "Disabled" : "View"}</Button>
                                                        }
                                                    </td>
                                                    <td>
                                                         <Button title={`To ${v.Status}`} size="sm" color={'outline-danger'} onClick={()=>{}}><i className="fa fa-backward"></i> Kick Back</Button> 
                                        
                                                    </td>
                                                    <td>
                                                        <Button size="sm" color={'outline-success'} onClick={this.statusModalOpen.bind(this, i)}><i className="fa fa-eye"></i> View Status</Button>
                                                        <div id="transferModal" className="modal" style={{ position: 'fixed', zIndex: 1, paddingTop: '100px', left: 0, top: 0, right: 0, width: '40%', height: '100%', overflow: 'auto', margin: "0 auto", marginTop: "90px", display: "none" }}>
                                                            <div className="modal-content">
                                                                <div><p style={{ float: 'left', marginTop: 5 }}><b>ID#{v.ID}</b></p><p style={{ float: 'right' }} className="close" onClick={this.onTransferCLose.bind(this, i)}>&times;</p></div>
                                                                <Row>
                                                                    <Col>
                                                                        <Label htmlFor="vat">Agent: {v.Status}</Label>
                                                                        <select
                                                                            onChange={(e) => {
                                                                                let { statusAgent } = this.state;
                                                                                this.setState({ statusAgent: e.target.value })
                                                                            }}
                                                                            className="format" value={this.state.statusAgent === "" ? v.Status : this.state.stusAgent}>
                                                                               <OptionsList Options={StatusOptions}/>
                                                                        </select>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Label htmlFor="vat">Closer: {v.Status}</Label>
                                                                        <select
                                                                            onChange={(e) => {
                                                                                let { statusCloser } = this.state;
                                                                                this.setState({ statusCloser: e.target.value })
                                                                            }}
                                                                            className="format" value={this.state.statusCloser === "" ? v.status : this.state.statusCloser}>
                                                                            {/* <option value="Transfer">Transfer</option>
                                                                            <option value="Pending">Pending</option>
                                                                              <option value="Approved">Approved</option>
                                                                            <option value="Rejected">Rejected</option>
                                                                            <option value="Charged Back">Charged Back</option> */}
                                                                            <OptionsList Options={StatusOptions}/>
                                                                        </select>
                                                                    </Col>
                                                                </Row>
                                                                <Button size="sm" color={'success'} onClick={this.updateStatus.bind(this, v.status, v.status, v.status, v.key)} style={{ padding: 6, marginTop: 20 }}><i className="fa fa-exchange"></i>{" "}Update Status</Button>
                                                                <div style={{ textAlign: "center", display: this.state.statusUpdateDisplay }}><span style={{ color: "green" }}>{this.state.statusUpdate}</span></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Workbook filename={v._id + ".xlsx"} element={<div className="clearfix">
                                                            <div className="float-left"></div>
                                                            <Button color="outline-success" onClick={() => {
                                                            }}><i className="fa fa-download"></i>{" "}Download</Button>
                                                        </div>}>
                                                            <Workbook.Sheet data={[v]} name="Sheet A">
                                                                <Workbook.Column label="ID" value="_id" />
                                                                <Workbook.Column label="Date" value="createdAt" />
{/* 
                                                                <Workbook.Column label="ID" value="ID" />
                                                                <Workbook.Column label="Date" value="date" />
 */}




                                                                {/* <Workbook.Column label="Full Name" value="fullName" />
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
                                                                <Workbook.Column label="Notes" value="Notes" /> */}
                                                            </Workbook.Sheet>
                                                        </Workbook>
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
                <div id="transferModal" className="modalView" style={{ position: 'fixed', zIndex: 1, paddingTop: '100px', left: 0, top: 0, right: 0, width: '60%', height: '100%', overflow: 'auto', margin: "0 auto", display: this.state.modal }}>
                    <div>
                        <div className="modal-content">
                            <div style={{ float: 'right' }} onClick={this.onCLose.bind(this)}><p className="close"><i className="fa fa-times"></i></p></div>
                            <Col xs="12" lg="12" sm="12">
                                <Card>
                                    {this.state.edit === true ?
                                    
                                    
                                    <CardBody>
                                    {console.log('in edit')}
                                    {console.log(this.state.Cards)}
                                            {typeof this.state.viewSale === "undefined" ?
                                                null
                                                :
                                                this.state.Cards.length!=0?
                                                    
                                                    <div>
                                                        <Table responsive bordered style={{ textAlign: "center" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-date"></i> {new Date(this.state.viewSale.createdAt).toDateString()}</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-time"></i> {new Date(this.state.viewSale.createdAt).toLocaleTimeString()}</b></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-user"></i> Customar Detail</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-credit-card"></i> Card Detail</b></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Full Name</b></td>
                                                                    <td><input type="text" className="format" value={fullName.trim() === "" ? this.state.viewSale.FullName : fullName} onChange={e => this.setState({ fullName: e.target.value })} /></td>
                                                                    <td colSpan="2" rowSpan="4">
                                                                        <FormGroup row className="my-0">
                                                                            <Col xs="12">
                                                                                <Col xs="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="city">CC</Label>
                                                                                        <NumberFormat style={{ backgroundColor: "#e4e7ea" }} disabled displayType={'input'} className="format" format="################" id="cc" placeholder="Credit Card Number" value={cc.trim() === "" ? this.state.Cards[0].CreditCardNumber : cc} onBlur={this.handleBlur.bind(this)} onChange={e => this.setState({ cc: e.target.value })} />
                                                                                        {this.state.ccError === "" ?
                                                                                            null
                                                                                            :
                                                                                            <p style={{ color: this.state.ccBorder, float: "right", marginBottom: "0rem" }}>{this.state.ccError}</p>
                                                                                        }
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xs="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="vat">Name On Card</Label>
                                                                                        <span style={{ backgroundColor: "#e4e7ea" }} className="format" disabled> {this.state.Cards[0].NameOnCard}</span>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xs="12">
                                                                                    <FormGroup row className="my-0">
                                                                                        <Col xs="6">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="postal-code">CVC</Label>
                                                                                                <span style={{ backgroundColor: "#e4e7ea" }} className="format" disabled> {this.state.Cards[0].CVC}</span>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                        <Col xs="6">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="country">Exp#</Label>
                                                                                                <NumberFormat style={{ backgroundColor: "#e4e7ea" }} disabled format={this.cardExpiry} className="format" id="exp" placeholder="CC Expiration" value={exp.trim() === "" ? this.state.Cards[0].ExpireDate : exp} onChange={e => this.setState({ exp: e.target.value })} />

                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </FormGroup>
                                                                                </Col>

                                                                            </Col>
                                                                        </FormGroup>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone</b></td>
                                                                    <td>
                                                                        <NumberFormat format="+# (###) ###-####" style={{ borderColor: this.state.phoneBorder }} className="format" value={phone.trim() === "" ? this.state.viewSale.ContactNumber : phone} onChange={e => this.setState({ phone: e.target.value })} onBlur={this.findPhone.bind(this)} />
                                                                        {this.state.phoneError === "" ?
                                                                            null
                                                                            :
                                                                            <small style={{ color: 'red', float: 'right' }}>{this.state.phoneError}</small>
                                                                        }
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td><b>Cell</b></td>
                                                                    <td><NumberFormat className="format" value={cell.trim() === "" ? this.state.viewSale.CellNumber.trim() === "" ? "Not Provided" : this.state.viewSale.CellNumber : cell} onChange={e => this.setState({ cell: e.target.value })} /></td>
                                                                </tr>
                                                                <tr >
                                                                    <td><b>Address</b></td>
                                                                    <td><input type="text" className="format" value={address.trim() === "" ? this.state.viewSale.Address : address} onChange={e => this.setState({ address: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>City</b></td>
                                                                    <td><input type="text" className="format" value={city.trim() === "" ? this.state.viewSale.City : city} onChange={e => this.setState({ city: e.target.value })} /></td>
                                                                    <td><b>Bank Name</b></td> {console.log()}
                                                                    <td><input type="text" className="format" value={bankName.trim() === "" ? this.state.Cards[0].BankName : bankName} onChange={e => this.setState({ bankName: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>State</b></td>
                                                                    <td><input type="text" className="format" value={state.trim() === "" ? this.state.viewSale.State : state} onChange={e => this.setState({ state: e.target.value })} /></td>
                                                                    <td><b>Bank Number</b></td>
                                                                    <td><NumberFormat className="format" value={bankNumber.trim() === "" ? this.state.Cards[0].BankNumber === "" ? "Not Provided" : this.state.Cards[0].BankNumber : bankNumber} onChange={e => this.setState({ bankNumber: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Zip Code</b></td>
                                                                    <td><NumberFormat className="format" value={zipCode.trim() === "" ? this.state.viewSale.ZipCode : zipCode} onChange={e => this.setState({ zipCode: e.target.value })} /></td>
                                                                    <td><b>Balance</b></td>
                                                                    <td><NumberFormat className="format" prefix={'$'} thousandSeparator={true} value={bal.trim() === "" ? this.state.Cards[0].Balance : bal} onChange={e => this.setState({ bal: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Email</b></td>
                                                                    <td><input type="text" className="format" value={email.trim() === "" ? this.state.viewSale.Email === "" ? "Not Provided" : this.state.viewSale.Email : email} onChange={e => this.setState({ email: e.target.value })} /></td>
                                                                    <td><b>Available</b></td>
                                                                    <td><NumberFormat className="format" prefix={'$'} thousandSeparator={true} value={aval.trim() === "" ? this.state.Cards[0].Available : aval} onChange={e => this.setState({ aval: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>DOB</b></td>
                                                                    <td><input type="date" className="format" value={dob.trim() === "" ? this.state.viewSale.DateOfBirth : dob} onChange={e => this.setState({ dob: e.target.value })} /></td>
                                                                    <td><b>Last Pay</b></td>
                                                                    <td>
                                                                        <NumberFormat className="format" prefix={'$'} thousandSeparator={true} value={lastPay.trim() === "" ? this.state.Cards[0].LastPayment : lastPay} onChange={e => this.setState({ lastPay: e.target.value })} />
                                                                        <NumberFormat className="format" format="##/##" placeholder="MM/DD" value={lastPayDate.trim() === "" ? this.state.Cards[0].lastPayDate : lastPayDate} onChange={e => this.setState({ lastPayDate: e.target.value })} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>MMN</b></td>
                                                                    <td><input type="text" className="format" value={mmn.trim() === "" ? this.state.viewSale.MotherMediansName: mmn} onChange={e => this.setState({ mmn: e.target.value })} /></td>
                                                                    <td><b>Due Pay</b></td>
                                                                    <td><NumberFormat className="format" prefix={'$'} thousandSeparator={true} value={duePay.trim() === "" ? this.state.Cards[0].DuePayment : duePay}    onChange={e => this.setState({ duePay: e.target.value })} />
                                                                        <NumberFormat className="format" format="##/##" placeholder="MM/DD" value={duePayDate.trim() === "" ? this.state.Cards[0].DuePayDate : duePayDate} onChange={e => this.setState({ duePayDate: e.target.value })} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>SSN</b></td>
                                                                    <td>
                                                                        <NumberFormat format="###-##-####" style={{ borderColor: this.state.SSNBorder }} className="format" value={ssn.trim() === "" ? this.state.viewSale.SocialSecurityNumber : ssn} onChange={e => this.setState({ ssn: e.target.value })} onBlur={() => { if (this.state.oldSSNList.indexOf(ssn) !== -1) { this.setState({ SSNBorder: '#c62828', SSNError: "This SSN already used please contact to admin" }) } }} />
                                                                        {this.state.SSNError === "" ?
                                                                            null
                                                                            :
                                                                            <small style={{ color: 'red', float: 'right' }}>{this.state.SSNError}</small>
                                                                        }
                                                                    </td>
                                                                    <td><b>Interest Rate</b></td>
                                                                    <td><NumberFormat className="format" format="##.##%" value={aprl.trim() === "" ? this.state.Cards[0].InterestRate : aprl} onChange={e => this.setState({ aprl: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone2</b></td>
                                                                    <td><NumberFormat format="+# (###) ###-####" className="format" value={phone2.trim() === "" ? this.state.viewSale.Phone2 : phone2} onChange={e => this.setState({ phone2: e.target.value })} /></td>
                                                                    <td colSpan="2">
                                                                  
                                                                        {
                                                                            this.state.Cards.map((v, i) =>
                                                                                <div key={i} style={{ display: "inline" }} key={i}>
                                                                                    {
                                                                                        v.CardScheme === "mastercard" ?
                                                                                            <span onClick={() => this.setState({ cardIndex: i })}><Master /></span>
                                                                                            :
                                                                                            v.CardScheme === "visa" ?
                                                                                                <span onClick={() => this.setState({ cardIndex: i })}> <Visa /> </span>
                                                                                                :
                                                                                                v.CardScheme === "discover" ?
                                                                                                    <span onClick={() => this.setState({ cardIndex: i })}>  <Discover /> </span>
                                                                                                    :
                                                                                                    v.CardScheme === "amex" ?
                                                                                                        <span onClick={() => this.setState({ cardIndex: i })}> <Amex /> </span>
                                                                                                        :
                                                                                                        <i className="fa fa-credit-card fa-2x" style={{ marginRight: "3px", color: "##2f353a" }}></i>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                        <i className="fa fa-plus-square fa-2x" style={{ marginRight: "3px", color: "##2f353a", cursor: "pointer" }} onClick={this.addNewCard.bind(this)}></i>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2">
                                                                        {this.state.addNewCard === true ?
                                                                            <Button size="sm" color="#2f353a" style={{ width: "100%", height: "35px" }} onClick={this.saveCard.bind(this)}>Save Credit Card</Button>
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr border="2">
                                                                    <td colSpan="4"><b style={{ fontSize: 16 }}>Other Detail</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>SecurityWord</b></td>
                                                                    <td colSpan="2"><input type="text" className="format" style={{ borderColor: this.state.SecurityWordBorder, backgroundColor: this.state.SecurityWordBackground }} value={SecurityWord.trim() === "" ? this.state.viewSale.SecurityWord : SecurityWord} onChange={e => this.setState({ SecurityWord: e.target.value, SecurityWordBorder: "", SecurityWordBackground: "" })} onBlur={() => { if (SecurityWord.length> 1 || this.state.viewSale.SecurityWord.length> 1) { this.setState({ SecurityWordBorder: 'green', SecurityWordBackground: "#d4eed8" }) } else { this.setState({ SecurityWordBorder: 'red', SecurityWordBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Highest Level Edu</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={Education === "Select" ? this.state.viewSale.HighestLevelofEducation : Education} style={{ borderColor: this.state.EducationBorder, backgroundColor: this.state.EducationBackground }} onChange={e => this.setState({ Education: e.target.value, EducationBorder: "", EducationBackground: "" })} onBlur={() => { if (Education !== "Select" || this.state.viewSale.HighestLevelofEducation !== "") { this.setState({ EducationBorder: 'green', EducationBackground: "#d4eed8" }) } else { this.setState({ EducationBorder: 'red', EducationBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Less than a high school diploma">Less than a high school diploma</option>
                                                                            <option value="High school diploma or GED">High school diploma or GED</option>
                                                                            <option value="Some college or associate degree">Some college or associate degree</option>
                                                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                                                            <option value="Advanced/Graduate Degree">Advanced/Graduate Degree</option> */}
                                                                            <OptionsList Options={EducationOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Employment Status</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={EmploymentStatus === "Select" ? this.state.viewSale.EmployementStatus : EmploymentStatus} style={{ borderColor: this.state.EmploymentStatusBorder, backgroundColor: this.state.EmploymentStatusBackground }} onChange={e => this.setState({ EmploymentStatus: e.target.value, EmploymentStatusBorder: "", EmploymentStatusBackground: "" })} onBlur={() => { if (EmploymentStatus !== "Select" || this.state.EmploymentStatus !== "") { this.setState({ EmploymentStatusBorder: 'green', EmploymentStatusBackground: "#d4eed8" }) } else { this.setState({ EmploymentStatusBorder: 'red', EmploymentStatusBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Employed Full-Time">Employed Full-Time</option>
                                                                            <option value="Employed Part-Time">Employed Part-Time</option>
                                                                            <option value="Self-Employed">Self-Employed</option>
                                                                            <option value="Unemployed">Unemployed</option>
                                                                            <option value="Retired">Retired</option>
                                                                            <option value="Other">Other</option>
                                                                            <option value="College Student">College Student</option> */}
                                                                           <OptionsList Options={EmploymentStatusOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Housing Status</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={HousingStatus === "Select" ? this.state.viewSale.HousingStatus : HousingStatus} style={{ borderColor: this.state.HousingStatusBorder, backgroundColor: this.state.HousingStatusBackground }} onChange={e => this.setState({ HousingStatus: e.target.value, HousingStatusBorder: "", HousingStatusBackground: "" })} onBlur={() => { if (HousingStatus !== "Select" || this.state.viewSale.HousingStatus !== "") { this.setState({ HousingStatusBorder: 'green', HousingStatusBackground: "#d4eed8" }) } else { this.setState({ HousingStatusBorder: 'red', HousingStatusBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Own Home">Own Home</option>
                                                                            <option value="Rent">Rent</option>
                                                                            <option value="Other">Other</option> */}
                                                                             <OptionsList Options={HousingStatusOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Company</b></td>
                                                                    <td colSpan="2"><input type="text" style={{ borderColor: this.state.CompanyBorder, backgroundColor: this.state.CompanyBackground }} className="format" value={Company === " " ? this.state.viewSale.Company : Company} onChange={e => this.setState({ Company: e.target.value, CompanyBorder: "", CompanyBackground: "" })} onBlur={() => { if (Company.length> 1 || this.state.viewSale.Company !== "") { this.setState({ CompanyBorder: 'green', CompanyBackground: "#d4eed8" }) } else { this.setState({ CompanyBorder: 'red', CompanyBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Designation</b></td>
                                                                    <td colSpan="2"><input type="text" className="format" style={{ borderColor: this.state.DesignationBorder, backgroundColor: this.state.DesignationBackground }} value={Designation.trim() === "" ? this.state.viewSale.Designation : Designation} onChange={e => this.setState({ Designation: e.target.value, DesignationBackground: "", DesignationBorder: "" })} onBlur={() => { if (Designation.length> 1 || this.state.viewSale.otherDetail.Designation !== "") { this.setState({ DesignationBorder: 'green', DesignationBackground: "#d4eed8" }) } else { this.setState({ DesignationBorder: 'red', DesignationBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Annual income</b></td>
                                                                    <td colSpan="2"><NumberFormat displayType={'input'} placeholder="Annual income" thousandSeparator={true} prefix={'$'} style={{ borderColor: this.state.AnnualIncomeBorder, backgroundColor: this.state.AnnualIncomeBackground }} className="format" value={Annualincome === " " ? this.state.viewSale.otherDetail.AnnualIncome : Annualincome} onChange={e => this.setState({ AnnualIncome: e.target.value, AnnualIncomeBorder: "", AnnualIncomeBackground: "" })} onBlur={() => { if (AnnualIncome.length> 1 || this.state.viewSale.AnnualIncome !== "") { this.setState({ AnnualIncomeBorder: 'green', AnnualIncomeBackground: "#d4eed8" }) } else { this.setState({ AnnualIncomeBorder: 'red', AnnualIncomeBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Chequin Accounts</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={ChequinAccount === "Select" ? this.state.viewSale.ChequinAccounts : ChequinAccount} style={{ borderColor: this.state.ChequinAccountBorder, backgroundColor: this.state.ChequinAccountBackground }} onChange={e => this.setState({ ChequinAccount: e.target.value, ChequinAccountBorder: "", ChequinAccountBackground: "" })} onBlur={() => { if (ChequinAccount !== "Select" || this.state.data.otherDetail.ChequinAccount !== "") { this.setState({ ChequinAccountBorder: 'green', ChequinAccountBackground: "#d4eed8" }) } else { this.setState({ ChequinAccountBorder: 'red', ChequinAccountBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Chequin">Chequin</option>
                                                                            <option value="Saving">Saving</option>
                                                                            <option value="Chequin-Saving">Chequin-Saving</option>
                                                                            <option value="None">None</option> */}
                                                                            <OptionsList Options={ChequinAccountOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Other Loans</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={OtherLoan === "Select" ? this.state.viewSale.OtherLoans : OtherLoan} style={{ borderColor: this.state.OtherLoanBorder, backgroundColor: this.state.OtherLoanBackground }} onChange={e => this.setState({ OtherLoan: e.target.value, OtherLoanBorder: "", OtherLoanBackground: "" })} onBlur={() => { if (OtherLoan !== "Select" || this.state.viewSale.OtherLoans !== "") { this.setState({ OtherLoanBorder: 'green', OtherLoanBackground: "#d4eed8" }) } else { this.setState({ OtherLoanBorder: 'red', OtherLoanBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Loan">Loan</option>
                                                                            <option value="Mortgages">Mortgages</option>
                                                                            <option value="Loan-Mortgages">Loan-Mortgages</option>
                                                                            <option value="Other">Other</option> */}
                                                                            <OptionsList Options={OtherLoanOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Monthly Rent/Mortgage</b></td>
                                                                    <td colSpan="2"><NumberFormat displayType={'input'} placeholder="Monthly Rent/Mortgage" thousandSeparator={true} prefix={'$'} style={{ borderColor: this.state.MonthlyMortgagesBorder, backgroundColor: this.state.MonthlyMortgagesBackground }} className="format" value={MonthlyMortgages.trim() === "" ? this.state.viewSale.MonthlyRentMortgage : MonthlyMortgages} onChange={e => this.setState({ MonthlyMortgages: e.target.value, MonthlyMortgagesBorder: "", MonthlyMortgagesBackground: "" })} onBlur={() => { if (MonthlyMortgages.length> 1 || this.state.data.otherDetail.MonthlyMortgages !== "") { this.setState({ MonthlyMortgagesBorder: 'green', MonthlyMortgagesBackground: "#d4eed8" }) } else { this.setState({ MonthlyMortgagesBorder: 'red', MonthlyMortgagesBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>

                                                                <tr>
                                                                    <td><b>Closer Notes</b></td>
                                                                    <td colSpan="4">
                                                                        <FormGroup>
                                                                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="4"
                                                                                placeholder="Closer Notes" value={CloserNotes.trim() === "" ? this.state.viewSale.CloserNotes === undefined ? CloserNotes : this.state.viewSale.CloserNotes : CloserNotes} onChange={(e) => this.setState({ CloserNotes: e.target.value })} />
                                                                        </FormGroup>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Agent Notes</b></td>
                                                                    <td colSpan="4" style={{ backgroundColor: "#c8ced3" }}>
                                                                        {this.state.viewSale.Notes}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                        <Button size="sm" color="primary" style={{ width: "100%", height: "35px" }} onClick={this.updateDeal.bind(this)}><i className="fa fa-check"></i>Update</Button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Table responsive bordered style={{ textAlign: "center" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-date"></i> {new Date(this.state.viewSale.date).toLocaleDateString()}</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-time"></i> {new Date(this.state.viewSale.date).toLocaleTimeString()}</b></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-user"></i> Customar Detail</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-credit-card"></i> Card Detail</b></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Full Name</b></td>
                                                                    <td><input type="text" className="format" value={fullName === " " ? this.state.viewSale.FullName : fullName} onChange={e => this.setState({ fullName: e.target.value })} /></td>
                                                                    <td colSpan="2" rowSpan="4">
                                                                        <FormGroup row className="my-0">
                                                                            <Col xs="12">
                                                                                <Col xs="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="city">CC</Label> 
                                                                                        <NumberFormat displayType={'input'} style={{ borderColor: this.state.ccBorder, backgroundColor: this.state.ccBackground }} className="format" format="################" id="cc" placeholder="Credit Card Number" onBlur={this.handleBlur.bind(this)} value={this.state.Cards[0].CreditCardNumber} onChange={e => this.setState({ cc: e.target.value, ccBorder: "", ccError: "", ccBackground: "" })} />
                                                                                        {this.state.ccError === "" ?
                                                                                            null
                                                                                            :
                                                                                            <p style={{ color: this.state.ccBorder, float: "right", marginBottom: "0rem" }}>{this.state.ccError}</p>
                                                                                        }
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xs="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="vat">Name On Card</Label>
                                                                                        <Input type="text" id="nameOnCard" style={{ borderColor: this.state.nameOnCardBorder, backgroundColor: this.state.nameOnCardBackground }} placeholder="Name On Card" value={this.state.Cards[0].NameOnCard} onBlur={() => { if (nameOnCard.length> 3) { this.setState({ nameOnCardBorder: "green", nameOnCardBackground: "#d4eed8" }) } else { this.setState({ nameOnCardBorder: "red", nameOnCardBackground: "#f6e0df" }) } }} onChange={e => this.setState({ nameOnCard: e.target.value, nameOnCardBorder: "", nameOnCardBackground: "" })} />
                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col xs="12">
                                                                                    <FormGroup row className="my-0">
                                                                                        <Col xs="6">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="postal-code">CVC</Label>
                                                                                                <NumberFormat displayType={'input'} className="format" style={{ borderColor: this.state.cvcBorder, backgroundColor: this.state.cvcBackground }} id="cvc" format={this.state.cardScheme === "amex" ? "####" : "###"} placeholder="Customer Verification Code" value={cvc} onBlur={() => { if (cvc !== " ") { this.setState({ cvcBorder: "green", cvcBackground: "#d4eed8" }) } else { this.setState({ cvcBorder: "red", cvcBackground: "#f6e0df" }) } }} onChange={e => this.setState({ cvc: e.target.value, cvcBorder: "", cvcBackground: "" })} />
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                        <Col xs="6">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="country">Exp#</Label>
                                                                                                <NumberFormat format={this.cardExpiry} className="format" style={{ borderColor: this.state.expBorder, backgroundColor: this.state.expBackground }} id="exp" placeholder="CC Expiration" value={exp} onBlur={this.cardExpiryCheck.bind(this)} onChange={e => this.setState({ exp: e.target.value, expBorder: "", expBackground: "" })} />
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone</b></td>
                                                                    <td>
                                                                        <NumberFormat format="+# (###) ###-####" style={{ borderColor: this.state.phoneBorder }} className="format" value={phone.trim() === "" ? this.state.viewSale.ContactNumber : phone} onChange={e => this.setState({ phone: e.target.value })} onBlur={() => { if (this.state.oldPhoneList.indexOf(phone) !== -1) { this.setState({ phoneBorder: '#c62828', phoneError: "This Phone already used please contact to admin" }) } }} />
                                                                        {this.state.phoneError === "" ?
                                                                            null
                                                                            :
                                                                            <small style={{ color: 'red', float: 'right' }}>{this.state.phoneError}</small>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Cell</b></td>
                                                                    <td><NumberFormat className="format" value={cell.trim() === "" ? this.state.viewSale.CellNumber === "" ? "Not Provided" : this.state.viewSale.CellNumber : cell} onChange={e => this.setState({ cell: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Address</b></td>
                                                                    <td><input type="text" className="format" value={address === "" ? this.state.viewSale.Address : address} onChange={e => this.setState({ address: e.target.value })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>City</b></td>
                                                                    <td><input type="text" className="format" value={city.trim() === "" ? this.state.viewSale.City : city} onChange={e => this.setState({ city: e.target.value })} /></td>
                                                                    <td><b>Bank Name</b></td>
                                                                    <td><input type="text" className="format" style={{ borderColor: this.state.bankNameBorder, backgroundColor: this.state.bankNameBackground }} value={bankName} onBlur={() => { if (bankName.length> 2) { this.setState({ bankNameBorder: "green", bankNameBackground: "#d4eed8" }) } else { this.setState({ bankNameBorder: "red", bankNameBackground: "#f6e0df" }) } }} onChange={e => this.setState({ bankName: e.target.value, bankNameBorder: "", bankNameBackground: "" })} /></td>

                                                                </tr>
                                                                <tr>
                                                                    <td><b>State</b></td>
                                                                    <td><input type="text" className="format" value={state.trim() === "" ? this.state.viewSale.State : state} onChange={e => this.setState({ state: e.target.value })} /></td>
                                                                    <td><b>Bank Number</b></td>
                                                                    <td><NumberFormat className="format" style={{ borderColor: this.state.bankNumberBorder, backgroundColor: this.state.bankNumberBackground }} value={bankNumber} onBlur={() => { if (bankNumber.length> 3) { this.setState({ bankNumberBorder: "green", bankNumberBackground: "#d4eed8" }) } }} onChange={e => this.setState({ bankNumber: e.target.value, bankNumberBorder: "", bankNumberBackground: "" })} /></td>

                                                                </tr>
                                                                <tr>
                                                                    <td><b>Zip Code</b></td>
                                                                    <td><NumberFormat className="format" value={zipCode === "" ? this.state.viewSale.ZipCode : zipCode} onChange={e => this.setState({ zipCode: e.target.value })} /></td>
                                                                    <td><b>Balance</b></td>
                                                                    <td><NumberFormat className="format" prefix={'$'} style={{ borderColor: this.state.balBorder, backgroundColor: this.state.balBackground }} thousandSeparator={true} value={bal} onBlur={() => { if (bal !== " ") { this.setState({ balBorder: "green", balBackground: "#d4eed8" }) } else { this.setState({ balBorder: "red", balBackground: "#f6e0df" }) } }} onChange={e => this.setState({ bal: e.target.value, balBorder: "", balBackground: "" })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Email</b></td>
                                                                    <td><input type="text" className="format" value={email.trim() === "" ? this.state.viewSale.Email === "" ? "Not Provided" : this.state.viewSale.Email : email} onChange={e => this.setState({ email: e.target.value })} /></td>
                                                                    <td><b>Available</b></td>
                                                                    <td><NumberFormat className="format" prefix={'$'} style={{ borderColor: this.state.avalBorder, backgroundColor: this.state.avalBackground }} thousandSeparator={true} value={aval} onBlur={() => { if (aval !== " ") { this.setState({ avalBorder: "green", avalBackground: "#d4eed8" }) } else { this.setState({ avalBorder: "red", avalBackground: "#f6e0df" }) } }} onChange={e => this.setState({ aval: e.target.value, avalBorder: "", avalBackground: "" })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>DOB</b></td>
                                                                    <td><input type="date" className="format" value={dob.trim() === "" ?new Date(this.state.viewSale.DateOfBirth).toLocaleDateString() : dob} onChange={e => this.setState({ dob: e.target.value })} /></td>
                                                                    <td><b>Last Pay</b></td>
                                                                    <td>
                                                                        <NumberFormat className="format" prefix={'$'} placeholder="Last Pay" style={{ borderColor: this.state.lastPayBorder, backgroundColor: this.state.lastPayBackground }} thousandSeparator={true} value={lastPay} onBlur={() => { if (lastPay !== " ") { this.setState({ lastPayBorder: "green", lastPayBackground: "#d4eed8" }) } else { this.setState({ lastPayBorder: "red", lastPayBackground: "#f6e0df" }) } }} onChange={e => this.setState({ lastPay: e.target.value, lastPayBorder: "", lastPayBackground: "" })} />
                                                                        <NumberFormat className="format" format="##/##" style={{ borderColor: this.state.lastPayDateBorder, backgroundColor: this.state.lastPayDateBackground }} placeholder="MM/DD" value={lastPayDate} onBlur={() => { if (lastPayDate !== " " && lastPayDate.indexOf(" ") === -1) { this.setState({ lastPayDateBorder: "green", lastPayDateBackground: "#d4eed8" }) } else { this.setState({ lastPayDateBorder: "red", lastPayDateBackground: "#f6e0df" }) } }} onChange={e => this.setState({ lastPayDate: e.target.value })} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>MMN</b></td>
                                                                    <td><input type="text" className="format" value={mmn.trim() === "" ? this.state.viewSale.MotherMediansName : mmn} onChange={e => this.setState({ mmn: e.target.value })} /></td>
                                                                    <td><b>Due Pay</b></td>
                                                                    <td>
                                                                        <NumberFormat className="format" prefix={'$'} placeholder="Due Pay" style={{ borderColor: this.state.duePayBorder, backgroundColor: this.state.duePayBackground }} thousandSeparator={true} value={duePay} onBlur={() => { if (duePay.trim() !== "") { this.setState({ duePayBorder: "green", duePayBackground: "#d4eed8" }) } else { this.setState({ duePayBorder: "red", duePayBackground: "#f6e0df" }) } }} onChange={e => this.setState({ duePay: e.target.value, duePayBorder: "", duePayBackground: "" })} />
                                                                        <NumberFormat className="format" format="##/##" style={{ borderColor: this.state.duePayDateBorder, backgroundColor: this.state.duePayDateBackground }} placeholder="MM/DD" value={duePayDate} onBlur={() => { if (duePayDate.trim() !== "" && duePayDate.indexOf(" ") === -1) { this.setState({ duePayDateBorder: "green", duePayDateBackground: "#d4eed8" }) } else { this.setState({ duePayDateBorder: "red", duePayDateBackground: "#f6e0df" }) } }} onChange={e => this.setState({ duePayDate: e.target.value })} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>SSN</b></td>
                                                                    <td>
                                                                        <NumberFormat format="###-##-####" style={{ borderColor: this.state.SSNBorder }} className="format" value={ssn.trim() === "" ? this.state.viewSale.SocialSecurityNumber : ssn} onChange={e => this.setState({ ssn: e.target.value })} onBlur={() => { if (this.state.oldSSNList.indexOf(ssn) !== -1) { this.setState({ SSNBorder: '#c62828', SSNError: "This SSN already used please contact to admin" }) } }} />
                                                                        {this.state.SSNError === "" ?
                                                                            null
                                                                            :
                                                                            <small style={{ color: 'red', float: 'right' }}>{this.state.SSNError}</small>
                                                                        }
                                                                    </td>                                                                    <td><b>Interest Rate</b></td>
                                                                       <td><NumberFormat className="format" format="##.##%" style={{ borderColor: this.state.aprlBorder, backgroundColor: this.state.aprlBackground }} value={this.state.Cards[0].InterestRate} onBlur={() => { if (aprl.trim() !== "") { this.setState({ aprlBorder: "green", aprlBackground: "#d4eed8" }) } else { this.setState({ aprlBorder: "red", aprlBackground: "#f6e0df" }) } }} onChange={e => this.setState({ aprl: e.target.value, aprlBorder: "", aprlBackground: "" })} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone2</b></td>
                                                                    <td><NumberFormat format="+# (###) ###-####" className="format" value={phone2.trim() === "" ? this.state.viewSale.phone2 : phone2} onChange={e => this.setState({ phone2: e.target.value })} /></td>
                                                                    <td rowSpan="1" colSpan="2">
                                                                        {/* {this.state.data.cardDetail === "" ?
                                                                            null
                                                                            :
                                                                            this.state.data.cardDetail.map((v, i) =>
                                                                                <div style={{ display: "inline" }} key={i}>
                                                                                    {
                                                                                        v.cardScheme === "mastercard" ?
                                                                                            <Master />
                                                                                            :
                                                                                            v.cardScheme === "visa" ?
                                                                                                <Visa />
                                                                                                :
                                                                                                v.cardScheme === "discover" ?
                                                                                                    <Discover />
                                                                                                    :
                                                                                                    v.cardScheme === "amex" ?
                                                                                                        <Amex />
                                                                                                        :
                                                                                                        <i className="fa fa-credit-card fa-2x" style={{ marginRight: "3px", color: "##2f353a" }}></i>

                                                                                    }
                                                                                </div>
                                                                            )

                                                                        } */}
                                                                        {this.state.viewSale.cardDetail === "" ?
                                                                            null
                                                                            :
                                                                            <i className="fa fa-plus-square fa-2x" style={{ marginRight: "3px", color: "##2f353a", cursor: "pointer" }} onClick={this.addNewCard.bind(this)}></i>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td colSpan="2"><Button size="sm" color="secondary" style={{ width: "100%", height: "35px" }} >Save Credit Card</Button></td>
                                                                </tr>
                                                                <tr border="2">
                                                                    <td colSpan="4"><b style={{ fontSize: 16 }}>Other Detail</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>SecurityWord</b></td>
                                                                    <td colSpan="2"><input type="text" className="format" style={{ borderColor: this.state.SecurityWordBorder, backgroundColor: this.state.SecurityWordBackground }} value={SecurityWord === " " ? this.state.viewSale.SecurityWord : SecurityWord} onChange={e => this.setState({ SecurityWord: e.target.value, SecurityWordBorder: "", SecurityWordBackground: "" })} onBlur={() => { if (SecurityWord.length> 1 || this.state.data.otherDetail.SecurityWord.length> 1) { this.setState({ SecurityWordBorder: 'green', SecurityWordBackground: "#d4eed8" }) } else { this.setState({ SecurityWordBorder: 'red', SecurityWordBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Highest Level Education</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={this.state.Education === "Select" ? this.state.viewSale.HighestLevelofEducation : this.state.Education} style={{ borderColor: this.state.EducationBorder, backgroundColor: this.state.EducationBackground }} onChange={e => this.setState({ Education: e.target.value, EducationBorder: "", EducationBackground: "" })} onBlur={() => { if (this.state.Education !== "Select" || this.state.viewSale.HighestLevelofEducation !== "") { this.setState({ EducationBorder: 'green', EducationBackground: "#d4eed8" }) } else { this.setState({ EducationBorder: 'red', EducationBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Less than a high school diploma">Less than a high school diploma</option>
                                                                            <option value="High school diploma or GED">High school diploma or GED</option>
                                                                            <option value="Some college or associate degree">Some college or associate degree</option>
                                                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                                                            <option value="Advanced/Graduate Degree">Advanced/Graduate Degree</option> */}
                                                                            <OptionsList Options={EducationOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    
                                                                    <td colSpan="2"><b>Employment Status</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={EmploymentStatus === "Select" ? this.state.viewSale.EmployementStatus : EmploymentStatus} style={{ borderColor: this.state.EmploymentStatusBorder, backgroundColor: this.state.EmploymentStatusBackground }} onChange={e => this.setState({ EmploymentStatus: e.target.value, EmploymentStatusBorder: "", EmploymentStatusBackground: "" })} onBlur={() => { if (EmploymentStatus !== "Select" || this.state.viewSale.EmploymentStatus !== "") { this.setState({ EmploymentStatusBorder: 'green', EmploymentStatusBackground: "#d4eed8" }) } else { this.setState({ EmploymentStatusBorder: 'red', EmploymentStatusBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Employed Full-Time">Employed Full-Time</option>
                                                                            <option value="Employed Part-Time">Employed Part-Time</option>
                                                                            <option value="Self-Employed">Self-Employed</option>
                                                                            <option value="Unemployed">Unemployed</option>
                                                                            <option value="Retired">Retired</option>
                                                                            <option value="Other">Other</option>
                                                                            <option value="College Student">College Student</option> */}
                                                                            <OptionsList Options={EmploymentStatusOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Housing Status</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={HousingStatus === "Select" ? this.state.viewSale.HousingStatus : HousingStatus} style={{ borderColor: this.state.HousingStatusBorder, backgroundColor: this.state.HousingStatusBackground }} onChange={e => this.setState({ HousingStatus: e.target.value, HousingStatusBorder: "", HousingStatusBackground: "" })} onBlur={() => { if (HousingStatus !== "Select" || this.state.viewSale.HousingStatus !== "") { this.setState({ HousingStatusBorder: 'green', HousingStatusBackground: "#d4eed8" }) } else { this.setState({ HousingStatusBorder: 'red', HousingStatusBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Own Home">Own Home</option>
                                                                            <option value="Rent">Rent</option>
                                                                            <option value="Other">Other</option> */}
                                                                            <OptionsList Options={HousingStatusOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Company</b></td>
                                                                    <td colSpan="2"><input type="text" style={{ borderColor: this.state.CompanyBorder, backgroundColor: this.state.CompanyBackground }} className="format" value={ Company.trim()=== "" ? this.state.viewSale.Company : Company} onChange={e => this.setState({ Company: e.target.value, CompanyBorder: "", CompanyBackground: "" })} onBlur={() => { if (Company.length> 1 || this.state.viewSale.Company !== "") { this.setState({ CompanyBorder: 'green', CompanyBackground: "#d4eed8" }) } else { this.setState({ CompanyBorder: 'red', CompanyBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Designation</b></td>
                                                                    <td colSpan="2"><input type="text" className="format" style={{ borderColor: this.state.DesignationBorder, backgroundColor: this.state.DesignationBackground }} value={Designation === " " ? this.state.viewSale.Designation : Designation} onChange={e => this.setState({ Designation: e.target.value, DesignationBackground: "", DesignationBorder: "" })} onBlur={() => { if (Designation.length> 1 || this.state.data.otherDetail.Designation !== "") { this.setState({ DesignationBorder: 'green', DesignationBackground: "#d4eed8" }) } else { this.setState({ DesignationBorder: 'red', DesignationBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Annual income</b></td>
                                                                    <td colSpan="2"><NumberFormat displayType={'input'} placeholder="Annual income" thousandSeparator={true} prefix={'$'} style={{ borderColor: this.state.AnnualIncomeBorder, backgroundColor: this.state.AnnualIncomeBackground }} className="format" value={Annualincome === " " ? this.state.viewSale.AnnualIncome : Annualincome} onChange={e => this.setState({ AnnualIncome: e.target.value, AnnualIncomeBorder: "", AnnualIncomeBackground: "" })} onBlur={() => { if (AnnualIncome.length> 1 || this.state.viewSale.AnnualIncome !== "") { this.setState({ AnnualIncomeBorder: 'green', AnnualIncomeBackground: "#d4eed8" }) } else { this.setState({ AnnualIncomeBorder: 'red', AnnualIncomeBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Chequin Accounts</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={ChequinAccount === "Select" ? this.state.viewSale.ChequinAccounts : ChequinAccount} style={{ borderColor: this.state.ChequinAccountBorder, backgroundColor: this.state.ChequinAccountBackground }} onChange={e => this.setState({ ChequinAccount: e.target.value, ChequinAccountBorder: "", ChequinAccountBackground: "" })} onBlur={() => { if (ChequinAccount !== "Select" || this.state.viewSale.ChequinAccounts !== "") { this.setState({ ChequinAccountBorder: 'green', ChequinAccountBackground: "#d4eed8" }) } else { this.setState({ ChequinAccountBorder: 'red', ChequinAccountBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Chequin">Chequin</option>
                                                                            <option value="Saving">Saving</option>
                                                                            <option value="Chequin-Saving">Chequin-Saving</option>
                                                                            <option value="None">None</option> */}
                                                                            <OptionsList Options={ChequinAccountOptions}/>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Other Loans</b></td>
                                                                    <td colSpan="2">
                                                                        <select className="format" value={OtherLoan === "Select" ? this.state.viewSale.OtherLoans : OtherLoan} style={{ borderColor: this.state.OtherLoanBorder, backgroundColor: this.state.OtherLoanBackground }} onChange={e => this.setState({ OtherLoan: e.target.value, OtherLoanBorder: "", OtherLoanBackground: "" })} onBlur={() => { if (OtherLoan !== "Select" || this.state.viewSale.OtherLoans !== "") { this.setState({ OtherLoanBorder: 'green', OtherLoanBackground: "#d4eed8" }) } else { this.setState({ OtherLoanBorder: 'red', OtherLoanBackground: "#f6e0df" }) } }}>
                                                                            {/* <option value="Select">Select</option>
                                                                            <option value="Loan">Loan</option>
                                                                            <option value="Mortgages">Mortgages</option>
                                                                            <option value="Loan-Mortgages">Loan-Mortgages</option>
                                                                            <option value="Other">Other</option> */}
                                                                            <OptionsList Options={OtherLoanOptions}/>

                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Monthly Rent/Mortgage</b></td>
                                                                    <td colSpan="2"><NumberFormat displayType={'input'} placeholder="Monthly Rent/Mortgage" thousandSeparator={true} prefix={'$'} style={{ borderColor: this.state.MonthlyMortgagesBorder, backgroundColor: this.state.MonthlyMortgagesBackground }} className="format" value={MonthlyMortgages === " " ? this.state.viewSale.MonthlyRentMortgage : MonthlyMortgages} onChange={e => this.setState({ MonthlyMortgages: e.target.value, MonthlyMortgagesBorder: "", MonthlyMortgagesBackground: "" })} onBlur={() => { if (MonthlyMortgages.length> 1 || this.state.viewSale.MonthlyRentMortgage !== "") { this.setState({ MonthlyMortgagesBorder: 'green', MonthlyMortgagesBackground: "#d4eed8" }) } else { this.setState({ MonthlyMortgagesBorder: 'red', MonthlyMortgagesBackground: "#f6e0df" }) } }} /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Closer Notes</b></td>
                                                                    <td colSpan="4">
                                                                        <FormGroup>
                                                                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="4"
                                                                                placeholder="Closer Notes" value={CloserNotes === " " ? this.state.data.CloserNotes === undefined ? CloserNotes : this.state.data.CloserNotes : CloserNotes} onChange={(e) => this.setState({ CloserNotes: e.target.value })} />
                                                                        </FormGroup>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Agent Notes</b></td>
                                                                    <td colSpan="4" style={{ backgroundColor: "#c8ced3" }}>
                                                                        {this.state.data.AgentNotes}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                        <Button size="sm" color="primary" style={{ width: "100%", height: "35px" }} onClick={this.updateDeal.bind(this)}><i className="fa fa-check"></i>Update</Button>
                                                    </div>
                                            }
                                        </CardBody>
                                        :
                                        <CardBody>
                                            {typeof this.state.viewSale === "" ?
                                                null
                                                :
                                                <div>
                                                   
                                                    {this.state.Cards.length != 0
                                                        ?
                                                        <Table responsive bordered style={{ textAlign: "center" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-date"></i> {new Date(this.state.viewSale.createdAt).toLocaleDateString()}</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-time"></i> {new Date(this.state.viewSale.createdAt).toLocaleTimeString()}</b></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-user"></i> Customar Detail</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-credit-card"></i> Card Detail</b></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Full Name</b></td>
                                                                    <td>{this.state.viewSale.FullName}</td>
                                                                    <td colSpan="2" rowSpan="5" onClick={() => { if (this.state.focused === "cc") { this.setState({ focused: "cvc" }) } else { this.setState({ focused: "cc" }) } }}> <Cards
                                                                        number={this.state.Cards[0].CreditCardNumber}
                                                                        name={this.state.Cards[0].NameOnCard}
                                                                        expiry={this.state.Cards[0].ExpireDate}
                                                                        cvc={this.state.Cards[0].CVC}
                                                                        focused={this.state.focused}
                                                                    /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone</b></td>
                                                                    <td>{this.state.viewSale.ContactNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Cell</b></td>
                                                                    <td>{(this.state.viewSale.CellNumber === ""||this.state.viewSale.CellNumber==undefined) ? "Not Provided" : this.state.viewSale.CellNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Address</b></td>
                                                                    <td>{this.state.viewSale.Address}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>City</b></td>
                                                                    <td>{this.state.viewSale.City}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>State</b></td>
                                                                    <td>{this.state.viewSale.State}</td>
                                                                    <td><b>Bank Name</b></td>
                                                                    <td>{this.state.Cards[0].BankName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Zip Code</b></td>
                                                                    <td>{this.state.viewSale.ZipCode}</td>
                                                                    <td><b>Bank Number</b></td>
                                                                    <td>{this.state.Cards[0].BankNumber === "" ? "Not Provided" : this.state.Cards[0].BankNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Email</b></td>
                                                                    <td>{this.state.viewSale.Email === "" ? "Not Provided" : this.state.viewSale.Email}</td>
                                                                    <td><b>Balance</b></td>
                                                                    <td>{this.state.Cards[0].Balance}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>DOB</b></td>
                                                                    <td>{new Date(this.state.viewSale.DateOfBirth).toDateString()}</td>
                                                                    <td><b>Available</b></td>
                                                                    <td>{this.state.Cards[0].Available}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>MMN</b></td>
                                                                    <td>{this.state.viewSale.MotherMediansName}</td>
                                                                    <td><b>Last Pay</b></td>
                                                                    <td>{this.state.Cards[0].LastPayment}{" "}{"→"}{" "}{this.state.Cards[0].LastPayDate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>SSN</b></td>
                                                                    <td>{this.state.viewSale.SocialSecurityNumber}</td>
                                                                    <td><b>Due Pay</b></td>
                                                                    <td>{this.state.Cards[0].DuePayment}{" "}{"→"}{" "}{this.state.Cards[0].DuePayDate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone2</b></td>
                                                                    <td>{this.state.viewSale.Phone2}</td>
                                                                    <td><b>Aprl</b></td>
                                                                    <td>{this.state.Cards[0].InterestRate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td colSpan="2">
                                                                        {
                                                                            
                                                                            this.state.Cards.map((v, i) =>

                                                                            <span style={{ display: "inline" }} key={i}>
                                                                                    {
                                                                                        v.CardScheme === "mastercard" ?
                                                                                            <span onClick={() => this.setState({ cardIndex: i })}><Master /></span>
                                                                                            :
                                                                                            v.CardScheme === "visa" ?
                                                                                                <span onClick={() => this.setState({ cardIndex: i })}>  <Visa /></span>
                                                                                                :
                                                                                                v.CardScheme === "discover" ?
                                                                                                    <span onClick={() => this.setState({ cardIndex: i })}> <Discover /></span>
                                                                                                    :
                                                                                                    v.CardScheme === "amex" ?
                                                                                                        <span onClick={() => this.setState({ cardIndex: i })}> <Amex /> </span>
                                                                                                        :
                                                                                                        <i className="fa fa-credit-card fa-2x" style={{ marginRight: "3px", color: "##2f353a" }} onClick={() => this.setState({ cardIndex: i })}></i>

                                                                                    }
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr border="2">
                                                                    <td colSpan="4"><b style={{ fontSize: 16 }}>Other Detail</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>SecurityWord</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.SecurityWord}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Highest Level Edu</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.HighestLevelofEducation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Employment Status</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.EmployementStatus}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Housing Status</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.HousingStatus}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Company</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.Company}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Designation</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.Designation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Annual income</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.Annualincome}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Chequin Accounts</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.ChequinAccounts}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Other Loans</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.OtherLoans}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Monthly Rent/Mortgage</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.MonthlyRentMortgage}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Closer Notes</b></td>
                                                                    <td colSpan="4">{this.state.viewSale.CloserNotes === undefined ? "nill" : this.state.data.CloserNotes}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Agent Notes</b></td>
                                                                    <td colSpan="4">{this.state.viewSale.Notes}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                        :
                                                        <Table responsive bordered style={{ textAlign: "center" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-date"></i> {new Date(this.state.viewSale.createdAt).toLocaleDateString()}</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-time"></i> {new Date(this.state.viewSale.createdAt).toLocaleTimeString()}</b></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan="2"><b><i className="fa fa-user"></i> Customar Detail</b></th>
                                                                    <th colSpan="2"><b><i className="fa fa-credit-card"></i> Card Detail</b></th>
                                                                </tr>

                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Full Name</b></td>
                                                                    <td>{this.state.viewSale.FullName}</td>
                                                                    <td rowSpan="12"><b>Not Given</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone</b></td>
                                                                    <td>{this.state.viewSale.ContactNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Cell</b></td>
                                                                    <td>{this.state.viewSale.CellNumber === "" ? "Not Provided" : this.state.viewSale.CellNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Address</b></td>
                                                                    <td>{this.state.viewSale.Address}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>City</b></td>
                                                                    <td>{this.state.viewSale.City}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>State</b></td>
                                                                    <td>{this.state.viewSale.State}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Zip Code</b></td>
                                                                    <td>{this.state.viewSale.ZipCode}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Email</b></td>
                                                                    <td>{this.state.viewSale.Email == "" ? "Not Provided" : this.state.viewSale.Email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>DOB</b></td>
                                                                    <td>{new Date(this.state.viewSale.DateOfBirth).toLocaleDateString()}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>MMN</b></td>
                                                                    <td>{this.state.viewSale.MotherMediansName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>SSN</b></td>
                                                                    <td>{this.state.viewSale.SocialSecurityNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Phone2</b></td>
                                                                    <td>{this.state.viewSale.Phone2}</td>
                                                                </tr>
                                                                <tr border="2">
                                                                    <td colSpan="4"><b style={{ fontSize: 16 }}>Other Detail</b></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>SecurityWord</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.SecurityWord}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Highest Level Edu</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.HighestLevelofEducation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Employment Status</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.EmployementStatus}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Housing Status</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.HousingStatus}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Company</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.Company}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Designation</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.Designation}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Annual income</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.Annualincome}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Chequin Accounts</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.ChequinAccounts}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Other Loans</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.OtherLoans}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"><b>Monthly Rent/Mortgage</b></td>
                                                                    <td colSpan="2">{this.state.viewSale.MonthlyRentMortgage}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Closer Notes</b></td>
                                                                    <td colSpan="4">{this.state.viewSale.CloserNotes === undefined ? "nill" : this.state.viewSale.CloserNotes}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Agent Notes</b></td>
                                                                    <td colSpan="4">{this.state.viewSale.Notes }</td>
                                                                </tr>
                                                            </tbody>
                                                            {/* <div>Notes: {this.state.viewSale.Notes}</div> */}
                                                        </Table>
                                                    }
                                                    <Button size="sm" color="success" style={{ width: "100%", height: "35px" }} onClick={() => this.setState({ edit: true })}><i className="fa fa-edit"></i>Edit</Button>

                                                </div>

                                            }
                                        </CardBody>
                                    }
                                </Card>
                            </Col>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProp(state) {
    return ({
        closers: state.root.closers,
        admins: state.root.admins
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        updateDeal: (data) => { dispatch(updateDeal(data)) },
        getUser: (user, agent) => { dispatch(getUser(user, agent)) }
    })
}

const OptionsList = ({Options}) =>( 
    Options.map((Option,index) =>
<option key={index} value={Option}>{Option}</option>
))

export default AllSell;
