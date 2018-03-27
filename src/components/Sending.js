import React, { Component } from "react";
import { Button, Message, Input, Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import ContractToken from "../ethereum/factory";
import styles from "./Styles.css";

class Sending extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.action}>
          <h3>SEND BREIZH COINS</h3>
        </div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column className={styles.leftAlign}>
              <h4>AMOUNT</h4>
            </Grid.Column>

            <Grid.Column className={styles.rightAlign}>
              <Input
                className={styles.rightAlign}
                transparent
                placeholder="Amount BZH"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className={styles.leftAlign}>
              <h4>RECIPIENT ADDRESS</h4>
            </Grid.Column>

            <Grid.Column className={styles.rightAlign}>
              <Input transparent placeholder="Ethereum Address" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column className={styles.leftAlign} />

            <Grid.Column className={styles.rightAlign}>
              <Button primary>Send</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Sending;
