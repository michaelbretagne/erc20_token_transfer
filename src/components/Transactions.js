import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import styles from "./Styles.css";
import { etherscanApiKey } from "../api_keys/keys";
import factory from "../ethereum/factory";
var moment = require("moment");

class Transactions extends Component {
  state = {
    data: []
  };

  async componentWillMount() {
    // User accounts
    const accounts = await web3.eth.getAccounts();
    // Token contract address
    const contractAddress = factory._address;
    // Keccak256 hash of the signature of the event. Can be found on Etherscan as topics[0] on any transactions event logs
    const topic =
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
    const urlEventLog = await `https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=2013369&toBlock=latest&address=${contractAddress}&topic0=${topic}&apikey=${etherscanApiKey}`;

    // Fetch event log to retrieve transactions data of the contract
    const contractLog = await fetch(urlEventLog);

    if (accounts[0]) {
      // Check status of API call
      if (contractLog.status >= 400) {
        throw new Error("Bad response from server");
      }
      // JSON format of the data
      const contractData = await contractLog.json();

      // Iterate through transactions data
      for (let result of contractData.result.reverse()) {
        // Check for the token address
        if (result.address.toLowerCase() === contractAddress.toLowerCase()) {
          // Topic 1 = sender, Topic 2 = receiver
          const from = result.topics[1].replace("000000000000000000000000", "");
          const to = result.topics[2].replace("000000000000000000000000", "");
          // Get hash of each transaction
          const hash = result.transactionHash;

          // Check if the user sent or received trnascations
          if (
            accounts[0].toLowerCase() === to.toLowerCase() ||
            accounts[0].toLowerCase() === from.toLowerCase()
          ) {
            // Assign data variables
            const hexString = result.data;
            const hashUrl = `https://rinkeby.etherscan.io/tx/${hash}`;
            const timeStamp = new Date(result.timeStamp * 1000);
            const formatedTime = moment(timeStamp).format("MM-DD-YYYY HH:mm");
            let value = parseInt(hexString, 16) / 100;

            // Check if user sent or received the transaction then assign operator and style (color)
            if (accounts[0].toLowerCase() === from.toLowerCase()) {
              value = { amount: "-" + value.toFixed(2), color: "red" };
            } else {
              value = { amount: "+" + value.toFixed(2), color: "green" };
            }

            // Set state
            this.setState({
              data: [
                ...this.state.data,
                {
                  txHash: hash,
                  link: hashUrl,
                  time: formatedTime,
                  value,
                  from,
                  to
                }
              ]
            });
          }
        }
      }
    }
  }

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
              <div className={styles.transactionTitles}>DATE AND TIME</div>
            </Grid.Column>

            <Grid.Column width={8} className={styles.leftAlign}>
              <div className={styles.transactionTitles}>TRANSACTION HASH</div>
            </Grid.Column>

            <Grid.Column width={4} className={styles.rightAlign}>
              <div className={styles.transactionTitles}>AMOUNT</div>
            </Grid.Column>
          </Grid.Row>

          {/* Iterate through the data */}
          {this.state.data.map((data, index) => {
            return (
              <Grid.Row key={index}>
                {/* Times and dates column */}
                <Grid.Column width={4} className={styles.leftAlign}>
                  <div className={styles.operationRow} key={index}>
                    <li className={styles.transactionListTime}>{data.time}</li>
                  </div>
                </Grid.Column>
                {/* Transaction hashes and links to etherscan*/}
                <Grid.Column width={8} className={styles.leftAlign}>
                  <div className={styles.operationRow} key={index}>
                    <li className={styles.transactionList}>
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.txHash}
                      </a>
                    </li>
                  </div>
                </Grid.Column>
                {/* Amount transfered */}
                <Grid.Column width={4} className={styles.rightAlign}>
                  <div className={styles.operationRow}>
                    <li
                      className={styles.transactionList}
                      style={{ color: data.value.color }}
                    >
                      BZH {data.value.amount}
                    </li>
                  </div>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default Transactions;
