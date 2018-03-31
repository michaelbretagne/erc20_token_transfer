import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import styles from "./Styles.css";

class Receiving extends Component {
  state = {
    address: "",
    qrCode: ""
  };

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

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sendingForm}>
          <div className={styles.sendingTitle}>
            <h3>RECEIVE BREIZH COINS</h3>
          </div>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column className={styles.leftAlign} width={4}>
                <h4>YOUR ADDRESS</h4>
              </Grid.Column>

              <Grid.Column className={styles.rightAlign} width={12}>
                <p>{this.state.address}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column width={6}>
                <h4>QR CODE</h4>
              </Grid.Column>
              <Grid.Column width={10} className={styles.center}>
                <img src={this.state.qrCode} alt="qr code" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Receiving;
