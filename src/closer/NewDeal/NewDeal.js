import React, { Component } from 'react';
import {
    Col,
    Row,
    Card, CardBody, CardHeader,
    FormGroup,
    Input,
    Label,
    CardFooter,
    Badge,
    Button
} from 'reactstrap';
import $ from 'jquery';
import firebase from '../../Config/Firebase/firebase'
import NumberFormat from 'react-number-format';
import './style.css'
import luhn from 'luhn';
import { connect } from 'react-redux';
import { AddNewDeal, getUser } from '../../store/Actions/action';
import Cards from 'react-credit-cards';
import { Visa, Master, Amex, Discover } from '../../agent/NewDeal/Icons';

class NewDeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDisplay: 'none',
            fullName: '',
            phone: '',
            phone2: '',
            cell: '',
            address: '',
            city: '',
            state: 'Select',
            zipCode: '',
            email: '',
            dob: '',
            mmn: "",
            ssn: "",
            bankName: "",
            bankNumber: "",
            nameOnCard: "",
            cc: "",
            cvc: "",
            exp: "",
            bal: "",
            aval: "",
            lastPay: "",
            duePay: "",
            aprl: "",
            cardDetail: [],
            fullNameError: "",
            fullNameBorder: "",
            fullNameBackground: "",
            phoneError: "",
            phoneBorder: "",
            phoneBackground: "",
            phone2Border: "",
            phone2Background: "",
            addressError: "",
            addressBorder: "",
            addressBackground: "",
            cityError: "",
            cityBorder: "",
            cityBackground: "",
            stateError: "",
            stateBorder: "",
            stateBackground: "",
            zipCodeError: "",
            zipCodeBorder: "",
            zipBackground: "",
            dobError: "",
            dobBorder: "",
            dobBackground: "",
            bankNameError: "",
            bankNameBorder: "",
            bankNameBackground: "",
            bankNumberError: "",
            bankNumberBorder: "",
            bankNumberBackGround: "",
            nameOnCardError: "",
            nameOnCardBorder: "",
            mmnError: "",
            mmnBorder: "",
            ssnError: "",
            ssnBorder: "",
            ccError: "",
            ccBorder: "",
            ccBackground: "",
            cvcError: "",
            cvcBorder: "",
            expError: "",
            expBorder: "",
            balError: "",
            balBorder: "",
            avalError: "",
            avalBorder: "",
            lastPayError: "",
            lastPayBorder: "",
            duePayError: "",
            aprlBorder: "",
            success: false,
            focused: "cc",
            SecurityWord: "",
            Education: "Select",
            EmploymentStatus: "Select",
            HousingStatus: "Select",
            Company: "",
            Designation: "",
            AnnualIncome: "",
            ChequinAccount: "Select",
            OtherLoan: "Select",
            MonthlyMortgages: "",
            otherDetail: 'none',
            Notes: '',
            cardScheme: "",
            issuer: "",
            cardExpire: "",
            oldCardList: [],
            oldSSNList: [],
            dobColor: "red",
            saleStatus: "Pending",
            callbackDate: "",
            callbackTime: "",
            transferCloser: "",
            randomID: "",
            cards: [],
            master: 0,
            visa: 0,
            discover: 0,
            amex: 0,
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
        }
        this.saveDeal = this.saveDeal.bind(this)
        this.reset = this.reset.bind(this)
    }

    saveDeal() {
        console.log("chala")
        let { fullName, phone, phone2, cell, address, city, state, zipCode, email, dob, cardDetail, mmn, ssn, Notes, SecurityWord, AnnualIncome, Education, Designation, Company, HousingStatus, EmploymentStatus, OtherLoan, ChequinAccount, MonthlyMortgages } = this.state;
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes()
        var checkPhone = phone.search("_");
        var agentID = firebase.auth().currentUser.uid;
        var agentName = firebase.auth().currentUser.displayName;
        if (fullName === "") {
            this.setState({
                fullNameError: "Please Fill The Field",
                fullNameBorder: "red"
            })
        }
        else if (phone === "") {
            this.setState({
                phoneError: "Please Fill The Field",
                phoneBorder: "red"
            })
        }
        else if (checkPhone> 0) {
            this.setState({
                phoneError: "Please Fill The Field",
                phoneBorder: "red"
            })
        }
        else if (address === "") {
            this.setState({
                addressError: "Please Fill The Field",
                addressBorder: "red"
            })
        }
        else if (state === "Select") {
            this.setState({
                stateError: "Please Fill The Field",
                stateBorder: "red"
            })
        }
        else if (city === "") {
            this.setState({
                cityError: "Please Fill The Field",
                cityBorder: "red"
            })
        }
        else if (zipCode === "") {
            this.setState({
                zipCodeError: "Please Fill The Field",
                zipCodeBorder: "red"
            })
        }
        else if (dob === "") {
            this.setState({
                dobError: "Please Fill The Field",
                dobBorder: "red"
            })
        }
        else if (mmn === "") {
            this.setState({
                mmnError: "Please Fill The Field",
                mmnBorder: "red"
            })
        }
        else if (ssn === "") {
            this.setState({
                ssnError: "Please Fill The Field",
                ssnBorder: "red"
            })
        }
        else if (SecurityWord === "") {
            this.setState({
                OtherError: "Please Fill The Other Detail",
                OtherBorder: "red",
                OtherBackground: "#f6e0df",
                SecurityWordBorder: "red",
                SecurityWordBackground: "#f6e0df"
            })
        }
        else if (Education === "Select") {
            this.setState({
                EducationBorder: "red",
                EducationBackground: "#f6e0df",
            })
        }
        else if (EmploymentStatus === "Select") {
            this.setState({
                EmploymentStatus: "red",
                EmploymentStatusBackground: "#f6e0df",
            })
        }
        else if (HousingStatus === "Select") {
            this.setState({
                HousingStatusBorder: "red",
                HousingStatusBackground: "#f6e0df",
            })
        }
        else if (AnnualIncome === "") {
            this.setState({
                AnnualIncomeBorder: "red",
                AnnualIncomeBackground: "#f6e0df",
            })
        }
        else if (ChequinAccount === "Select") {
            this.setState({
                ChequinAccountBorder: "red",
                ChequinAccountBackground: "#f6e0df",
            })
        }
        else if (OtherLoan === "Select") {
            this.setState({
                OtherLoanBorder: "red",
                OtherLoanBackground: "#f6e0df",
            })
        }
        else if (MonthlyMortgages === "") {
            this.setState({
                MonthlyMortgagesBorder: "red",
                MonthlyMortgagesBackground: "#f6e0df",
            })
        }
        else {
            if (cardDetail.length> 0) {
                console.log(cardDetail)
                let deal = {
                    fullName: fullName,
                    phone: phone,
                    phone2: phone2,
                    cell: cell,
                    address: address,
                    city: city,
                    state: state,
                    zipCode: zipCode,
                    email: email,
                    dob: dob,
                    date: date,
                    time: time,
                    card: true,
                    cardDetail: cardDetail,
                    mmn: mmn,
                    ssn: ssn,
                    Notes: Notes,
                    ID: this.state.randomID,
                    status: {
                        status: this.state.saleStatus,
                        callbackDate: this.state.callbackDate,
                        callbackTime: this.state.callbackTime,
                        transferCloserID: this.state.transferCloser === "" ? "" : JSON.parse(this.state.transferCloser).id,
                        transferCloserName: this.state.transferCloser === "" ? "" : JSON.parse(this.state.transferCloser).name,
                        transferAgentID: agentID,
                        transferAgentName: agentName + "(Closer)",
                        statusCloser: this.state.saleStatus
                    },
                    otherDetail: {
                        SecurityWord: SecurityWord,
                        AnnualIncome: AnnualIncome,
                        Education: Education,
                        Designation: Designation,
                        Company: Company,
                        HousingStatus: HousingStatus,
                        EmploymentStatus: EmploymentStatus,
                        OtherLoan: OtherLoan,
                        MonthlyMortgages: MonthlyMortgages,
                        ChequinAccount: ChequinAccount
                    }
                }
                this.props.AddNewDeal(deal)
                this.setState({ success: true })
                setTimeout(() => {
                    this.setState({ success: false })
                }, 4000)

            }
            else {
                let deal = {
                    fullName: fullName,
                    phone: phone,
                    phone2: phone2,
                    cell: cell,
                    address: address,
                    city: city,
                    state: state,
                    zipCode: zipCode,
                    email: email,
                    dob: dob,
                    date: date,
                    time: time,
                    card: false,
                    cardDetail: "",
                    mmn: mmn,
                    ssn: ssn,
                    Notes: Notes,
                    ID: this.state.randomID,
                    status: {
                        status: "",
                        callbackDate: this.state.callbackDate,
                        callbackTime: this.state.callbackTime,
                        transferCloserID: this.state.transferCloser === "" ? "" : JSON.parse(this.state.transferCloser).id,
                        transferCloserName: this.state.transferCloser === "" ? "" : JSON.parse(this.state.transferCloser).name,
                        transferAgentID: agentID,
                        transferAgentName: agentName + "(Closer)",
                        statusCloser: this.state.saleStatus
                    },
                    otherDetail: {
                        SecurityWord: SecurityWord,
                        AnnualIncome: AnnualIncome,
                        Education: Education,
                        Designation: Designation,
                        Company: Company,
                        HousingStatus: HousingStatus,
                        EmploymentStatus: EmploymentStatus,
                        OtherLoan: OtherLoan,
                        MonthlyMortgages: MonthlyMortgages,
                        ChequinAccount: ChequinAccount
                    }
                }
                this.props.AddNewDeal(deal)
                this.setState({ success: true })
                setTimeout(() => {
                    this.setState({ success: false })
                }, 4000)
            }
        }
    }
    reset() {
        this.setState({
            fullName: '',
            phone: '',
            phone2: '',
            cell: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            email: '',
            dob: '',
            bankName: '',
            bankNumber: '',
            nameOnCard: '',
            mmn: '',
            ssn: '',
            fullNameBorder: "",
            fullNameBackground: "",
            fullNameError: "",
            phoneBorder: "",
            phoneBackground: "",
            phone2Border: "",
            phone2Background: "",
            phoneError: "",
            cellBorder: "",
            cellBackground: "",
            addressBorder: "",
            addressBackground: "",
            addressError: "",
            stateBorder: "",
            stateBackground: "",
            stateError: "",
            cityBorder: "",
            cityBackground: "",
            cityError: "",
            zipCodeBorder: "",
            zipCodeBackground: "",
            zipCodeError: "",
            emailBorder: "",
            emailBackground: "",
            dobBackground: "",
            dobBorder: "",
            dobError: "",
            mmnBorder: "",
            mmnBackground: "",
            mmnError: "",
            ssnBorder: "",
            ssnBackground: "",
            ssnError: "",
            notesBorder: "",
            notesBackground: "",
            cc: '',
            cvc: '',
            exp: '',
            bal: '',
            aval: '',
            lastPay: '',
            duePay: '',
            aprl: '',
            focused: 'cc',
            cardExpire: "",
            SecurityWord: "",
            Education: "Select",
            EmploymentStatus: "Select",
            HousingStatus: "Select",
            Company: "",
            Designation: "",
            AnnualIncome: "",
            ChequinAccount: "Select",
            OtherLoan: "Select",
            MonthlyMortgages: "",
            otherDetail: 'none',
            Notes: '',
            cardScheme: "",
            issuer: "",
            oldCardList: [],
            dobColor: "red",
            saleStatus: "Pending",
            callbackDate: "",
            callbackTime: "",
            transferCloser: "",
            cards: [],
            master: 0,
            visa: 0,
            discover: 0,
            amex: 0,
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
    componentDidMount() {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (user.email === "admin@genesis.com") {

                }
                else {
                    $(window).blur(function () {
                        // console.log('blur')
                        firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("invisible")
                    });
                    $(window).focus(function () {
                        // console.log('focus')
                        firebase.database().ref('/').child(`AgentAvtivity/${date}/${user.uid}/status`).set("online")
                    });
                }

            } else {

            }
        });
        firebase.database().ref('/').child("RandomID").on('value', (ID) => {
            this.setState({
                randomID: ID.val().id + 1
            })
        })
    }
    componentWillMount() {
        firebase.database().ref('/').child(`NewDeals`).on('child_added', (data) => {
            for (var key in data.val()) {
                for (var key1 in data.val()[key]) {
                    this.state.oldSSNList.push(data.val()[key][key1].ssn)
                    this.setState({
                        oldSSNList: this.state.oldSSNList
                    })
                    if (data.val()[key][key1].cardDetail === "" ||data.val()[key][key1].cardDetail === undefined) {

                    }
                    else {
                        for (var i = 0; i < data.val()[key][key1].cardDetail.length; i++) {
                            this.state.oldCardList.push(data.val()[key][key1].cardDetail[i].cc)
                            this.setState({
                                oldCardList: this.state.oldCardList
                            })
                        }
                    }
                }
            }
        })
        let user = firebase.auth().currentUser
        let agent = "Agent"
        this.props.getUser(user, agent)
    }
    handleChange(e) {
        this.setState({ cc: e.target.value, ccError: "", ccBorder: "", ccBackground: "", bankName: "", bankNumber: "", bankNameBorder: "", bankNumberBorder: "", bankNameBackground: "", bankNumberBackGround: "" })
    }
    handleBlur() {
        var is_valid = luhn.validate(this.state.cc);
        if (this.state.cc === "") {
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
                ccError: "This card already used ⚠",
            })
        }
        else {
            this.setState({
                ccBackground: "#d4eed8",
                ccBorder: "green",
                ccError: "Valid Card Number ✓",
            })
            fetch(`https://lookup.binlist.net/${this.state.cc}`)
                .then(response => response.json())
                .then((json) => {
                    console.log(json)
                    if (json.bank.name.length> 1) {
                        this.setState({ bankName: json.bank.name, bankNameBorder: "green", bankNameBackground: "#d4eed8", cardScheme: this.state.issuer })
                    }
                    if (json.bank.phone.length> 1) {
                        this.setState({ bankNumber: json.bank.phone, bankNumberBorder: "green", bankNumberBackGround: "#d4eed8", cardScheme: this.state.issuer })
                    }
                })
                .catch((err) => {
                    console.log("error", err)
                })
        }
    }
    ssnBlur() {
        let { ssn } = this.state;
        if (ssn === "") {
            this.setState({
                ssnBorder: 'red',
                ssnBackground: "#f6e0df"
            })
        }
        else if (ssn.search(" ")> 0) {
            this.setState({
                ssnBorder: 'red',
                ssnBackground: "#f6e0df"
            })
        }
        else if (this.state.oldSSNList.indexOf(ssn) !== - 1) {
            this.setState({
                ssnBorder: '#c62828',
                ssnError: "This SSN already used ⚠"
            })
        }
        else {
            this.setState({
                ssnBorder: 'green',
                ssnBackground: "#d4eed8"
            })
        }
    }
    saveCard() {
        let { bankName, bankNumber, nameOnCard, cc, cvc, exp, bal, aval, lastPay, duePay, aprl, cardScheme, cardExpire, issuer } = this.state;
        var is_valid = luhn.validate(cc);

        if (cc === "") {
            this.setState({
                ccError: "Insert card number ☒",
                ccBorder: "red"
            })
        }
        else if (is_valid === false) {
            this.setState({
                ccError: "Invalid card number ✗",
                ccBorder: "red"
            })
        }
        else if (this.state.oldCardList.indexOf(this.state.cc.replace(/\s/g, '')) !== -1) {
            this.setState({
                ccBorder: "#c62828",
                ccBackground: "",
                ccError: "This card already used ⚠",
            })
        }
        else if (nameOnCard === "") {
            this.setState({
                nameOnCardError: "Please Fill The Field",
                nameOnCardBorder: "red"
            })
        }
        else if (exp === "") {
            this.setState({
                expError: "Please Fill The Field",
                expBorder: "red"
            })
        }
        else if (cardExpire === true) {
            this.setState({
                expError: "Credit Card Expired",
                expBorder: "red"
            })
        }
        else if (cvc === "") {
            this.setState({
                cvcError: "Please Fill The Field",
                cvcBorder: "red"
            })
        }
        else if (bankName === "") {
            this.setState({
                bankNameError: "Please Fill The Field",
                bankNameBorder: "red"
            })
        }
        else if (bal === "") {
            this.setState({
                balError: "Please Fill The Field",
                balBorder: "red"
            })
        }
        else if (aval === "") {
            this.setState({
                avalError: "Please Fill The Field",
                avalBorder: "red"
            })
        }
        else if (lastPay === "") {
            this.setState({
                lastPayError: "Please Fill The Field",
                lastPayBorder: "red"
            })
        }
        else if (duePay === "") {
            this.setState({
                duePayError: "Please Fill The Field",
                duePayBorder: "red"
            })
        }
        else if (aprl === "") {
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
                duePay: duePay,
                aprl: aprl,
                card: true,
                cardScheme: cardScheme
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
            this.state.cards.push(issuer)
            this.state.cardDetail.push(cardDetail)
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
                duePay: "",
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
                cardExpire: ""
            })
        }

    }
    cardExpiryCheck() {
        let { exp } = this.state;
        const month = exp.substring(0, 2)
        const year = 20 + exp.substring(3)
        const expiryDate = new Date(year + '-' + month + '-01');
        if (expiryDate < new Date()) {
            this.setState({ expBorder: "red", expBackground: "#f6e0df", cardExpire: true })
        } else {
            if (exp.indexOf(" ") === -1 && exp.length === 5) {
                this.setState({
                    expBorder: "green", expBackground: "#d4eed8", cardExpire: false
                })
            }
        }
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
    render() {
        let { fullName, phone, phone2, cell, address, city, state, zipCode, email, dob, bankName, bankNumber, nameOnCard, mmn, ssn, Notes, cc, cvc, exp, bal, aval, lastPay, duePay, aprl, SecurityWord, EmploymentStatus, HousingStatus, AnnualIncome, Education, Designation, Company, ChequinAccount, OtherLoan, MonthlyMortgages, } = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="8" style={{ margin: '0 auto' }}>
                        <Card>
                            <CardHeader style={{ backgroundColor: "#2f353a" }}>
                                <strong style={{ color: "#fff" }}>New Saleeee</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label htmlFor="company">Full Name</Label>
                                    <Input type="text" placeholder="Enter your name" style={{ borderColor: this.state.fullNameBorder, backgroundColor: this.state.fullNameBackground }} value={fullName} onBlur={() => { if (fullName.length> 1) { this.setState({ fullNameBorder: 'green', fullNameBackground: "#d4eed8" }) } else { this.setState({ fullNameBorder: 'red', fullNameBackground: "#f6e0df" }) } }} onChange={e => this.setState({ fullName: e.target.value, fullNameError: "", fullNameBorder: "", fullNameBackground: "" })} />
                                    {this.state.fullNameError === "" ?
                                        null
                                        :
                                        <small style={{ color: 'red', float: 'right' }}>{this.state.fullNameError}</small>
                                    }
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="12" sm="4">
                                        <FormGroup>
                                            <Label htmlFor="vat">Phone 1</Label>
                                            <NumberFormat format="+# (###) ###-####" mask="_" displayType={'input'} className="format" placeholder="Phone 1" style={{ borderColor: this.state.phoneBorder, backgroundColor: this.state.phoneBackground }} onBlur={() => { if (phone === "") { this.setState({ phoneBorder: 'red', phoneBackground: "#f6e0df" }) } else if (phone.search("_")> 0) { this.setState({ phoneBorder: 'red', phoneBackground: "#f6e0df" }) } else { this.setState({ phoneBorder: 'green', phoneBackground: "#d4eed8" }) } }} value={phone} onChange={e => this.setState({ phone: e.target.value, phoneError: "", phoneBorder: "", phoneBackground: "" })} />
                                            {this.state.phoneError === "" ?
                                                null
                                                :
                                                <small style={{ color: 'red', float: 'right' }}>{this.state.phoneError}</small>
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="4">
                                        <FormGroup>
                                            <Label htmlFor="vat">Phone 2<small>(Optional)</small></Label>
                                            <NumberFormat format="+# (###) ###-####" mask="_" displayType={'input'} className="format" placeholder="Phone 2" style={{ borderColor: this.state.phone2Border, backgroundColor: this.state.phone2Background }} onBlur={() => { if (phone2.search("_")> 0) { this.setState({ phone2Border: 'red', phone2Background: "#f6e0df" }) } else if (phone2.length> 1) { this.setState({ phone2Border: 'green', phone2Background: "#d4eed8" }) } }} value={phone2} onChange={e => this.setState({ phone2: e.target.value, phone2Border: "", phone2Background: "" })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="4">
                                        <FormGroup>
                                            <Label htmlFor="vat">Cell Phone<small>(Optional)</small></Label>
                                            <Input type="number" placeholder="Cell" value={cell} style={{ borderColor: this.state.cellBorder, backgroundColor: this.state.cellBackground }} onBlur={() => { if (cell.length> 1) { this.setState({ cellBorder: 'green', cellBackground: "#d4eed8" }) } }} onChange={e => this.setState({ cell: e.target.value, cellBorder: '', cellBackground: "" })} />
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="street">Address</Label>
                                    <Input type="address" placeholder="Enter Address" style={{ borderColor: this.state.addressBorder, backgroundColor: this.state.addressBackground }} value={address} onBlur={() => { if (address.length> 1) { this.setState({ addressBorder: 'green', addressBackground: "#d4eed8" }) } else { this.setState({ addressBorder: 'red', addressBackground: "#f6e0df" }) } }} onChange={e => this.setState({ address: e.target.value, addressError: "", addressBorder: "", addressBackground: "" })} />
                                    {this.state.addressError === "" ?
                                        null
                                        :
                                        <small style={{ color: 'red', float: 'right' }}>{this.state.addressError}</small>
                                    }
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="postal-code">State</Label>
                                            <select className="format" style={{ borderColor: this.state.stateBorder, backgroundColor: this.state.stateBackground }} value={state} onBlur={() => { if (state !== "Select") { this.setState({ stateBorder: 'green', stateBackground: "#d4eed8" }) } else { this.setState({ stateBorder: 'red', stateBackground: "#f6e0df" }) } }} onChange={e => this.setState({ state: e.target.value, stateError: "", stateBorder: "", stateBackground: "" })}>
                                                <option value="Select">Select</option>
                                                <option value="Alabama (AL)">Alabama (AL)</option>
                                                <option value="Alaska (AK)">Alaska (AK)</option>
                                                <option value="Arizona (AZ)">Arizona (AZ)</option>
                                                <option value="Arkansas (AR)">Arkansas (AR)</option>
                                                <option value="California (CA)">California (CA)</option>
                                                <option value="Colorado (CO)">Colorado (CO)</option>
                                                <option value="Connecticut (CT)">Connecticut (CT)</option>
                                                <option value="Delaware (DE)">Delaware (DE)</option>
                                                <option value="District of Columbia (DC)">District of Columbia (DC)</option>
                                                <option value="Florida (FL)">Florida (FL)</option>
                                                <option value="Georgia (GA)">Georgia (GA)</option>
                                                <option value="Hawaii (HI)">Hawaii (HI)</option>
                                                <option value="Idaho (ID)">Idaho (ID)</option>
                                                <option value="Illinois (IL)">Illinois (IL)</option>
                                                <option value="Indiana (IN)">Indiana (IN)</option>
                                                <option value="Iowa (IA)">Iowa (IA)</option>
                                                <option value="Kansas (KS)">Kansas (KS)</option>
                                                <option value="Kentucky (KY)">Kentucky (KY)</option>
                                                <option value="Louisiana (LA)">Louisiana (LA)</option>
                                                <option value="Maine (ME)">Maine (ME)</option>
                                                <option value="Maryland (MD)">Maryland (MD)</option>
                                                <option value="Massachusetts (MA)">Massachusetts (MA)</option>
                                                <option value="Michigan (MI)">Michigan (MI)</option>
                                                <option value="Minnesota (MN)">Minnesota (MN)</option>
                                                <option value="Mississippi (MS)">Mississippi (MS)</option>
                                                <option value="Missouri (MO)">Missouri (MO)</option>
                                                <option value="Montana (MI)">Montana (MI)</option>
                                                <option value="Nebraska (NE)">Nebraska (NE)</option>
                                                <option value="Nevada (NV)">Nevada (NV)</option>
                                                <option value="New Hampshire (NH)">New Hampshire (NH)</option>
                                                <option value="New Jersey (NJ)">New Jersey (NJ)</option>
                                                <option value="New Mexico (NM)">New Mexico (NM)</option>
                                                <option value="New York (NY)">New York (NY)</option>
                                                <option value="North Carolina (NC)">North Carolina (NC)</option>
                                                <option value="North Dakota (ND)">North Dakota (ND)</option>
                                                <option value="Ohio (OH)">hio (OH)</option>
                                                <option value="Oklahoma (OK)">Oklahoma (OK)</option>
                                                <option value="Oregon (OR)">Oregon (OR)</option>
                                                <option value="Pennsylvania (PA)">Pennsylvania (PA)</option>
                                                <option value="Rhode Island (RI)">Rhode Island (RI)</option>
                                                <option value="South Carolina (SC)">South Carolina (SC)</option>
                                                <option value="South Dakota (SD)">South Dakota (SD)</option>
                                                <option value="Tennessee (TN)">Tennessee (TN)</option>
                                                <option value="Texas (TX)">Texas (TX)</option>
                                                <option value="Utah (UT)">Utah (UT)</option>
                                                <option value="Vermont (VT)">Vermont (VT)</option>
                                                <option value="Virginia (VA)">Virginia (VA)</option>
                                                <option value="Washington (WA)">Washington (WA)</option>
                                                <option value="West Virginia (WV)">West Virginia (WV)</option>
                                                <option value="Wisconsin (WI)">Wisconsin (WI)</option>
                                                <option value="Wyoming (WY)">Wyoming (WY)</option>
                                                <option value="Armed Forces Americas (AA)">Armed Forces Americas (AA)</option>
                                                <option value="Armed Forces Europe (AE)">Armed Forces Europe (AE)</option>
                                                <option value="Armed Forces Pacific (AP)">Armed Forces Pacific (AP)</option>
                                                <option value="Guam (GU)">Guam (GU)</option>
                                                <option value="Puerto Rico (PR)">Puerto Rico (PR)</option>
                                                <option value="US Virgin Islands (VI)">Puerto Rico (PR)</option>
                                                <option value="Marshall Islands (MH)">Marshall Islands (MH)</option>
                                                <option value="American Samoa (AS)">American Samoa (AS)</option>
                                                <option value="Northern Mariana Islands (MP)">Northern Mariana Islands (MP)</option>
                                                <option value="Palau">Palau</option>
                                                <option value="Federated States of Micronesia (FM)">Federated States of Micronesia (FM)</option>
                                            </select>
                                            {this.state.stateError === "" ?
                                                null
                                                :
                                                <small style={{ color: 'red', float: 'right' }}>{this.state.stateError}</small>
                                            }
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="city">City</Label>
                                            <Input type="text" placeholder="Enter your city" style={{ borderColor: this.state.cityBorder, backgroundColor: this.state.cityBackground }} value={city} onBlur={() => { if (city.length> 1) { this.setState({ cityBorder: 'green', cityBackground: "#d4eed8" }) } else { this.setState({ cityBorder: 'red', cityBackground: "#f6e0df" }) } }} onChange={e => this.setState({ city: e.target.value, cityError: "", cityBorder: "" })} />
                                            {this.state.cityError === "" ?
                                                null
                                                :
                                                <small style={{ color: 'red', float: 'right' }}>{this.state.cityError}</small>
                                            }
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="country">Zip code#</Label>
                                    <NumberFormat className="format" placeholder="Enter Zip" format="#####" style={{ borderColor: this.state.zipCodeBorder, backgroundColor: this.state.zipCodeBackground }} value={zipCode} onBlur={() => { if (zipCode === "" || zipCode.indexOf(" ") !== -1) { this.setState({ zipCodeBorder: 'red', zipCodeBackground: "#f6e0df" }) } else { this.setState({ zipCodeBorder: 'green', zipCodeBackground: "#d4eed8" }) } }} onChange={e => this.setState({ zipCode: e.target.value, zipCodeError: "", zipCodeBorder: "", zipCodeBackground: "" })} />
                                    {this.state.zipCodeError === "" ?
                                        null
                                        :
                                        <small style={{ color: 'red', float: 'right' }}>{this.state.zipCodeError}</small>
                                    }
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="vat">Email<small>(Optional)</small></Label>
                                            <Input type="email" placeholder="example@example.com" value={email} style={{ borderColor: this.state.emailBorder, backgroundColor: this.state.emailBackground }} onBlur={() => { if (email.length> 1) { this.setState({ emailBorder: 'green', emailBackground: "#d4eed8" }) } }} onChange={e => this.setState({ email: e.target.value, emailBorder: '', emailBackground: "" })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="vat">Dob#</Label>
                                            <Input type="date" placeholder="DE1234567890" style={{ borderColor: this.state.dobBorder, backgroundColor: this.state.dobBackground }} value={dob} onBlur={(e) => {
                                                if (dob.length> 1) {
                                                    function getAge(d1, d2) {
                                                        d2 = d2 || new Date();
                                                        var diff = d2.getTime() - d1.getTime();
                                                        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
                                                    }
                                                    var date = new Date(e.target.value);
                                                    var day = date.getDate();
                                                    var month = date.getMonth() + 1;
                                                    var year = date.getFullYear();
                                                    this.setState({ dobBorder: 'green', dobBackground: "#d4eed8", dobColor: "green", dobError: `${getAge(new Date(year, month, day))} years old` })
                                                } else { this.setState({ dobBorder: 'red', dobBackground: "#f6e0df" }) }
                                            }} onChange={e => this.setState({ dob: e.target.value, dobError: "", dobBorder: "", dobBackground: "" })} />
                                            {this.state.dobError === "" ?
                                                null
                                                :
                                                <small style={{ color: this.state.dobColor, float: 'right' }}>{this.state.dobError}</small>
                                            }
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="vat">Mother’s Medians Name</Label>
                                            <Input type="text" placeholder="Mother’s Medians Name" style={{ borderColor: this.state.mmnBorder, backgroundColor: this.state.mmnBackground }} value={mmn} onBlur={() => { if (mmn.length> 1) { this.setState({ mmnBorder: 'green', mmnBackground: "#d4eed8" }) } else { this.setState({ mmnBorder: 'red', mmnBackground: "#f6e0df" }) } }} onChange={e => this.setState({ mmn: e.target.value, mmnError: "", mmnBorder: "", mmnBackground: "" })} />
                                            {this.state.mmnError === "" ?
                                                null
                                                :
                                                <small style={{ color: 'red', float: 'right' }}>{this.state.mmnError}</small>
                                            }
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="street">Social Security Number</Label>
                                    <br />
                                    <NumberFormat className="format" format="###-##-####" placeholder="Social Security Number" style={{ borderColor: this.state.ssnBorder, backgroundColor: this.state.ssnBackground }} value={ssn} onBlur={this.ssnBlur.bind(this)} onChange={e => this.setState({ ssn: e.target.value, ssnError: "", ssnBorder: "", ssnBackground: "" })} />
                                    {/* <Input type="number" id="ssn" placeholder="Social Security Number" style={{ borderColor: this.state.ssnBorder }} value={ssn} onChange={e => this.setState({ ssn: e.target.value, ssnError: "", ssnBorder: "" })} /> */}
                                    {this.state.ssnError === "" ?
                                        null
                                        :
                                        <small style={{ color: 'red', float: 'right' }}>{this.state.ssnError}</small>
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="street">Notes</Label>
                                    <br />
                                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="4"
                                        placeholder="Content..." value={Notes} style={{ borderColor: this.state.notesBorder, backgroundColor: this.state.notesBackground }} onBlur={() => { if (Notes.length> 4) { this.setState({ notesBorder: 'green', notesBackground: "#d4eed8" }) } }} onChange={(e) => this.setState({ Notes: e.target.value, notesBorder: "", notesBackground: "" })} />
                                </FormGroup>
                                <Button onClick={() => { if (this.state.cardDisplay === 'none') { this.setState({ cardDisplay: 'block' }) } else { this.setState({ cardDisplay: 'none' }) } }} type="submit" size="sm" color="secondary" style={{ float: 'right' }}><i className="fa fa-plus"></i> Add Card Detail</Button>
                                <Button onClick={() => { if (this.state.otherDetail === 'none') { this.setState({ otherDetail: 'block' }) } else { this.setState({ otherDetail: 'none' }) } }} type="submit" size="sm" color="secondary" style={{ float: 'right', marginRight: '3px', borderColor: this.state.OtherBorder, backgroundColor: this.state.OtherBackground }}><i className="fa fa-plus"></i> Add Other Detail</Button>
                                <br />
                                <hr />
                                {
                                    <div style={{ display: "inline" }}>

                                        <Master color={this.state.cards.indexOf("mastercard") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)"} />
                                        <Badge style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: this.state.cards.indexOf("mastercard") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)", color: "#fff", paddingTop: 5 }} color={'warning'}>{this.state.master}</Badge>

                                        <Visa color={this.state.cards.indexOf("visa") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)"} />
                                        <Badge style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: this.state.cards.indexOf("visa") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)", color: "#fff", paddingTop: 5 }} color={'warning'}>{this.state.visa}</Badge>

                                        <Discover color={this.state.cards.indexOf("discover") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)"} />

                                        <Badge style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: this.state.cards.indexOf("discover") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)", color: "#fff", paddingTop: 5 }} color={'warning'}>{this.state.discover}</Badge>
                                        <Amex color={this.state.cards.indexOf("amex") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)"} />
                                        <Badge style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: this.state.cards.indexOf("amex") !== -1 ? "#013a51" : "rgb(153,153,153,0.5)", color: "#fff", paddingTop: 5 }} color={'warning'}>{this.state.amex}</Badge>

                                        {/* <i className="fa fa-credit-card fa-2x" style={{ marginRight: "3px", color: "##2f353a" }}></i> */}

                                    </div>

                                }
                                <div style={{ display: this.state.otherDetail }}>
                                    <br />
                                    <hr />
                                    <FormGroup row className="my-0">
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="street">Security Word</Label>
                                                <Input type="text" placeholder="Security Word" style={{ borderColor: this.state.SecurityWordBorder, backgroundColor: this.state.SecurityWordBackground }} value={SecurityWord} onChange={e => this.setState({ SecurityWord: e.target.value, SecurityWordBackground: "", SecurityWordBorder: "", OtherBackground: "", OtherBorder: "", OtherError: "" })} onBlur={() => { if (SecurityWord.length> 1) { this.setState({ SecurityWordBorder: 'green', SecurityWordBackground: "#d4eed8" }) } else { this.setState({ SecurityWordBorder: 'red', SecurityWordBackground: "#f6e0df" }) } }} />
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">

                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="vat">Highest Level of Education</Label>
                                                <select className="format" value={Education} style={{ borderColor: this.state.EducationBorder, backgroundColor: this.state.EducationBackground }} onChange={e => this.setState({ Education: e.target.value })} onBlur={() => { if (Education !== "Select") { this.setState({ EducationBorder: 'green', EducationBackground: "#d4eed8" }) } else { this.setState({ EducationBorder: 'red', EducationBackground: "#f6e0df" }) } }}>
                                                    <option value="Select">Select</option>
                                                    <option value="Less than a high school diploma">Less than a high school diploma</option>
                                                    <option value="High school diploma or GED">High school diploma or GED</option>
                                                    <option value="Some college or associate degree">Some college or associate degree</option>
                                                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                                                    <option value="Advanced/Graduate Degree">Advanced/Graduate Degree</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">

                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Employment Status</Label>
                                                <select className="format" value={EmploymentStatus} style={{ borderColor: this.state.EmploymentStatusBorder, backgroundColor: this.state.EmploymentStatusBackground }} onChange={e => this.setState({ EmploymentStatus: e.target.value })} onBlur={() => { if (EmploymentStatus !== "Select") { this.setState({ EmploymentStatusBorder: 'green', EmploymentStatusBackground: "#d4eed8" }) } else { this.setState({ EmploymentStatusBorder: 'red', EmploymentStatusBackground: "#f6e0df" }) } }}>
                                                    <option value="Select">Select</option>
                                                    <option value="Employed Full-Time">Employed Full-Time</option>
                                                    <option value="Employed Part-Time">Employed Part-Time</option>
                                                    <option value="Self-Employed">Self-Employed</option>
                                                    <option value="Unemployed">Unemployed</option>
                                                    <option value="Retired">Retired</option>
                                                    <option value="Other">Other</option>
                                                    <option value="College Student">College Student</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Housing Status</Label>
                                                <select className="format" value={HousingStatus} style={{ borderColor: this.state.HousingStatusBorder, backgroundColor: this.state.HousingStatusBackground }} onChange={e => this.setState({ HousingStatus: e.target.value })} onBlur={() => { if (HousingStatus !== "Select") { this.setState({ HousingStatusBorder: 'green', HousingStatusBackground: "#d4eed8" }) } else { this.setState({ HousingStatusBorder: 'red', HousingStatusBackground: "#f6e0df" }) } }}>
                                                    <option value="Select">Select</option>
                                                    <option value="Own Home">Own Home</option>
                                                    <option value="Rent">Rent</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    {this.state.EmploymentStatus === "Unemployed" || this.state.EmploymentStatus === "College Student" ?
                                        null
                                        :
                                        <FormGroup row className="my-0">
                                            <Col xs="6">
                                                <FormGroup>
                                                    <Label htmlFor="vat">Company<small>(Optional)</small></Label>
                                                    <Input type="text" placeholder="Company" style={{ borderColor: this.state.CompanyBorder, backgroundColor: this.state.CompanyBackground }} value={Company} onChange={e => this.setState({ Company: e.target.value })} onBlur={() => { if (Company.length> 1) { this.setState({ CompanyBorder: 'green', CompanyBackground: "#d4eed8" }) } else { this.setState({ CompanyBorder: 'red', CompanyBackground: "#f6e0df" }) } }} />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="6">
                                                <FormGroup>
                                                    <Label htmlFor="street">Designation<small>(Optional)</small></Label>
                                                    <Input type="text" placeholder="Designation" style={{ borderColor: this.state.DesignationBorder, backgroundColor: this.state.DesignationBackground }} value={Designation} onChange={e => this.setState({ Designation: e.target.value })} onBlur={() => { if (Designation.length> 1) { this.setState({ DesignationBorder: 'green', DesignationBackground: "#d4eed8" }) } else { this.setState({ DesignationBorder: 'red', DesignationBackground: "#f6e0df" }) } }} />
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                                    }
                                    <FormGroup row className="my-0">
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="street">Annual income</Label>
                                                <NumberFormat displayType={'input'} thousandSeparator={true} prefix={'$'} style={{ borderColor: this.state.AnnualIncomeBorder, backgroundColor: this.state.AnnualIncomeBackground }} className="format" placeholder="Annual income" value={AnnualIncome} onChange={e => this.setState({ AnnualIncome: e.target.value })} onBlur={() => { if (AnnualIncome.length> 1) { this.setState({ AnnualIncomeBorder: 'green', AnnualIncomeBackground: "#d4eed8" }) } else { this.setState({ AnnualIncomeBorder: 'red', AnnualIncomeBackground: "#f6e0df" }) } }} />
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label htmlFor="vat">Chequin Accounts</Label>
                                                <select className="format" value={ChequinAccount} style={{ borderColor: this.state.ChequinAccountBorder, backgroundColor: this.state.ChequinAccountBackground }} onChange={e => this.setState({ ChequinAccount: e.target.value })} onBlur={() => { if (ChequinAccount !== "Select") { this.setState({ ChequinAccountBorder: 'green', ChequinAccountBackground: "#d4eed8" }) } else { this.setState({ ChequinAccountBorder: 'red', ChequinAccountBackground: "#f6e0df" }) } }}>
                                                    <option value="Select">Select</option>
                                                    <option value="Chequin">Chequin</option>
                                                    <option value="Saving">Saving</option>
                                                    <option value="Chequin-Saving">Chequin-Saving</option>
                                                    <option value="None">None</option>
                                                </select>
                                            </FormGroup>
                                        </Col>
                                        {/* <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Saving<small>(Optional)</small></Label>
                                                <NumberFormat displayType={'input'} thousandSeparator={true} prefix={'$'} className="format" placeholder="Saving" value={Saving} onChange={e => this.setState({ Saving: e.target.value, })} />
                                            </FormGroup>
                                        </Col> */}
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="12" sm="6">
                                            <Label htmlFor="country">Other Loans</Label>
                                            <select className="format" value={OtherLoan} style={{ borderColor: this.state.OtherLoanBorder, backgroundColor: this.state.OtherLoanBackground }} onChange={e => this.setState({ OtherLoan: e.target.value })} onBlur={() => { if (OtherLoan !== "Select") { this.setState({ OtherLoanBorder: 'green', OtherLoanBackground: "#d4eed8" }) } else { this.setState({ OtherLoanBorder: 'red', OtherLoanBackground: "#f6e0df" }) } }}>
                                                <option value="Select">Select</option>
                                                <option value="Loan">Loan</option>
                                                <option value="Mortgages">Mortgages</option>
                                                <option value="Loan-Mortgages">Loan-Mortgages</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label htmlFor="country">Monthly Rent/Mortgage</Label>
                                                <NumberFormat className="format" placeholder="Monthly Rent/Mortgage" thousandSeparator={true} prefix={'$'} style={{ borderColor: this.state.MonthlyMortgagesBorder, backgroundColor: this.state.MonthlyMortgagesBackground }} value={MonthlyMortgages} onChange={e => this.setState({ MonthlyMortgages: e.target.value })} onBlur={() => { if (MonthlyMortgages.length> 1) { this.setState({ MonthlyMortgagesBorder: 'green', MonthlyMortgagesBackground: "#d4eed8" }) } else { this.setState({ MonthlyMortgagesBorder: 'red', MonthlyMortgagesBackground: "#f6e0df" }) } }} />
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>


                                </div>
                                <div style={{ display: this.state.cardDisplay }}>
                                    <hr />
                                    <FormGroup row className="my-0">
                                        <Col xs="12" sm="12" md="12" lg="6">
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="city">CC</Label>
                                                    {this.state.ccError === "" ?
                                                        null
                                                        :
                                                        <p style={{ color: this.state.ccBorder, float: "right", marginBottom: "0rem" }}>{this.state.ccError}</p>
                                                    }
                                                    <NumberFormat displayType={'input'} className="format" format={this.state.issuer === "amex" ? '###############' : "################"} placeholder="Credit Card Number" style={{ borderColor: this.state.ccBorder, backgroundColor: this.state.ccBackground }} value={cc} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)} />
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="vat">Name On Card</Label>
                                                    <Input type="text" placeholder="Name On Card" style={{ borderColor: this.state.nameOnCardBorder, backgroundColor: this.state.nameOnCardBackground }} value={nameOnCard} onBlur={() => { if (nameOnCard.length> 3) { this.setState({ nameOnCardBorder: "green", nameOnCardBackground: "#d4eed8" }) } else { this.setState({ nameOnCardBorder: "red", nameOnCardBackground: "#f6e0df" }) } }} onChange={e => this.setState({ nameOnCard: e.target.value, nameOnCardError: "", nameOnCardBorder: "", nameOnCardBackground: "" })} />
                                                    {this.state.nameOnCardError === "" ?
                                                        null
                                                        :
                                                        <small style={{ color: 'red', float: 'right' }}>{this.state.nameOnCardError}</small>
                                                    }
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12">
                                                <FormGroup row className="my-0">
                                                    <Col xs="6">
                                                        <FormGroup>
                                                            <Label htmlFor="country">Exp#</Label>
                                                            <NumberFormat format={this.cardExpiry} className="format" placeholder="CC Expiration" style={{ borderColor: this.state.expBorder, backgroundColor: this.state.expBackground }} value={exp} onBlur={this.cardExpiryCheck.bind(this)} onChange={(e) => this.setState({ exp: e.target.value, expError: "", expBorder: "", expBackground: "" })} />
                                                            {this.state.expError === "" ?
                                                                null
                                                                :
                                                                <small style={{ color: 'red', float: 'right' }}>{this.state.expError}</small>
                                                            }
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xs="6">
                                                        <FormGroup>
                                                            <Label htmlFor="postal-code">CVC</Label>
                                                            <NumberFormat displayType={'input'} className="format" format={this.state.issuer === "amex" ? '####' : '###'} placeholder="CVC" style={{ borderColor: this.state.cvcBorder, backgroundColor: this.state.cvcBackground }} value={cvc} onBlur={() => { if (cvc.indexOf("  ") === -1 && cvc !== "") { this.setState({ cvcBorder: "green", cvcBackground: "#d4eed8", focused: "cc" }) } else { this.setState({ cvcBorder: "red", cvcBackground: "#f6e0df", focused: "cc" }) } }} onFocus={() => this.setState({ focused: "cvc" })} onChange={e => this.setState({ cvc: e.target.value, cvcError: "", cvcBorder: "", cvcBackground: "" })} />
                                                            {this.state.cvcError === "" ?
                                                                null
                                                                :
                                                                <small style={{ color: 'red', float: 'right' }}>{this.state.cvcError}</small>
                                                            }
                                                        </FormGroup>
                                                    </Col>
                                                </FormGroup>
                                            </Col>

                                        </Col>
                                        <Col xs="12" sm="12" md="12" lg="6">
                                            <br />
                                            <br />
                                            <Cards
                                                number={cc}
                                                name={nameOnCard}
                                                expiry={exp}
                                                cvc={cvc}
                                                focused={this.state.focused}
                                                callback={(a, b) => {
                                                    this.setState({ issuer: a.issuer })
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="street">Bank  Name</Label>
                                                <Input type="text" placeholder="Bank Name" style={{ borderColor: this.state.bankNameBorder, backgroundColor: this.state.bankNameBackground }} value={bankName} onBlur={() => { if (bankName.length> 2) { this.setState({ bankNameBorder: "green", bankNameBackground: "#d4eed8" }) } else { this.setState({ bankNameBorder: "red", bankNameBackground: "#f6e0df" }) } }} onChange={e => this.setState({ bankName: e.target.value, bankNameError: "", bankNameBorder: "", bankNameBackground: "" })} />
                                                {this.state.bankNameError === "" ?
                                                    null
                                                    :
                                                    <small style={{ color: 'red', float: 'right' }}>{this.state.bankNameError}</small>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="street">Bank Number<small>(Optional)</small></Label>
                                                <NumberFormat displayType={'input'} className="format" placeholder="Bank Number" style={{ borderColor: this.state.bankNumberBorder, backgroundColor: this.state.bankNumberBackGround }} value={bankNumber} onChange={e => this.setState({ bankNumber: e.target.value, bankNumberError: "", })} />
                                                {this.state.bankNumberError === "" ?
                                                    null
                                                    :
                                                    <small style={{ color: 'red', float: 'right' }}>{this.state.bankNumberError}</small>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Balance</Label>
                                                <NumberFormat displayType={'input'} thousandSeparator={true} prefix={'$'} className="format" placeholder="$" style={{ borderColor: this.state.balBorder, backgroundColor: this.state.balBackground }} value={bal} onBlur={() => { if (bal !== "") { this.setState({ balBorder: "green", balBackground: "#d4eed8" }) } else { this.setState({ balBorder: "red", balBackground: "#f6e0df" }) } }} onChange={e => this.setState({ bal: e.target.value, balError: "", balBorder: "", balBackground: "" })} />
                                                {this.state.balError === "" ?
                                                    null
                                                    :
                                                    <small style={{ color: 'red', float: 'right' }}>{this.state.balError}</small>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Available</Label>
                                                <NumberFormat displayType={'input'} thousandSeparator={true} prefix={'$'} className="format" placeholder="$" style={{ borderColor: this.state.avalBorder, backgroundColor: this.state.avalBackground }} value={aval} onBlur={() => { if (aval !== "") { this.setState({ avalBorder: "green", avalBackground: "#d4eed8" }) } else { this.setState({ avalBorder: "red", avalBackground: "#f6e0df" }) } }} onChange={e => this.setState({ aval: e.target.value, avalError: "", avalBorder: "", avalBackground: "" })} />
                                                {this.state.avalError === "" ?
                                                    null
                                                    :
                                                    <small style={{ color: 'red', float: 'right' }}>{this.state.avalError}</small>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Last Payment</Label>
                                                <NumberFormat displayType={'input'} thousandSeparator={true} prefix={'$'} className="format" placeholder="$" style={{ borderColor: this.state.lastPayBorder, backgroundColor: this.state.lastPayBackground }} value={lastPay} onBlur={() => { if (lastPay !== "") { this.setState({ lastPayBorder: "green", lastPayBackground: "#d4eed8" }) } else { this.setState({ lastPayBorder: "red", lastPayBackground: "#f6e0df" }) } }} onChange={e => this.setState({ lastPay: e.target.value, lastPayError: "", lastPayBorder: "", lastPayBackground: "" })} />
                                                {this.state.lastPayError === "" ?
                                                    null
                                                    :
                                                    <small style={{ color: 'red', float: 'right' }}>{this.state.lastPayError}</small>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label htmlFor="vat">Due Payment</Label>
                                                <NumberFormat displayType={'input'} thousandSeparator={true} prefix={'$'} className="format" placeholder="$" style={{ borderColor: this.state.duePayBorder, backgroundColor: this.state.duePayBackground }} value={duePay} onBlur={() => { if (duePay !== "") { this.setState({ duePayBorder: "green", duePayBackground: "#d4eed8" }) } else { this.setState({ duePayBorder: "red", duePayBackground: "#f6e0df" }) } }} onChange={e => this.setState({ duePay: e.target.value, duePayError: "", duePayBorder: "", duePayBackground: "" })} />
                                                {this.state.duePayError === "" ?
                                                    null
                                                    :
                                                    <small style={{ color: 'red', float: 'right' }}>{this.state.duePayError}</small>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="country">Interest Rate</Label>
                                        <NumberFormat displayType={'input'} className="format" format="##.##%" placeholder="Interest Rate" style={{ borderColor: this.state.aprlBorder, backgroundColor: this.state.aprlBackground }} value={aprl} onBlur={() => { if (aprl !== "" && aprl.indexOf(" ") === -1) { this.setState({ aprlBorder: "green", aprlBackground: "#d4eed8" }) } else { this.setState({ aprlBorder: "red", aprlBackground: "#f6e0df" }) } }} onChange={e => this.setState({ aprl: e.target.value, aprlError: "", aprlBorder: "", aprlBackground: "" })} />
                                        {this.state.aprlError === "" ?
                                            null
                                            :
                                            <small style={{ color: 'red', float: 'right' }}>{this.state.aprlError}</small>
                                        }
                                    </FormGroup>
                                    <Button type="submit" size="sm" color="success" style={{ marginRight: 15, width: 120, float: "right" }} onClick={this.saveCard.bind(this)}><i className="fa fa-dot-circle-o"></i> Save Card</Button>
                                </div>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label>Status</Label>
                                        <br />
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="Pending" onChange={(e) => this.setState({ saleStatus: e.target.value })} />
                                            <Label className="form-check-label" check htmlFor="inline-radio1">Pending<small>(default)</small></Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="Call Back" onChange={(e) => this.setState({ saleStatus: e.target.value })} />
                                            <Label className="form-check-label" check htmlFor="inline-radio2">Call Back</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="Transfer" onChange={(e) => this.setState({ saleStatus: e.target.value })} />
                                            <Label className="form-check-label" check htmlFor="inline-radio3">Transfer</Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                {this.state.saleStatus === "Call Back" ?

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label htmlFor="vat">Call Back Date</Label>
                                            <input className="format" type="date" placeholder="Date" onChange={(e) => this.setState({ callbackDate: e.target.value })} />
                                        </Col>
                                        <Col md="6">
                                            <Label htmlFor="vat">Call Back Time</Label>
                                            <input className="format" type="time" placeholder="Time" onChange={(e) => this.setState({ callbackTime: e.target.value })} />
                                        </Col>
                                    </FormGroup>
                                    :
                                    this.state.saleStatus === "Transfer" ?
                                        <FormGroup>
                                            <Label htmlFor="vat">Closer</Label>
                                            <select className="format" onChange={(e) => { console.log(e.target.value); this.setState({ transferCloser: e.target.value }) }}>
                                                <option value="Select">Select</option>
                                                {this.props.closers.map((v, i) => {
                                                    return <option key={i} value={JSON.stringify({ id: v.uid, name: v.username })} name={v.username}>{v.username}</option>
                                                })}
                                            </select>
                                        </FormGroup>
                                        :
                                        null
                                }
                            </CardBody>

                            <CardFooter style={{ float: "right", backgroundColor: "#fff" }}>
                                <Button type="submit" size="sm" color="success" style={{ marginRight: 15, width: 120 }} onClick={this.saveDeal}><i className="fa fa-dot-circle-o"></i> Save</Button>
                                <Button type="reset" size="sm" color="danger" style={{ width: 120 }} onClick={this.reset}><i className="fa fa-ban"></i> Reset</Button>
                                {this.state.success === true ? <small style={{ color: 'green', float: 'right', fontSize: 16 }}>Deal Succesfully save ✓✓</small> : null}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
function mapStateToProp(state) {
    return ({
        name: state.root.name,
        closers: state.root.closers
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        AddNewDeal: (data) => { dispatch(AddNewDeal(data)) },
        getUser: (user, agent) => { dispatch(getUser(user, agent)) }
    })
}


export default connect(mapStateToProp, mapDispatchToProp)(NewDeal);
