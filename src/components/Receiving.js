import React, { Component } from "react";
import { Button, Message, Input, Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import ContractToken from "../ethereum/factory";
import styles from "./Styles.css";

class Receiving extends Component {
  async componentWillMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      this.setState({
        address: accounts[0],
        qrCode: `https://chart.googleapis.com/chart?chs=120x120&cht=qr&chl=${
          accounts[0]
        }&choe=UTF-8`
      });
    }
  }

  state = {
    address: "",
    qrCode: ""
  };

  render() {
    return (
      <div className={styles.containers}>
        <div className={styles.action}>
          <h3>RECEIVE BREIZH COINS</h3>
        </div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column className={styles.leftAlign}>
              <h4>YOUR ADDRESS</h4>
            </Grid.Column>

            <Grid.Column className={styles.rightAlign}>
              <p>{this.state.address}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className={styles.leftAlign}>
              <h4>QR CODE</h4>
            </Grid.Column>
            <Grid.Column>
              <img src={this.state.qrCode} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Receiving;
