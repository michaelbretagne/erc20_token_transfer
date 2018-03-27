import React, { Component } from "react";
import { Button, Message, Input, Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import ContractToken from "../ethereum/factory";
import styles from "./Styles.css";

class Transactions extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.action}>
          <h3 className={styles.leftAlign}>LAST OPERATIONS</h3>
        </div>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column className={styles.leftAlign}>
              <h4>DATE AND TIME</h4>
            </Grid.Column>

            <Grid.Column className={styles.leftAlign}>
              <h4>ETHEREUM ADDRESS</h4>
            </Grid.Column>

            <Grid.Column className={styles.leftRight}>
              <h4>AMOUNT</h4>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column className={styles.leftAlign}>
              <p>04/02/2018 at 12:12</p>
            </Grid.Column>

            <Grid.Column className={styles.leftAlign}>
              <p>To: 0x0dwdkwenkdnfnksnfiuw4</p>
            </Grid.Column>

            <Grid.Column className={styles.leftRight}>
              <p>-900 BZH</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column className={styles.leftAlign}>
              <p>02/05/2017 at 07:41</p>
            </Grid.Column>

            <Grid.Column className={styles.leftAlign}>
              <p>From: 0x0dwdkwenkdnfnksnfiuw4</p>
            </Grid.Column>

            <Grid.Column className={styles.leftRight}>
              <p>+500 BZH</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column className={styles.leftAlign}>
              <p>02/01/2017 at 1:12</p>
            </Grid.Column>

            <Grid.Column className={styles.leftAlign}>
              <p>From: 0x0dwdsdddqdwkwenkdnfnksnfiuw4</p>
            </Grid.Column>

            <Grid.Column className={styles.leftRight}>
              <p>+10 BZH</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column className={styles.leftAlign}>
              <p>09/11/2016 at 9:47</p>
            </Grid.Column>

            <Grid.Column className={styles.leftAlign}>
              <p>To: 0x0dwdsdddqdwkwenkdnfnksnfiuw4</p>
            </Grid.Column>

            <Grid.Column className={styles.leftRight}>
              <p>-70 BZH</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Transactions;
