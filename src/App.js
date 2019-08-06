import React, { Component } from "react";
import MainRouter from "./MainRouter";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      ip: "103.245.193.114"
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);

    // fetch('https://api.ipify.org?format=json')
    //   .then(response => response.json())
    //   .then(json => this.setState({ ip: json.ip }))
  }

  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

export default App;
