import React, { Component } from "react";
import "./App.css";
import { Container, Message } from "semantic-ui-react";
import ContractToken from "./ethereum/factory";
import BalanceOf from "./components/Balance";
import Transactions from "./components/Transactions";
import Header from "./components/Header";
import web3 from "./ethereum/web3";

class App extends Component {
  state = {
    metaMaskFound: true,
    messageError1: "",
    messageError2: "",
    balance: "",
    usd: ""
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
    const balance = await ContractToken.methods.balanceOf(accounts[0]).call();
    const formatedBalance = (balance / 100).toFixed(2);
    const usd = Math.round(formatedBalance / 10000000).toFixed(2);
    this.setState({ balance: formatedBalance, usd });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Header balance={this.state.balance} />
          <div style={{ marginTop: 20 }}>
            {!this.state.metaMaskFound && (
              <Message error>
                <p>
                  {this.state.messageError1}{" "}
                  <a
                    href="https://metamask.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MetaMask
                  </a>{" "}
                  {this.state.messageError2}
                </p>
              </Message>
            )}
          </div>
          <BalanceOf balance={this.state.balance} usd={this.state.usd} />
          <Transactions />
        </Container>
      </div>
    );
  }
}

export default App;
