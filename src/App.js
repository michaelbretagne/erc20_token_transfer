import React, { Component } from "react";
import "./App.css";
import { Container, Grid, Message } from "semantic-ui-react";
import BalanceOf from "./components/Balance";
import Sending from "./components/Sending";
import Receiving from "./components/Receiving";
import Transactions from "./components/Transactions";
import Header from "./components/Header";
import web3 from "./ethereum/web3";

class App extends Component {
  state = {
    metaMaskFound: true,
    messageError1: "",
    messageError2: ""
  };

  async componentWillMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0] === undefined) {
      this.setState({
        messageError1: "MetaMask not found! Make sure",
        messageError2: "is installed and you are logged in!",
        metaMaskFound: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <div style={{ marginTop: 20 }}>
            {!this.state.metaMaskFound && (
              <Message error>
                <p>
                  {this.state.messageError1}{" "}
                  <a href="https://metamask.io/">MetaMask</a>{" "}
                  {this.state.messageError2}
                </p>
              </Message>
            )}
          </div>
          <BalanceOf />
          <Transactions />
          <Sending />
        </Container>
      </div>
    );
  }
}

export default App;
