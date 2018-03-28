import React, { Component } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import ContractToken from "../ethereum/factory";
import styles from "./Styles.css";

class BalanceOf extends Component {
  state = {
    balance: "",
    usd: ""
  };

  async componentWillMount() {
    const accounts = await web3.eth.getAccounts();
    const balance = await ContractToken.methods.balanceOf(accounts[0]).call();
    const usd = Math.round(balance / 10000000).toFixed(2);
    this.setState({ balance, usd });
  }

  render() {
    return (
      <div className={styles.balanceComponent}>
        <Grid columns="equal" textAlign="left" padded>
          <Grid.Row>
            <Grid.Column>
              <Icon name="circle" size="small" color="teal" />MY ACCOUNT
            </Grid.Column>
            <Grid.Column />
            <Grid.Column />
            <Grid.Column />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <div className={styles.balance}>BALANCE</div>
              <div className={styles.balanceValue}>
                BZH{" "}
                <span style={{ fontWeight: "bold" }}>{this.state.balance}</span>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className={styles.balance}>
                <span style={{ color: "#9F9F9F" }}>COUNTERVALUE</span>
              </div>
              <div className={styles.balanceValue}>
                <span style={{ color: "#9F9F9F" }}>USD {this.state.usd}</span>
              </div>
            </Grid.Column>
            <Grid.Column />
            <Grid.Column>
              <div className={styles.rightAlign}>
                <div className={styles.actions}>ACTIONS</div>
                <div className={styles.sendButton}>
                  <Button color="teal" circular>
                    SEND
                  </Button>
                </div>
                <div className={styles.receiveButton}>
                  <Button color="teal" circular>
                    RECEIVE
                  </Button>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default BalanceOf;
