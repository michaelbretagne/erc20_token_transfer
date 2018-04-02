import React, { Component } from "react";
import { Button, Message, Input, Grid, Form } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import ContractToken from "../ethereum/factory";
import styles from "./Styles.css";

class Sending extends Component {
  state = {
    amount: "",
    recipient: "",
    errorMessage: "",
    successMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await ContractToken.methods
        .transfer(this.state.recipient, this.state.amount * 100)
        .send({
          from: accounts[0]
        });
      this.setState({
        loading: false,
        successMessage: "Success! Your transcation has been sent."
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      this.setState({ errorMessage: "Oops! " + err.message.split("\n")[0] });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={!!this.state.successMessage}
        >
          <div className={styles.sendingForm}>
            <div className={styles.sendingTitle}>
              <h3>SEND BREIZH COINS</h3>
            </div>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column className={styles.leftAlign} width={6}>
                  <h4>AMOUNT</h4>
                </Grid.Column>

                <Grid.Column className={styles.rightAlign} width={10}>
                  <Input
                    transparent
                    fluid
                    placeholder="Amount BZH"
                    value={this.state.amount}
                    onChange={event =>
                      this.setState({ amount: event.target.value })
                    }
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column className={styles.leftAlign} width={6}>
                  <h4>RECIPIENT ADDRESS</h4>
                </Grid.Column>

                <Grid.Column className={styles.rightAlign} width={10}>
                  <Input
                    transparent
                    fluid
                    placeholder="Ethereum Address"
                    value={this.state.recipient}
                    onChange={event =>
                      this.setState({ recipient: event.target.value })
                    }
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column className={styles.leftAlign} width={12}>
                  <Message success content={this.state.successMessage} />
                  <Message error content={this.state.errorMessage} />
                </Grid.Column>

                <Grid.Column className={styles.rightAlign} width={4}>
                  <Button loading={this.state.loading} primary>
                    SEND
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Form>
      </div>
    );
  }
}

export default Sending;
