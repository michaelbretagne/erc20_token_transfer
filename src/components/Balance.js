import React, { Component } from "react";
import { Button, Message, Input } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import ContractToken from "../ethereum/factory";

class BalanceOf extends Component {
  state = {
    balance: "",
    address: "",
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

    const balance = await ContractToken.methods.balanceOf(accounts[0]).call();
    this.setState({ address: accounts[0], balance: balance });
  }

  render() {
    return (
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
        <h3>BALANCE</h3>
        <h1>{this.state.balance} BZH</h1>
      </div>
    );
  }
}

export default BalanceOf;
