import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import styles from "./Styles.css";
import { etherscanApiKey } from "../api_keys/keys";
var moment = require("moment");

class Transactions extends Component {
  async componentWillMount() {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = "	0x405be360e813b293b1b162ab10aba9b2813917d6";
    const topic =
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
    const apiUrl = await `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=2013369&toBlock=latest&address=${contractAddress}&topic0=${topic}&apikey=${etherscanApiKey}`;

    // Fetch data from Etherscan
    const response = await fetch(apiUrl);

    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    const data = await response.json();

    for (let result of data.result) {
      // Get address of operation
      const hexString = result.data;
      const value = parseInt(hexString, 16) / 100;
      // Get date of operation
      const timeStamp = result.timeStamp;
      const convertedTime = new Date(timeStamp * 1000);
      const formatedTime = moment(convertedTime).format("YYYY-MM-DD HH:mm");
      // Get value of operation
      const txReceipt = await web3.eth.getTransactionReceipt(
        result.transactionHash
      );

      const hashUrl = `https://rinkeby.etherscan.io/tx/${
        txReceipt.transactionHash
      }`;

      if (parseInt(accounts[0]) === parseInt(txReceipt.from)) {
        this.setState({
          value: [
            ...this.state.value,
            { amount: "-" + value.toFixed(2), color: "red" }
          ]
        });
      } else {
        this.setState({
          value: [
            ...this.state.value,
            { amount: "+" + value.toFixed(2), color: "green" }
          ]
        });
      }
      // const hashArr = [txReceipt.transactionHash, hashUrl];
      // Append data to state
      this.setState({
        txHash: [
          ...this.state.txHash,
          { txId: txReceipt.transactionHash, link: hashUrl }
        ],
        date: [...this.state.date, formatedTime]
      });
    }
  }

  state = {
    date: [],
    value: [],
    txHash: []
  };

  render() {
    return (
      <div className={styles.container}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} className={styles.leftAlign}>
              <h4 className={styles.paddingBottom}>LAST OPERATIONS</h4>
            </Grid.Column>
            <Grid.Column />
            <Grid.Column />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4} className={styles.leftAlign}>
              <h5>DATE AND TIME</h5>
            </Grid.Column>

            <Grid.Column width={8} className={styles.leftAlign}>
              <h5>TRANSACTION HASH</h5>
            </Grid.Column>

            <Grid.Column width={4} className={styles.rightAlign}>
              <h5>AMOUNT</h5>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4} className={styles.leftAlign}>
              {this.state.date.map(function(time) {
                return (
                  <div className={styles.operationRow}>
                    <li className={styles.transactionListTime} key={time}>
                      {time}
                    </li>
                  </div>
                );
              })}
            </Grid.Column>

            <Grid.Column width={8} className={styles.leftAlign}>
              {this.state.txHash.map(function(txHash) {
                return (
                  <div className={styles.operationRow}>
                    <li className={styles.transactionList} key={txHash}>
                      <a href={txHash.link}>{txHash.txId}</a>
                    </li>
                  </div>
                );
              })}
            </Grid.Column>

            <Grid.Column width={4} className={styles.rightAlign}>
              {this.state.value.map(function(value) {
                return (
                  <div className={styles.operationRow}>
                    <li
                      className={styles.transactionList}
                      style={{ color: value.color }}
                      key={value}
                    >
                      BZH {value.amount}
                    </li>
                  </div>
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* <div className={styles.action}>
          <h3 className={styles.leftAlign}>LAST OPERATIONS</h3>
        </div>
        <ul className="transcationsList">
          {this.state.date.map(function(time) {
            return <li key={time}>{time}</li>;
          })}
          {this.state.date.map(function(time) {
            return <li key={time}>{time}</li>;
          })}
        </ul> */}
      </div>
    );
  }
}

export default Transactions;
