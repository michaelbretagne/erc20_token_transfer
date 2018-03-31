import React, { Component } from "react";
import { Button, Grid, Icon, Modal } from "semantic-ui-react";
import styles from "./Styles.css";
import Sending from "./Sending";
import Receiving from "./Receiving";

class BalanceOf extends Component {
  state = {
    modalOpenSend: false,
    modalOpenReceive: false
  };

  handleOpenSend = () => this.setState({ modalOpenSend: true });
  handleOpenReceive = () => this.setState({ modalOpenReceive: true });
  handleClose = () =>
    this.setState({ modalOpenSend: false, modalOpenReceive: false });

  render() {
    return (
      <div className={styles.balanceComponent}>
        <Grid columns="equal" textAlign="left" padded>
          <Grid.Row>
            <Grid.Column width={16}>
              <Icon
                name="circle"
                size="small"
                color="teal"
                className={styles.accountTitle}
              />MY ACCOUNT
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <div className={styles.balance}>BALANCE</div>
              <div className={styles.balanceValue}>
                BZH{" "}
                <span style={{ fontWeight: "bold" }}>{this.props.balance}</span>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className={styles.balance}>
                <span style={{ color: "#9F9F9F" }}>COUNTERVALUE</span>
              </div>
              <div className={styles.balanceValue}>
                <span style={{ color: "#9F9F9F" }}>USD {this.props.usd}</span>
              </div>
            </Grid.Column>
            <Grid.Column />
            <Grid.Column>
              <div className={styles.rightAlign}>
                <div className={styles.actions}>ACTIONS</div>
                <div className={styles.sendButton}>
                  <Button color="teal" circular onClick={this.handleOpenSend}>
                    SEND
                  </Button>
                </div>
                <div className={styles.receiveButton}>
                  <Button
                    color="teal"
                    circular
                    onClick={this.handleOpenReceive}
                  >
                    RECEIVE
                  </Button>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal
          open={this.state.modalOpenSend}
          onClose={this.handleClose}
          size="small"
          closeIcon
        >
          <Modal.Content>
            <Sending />
          </Modal.Content>
        </Modal>
        <Modal
          open={this.state.modalOpenReceive}
          onClose={this.handleClose}
          size="small"
          closeIcon
        >
          <Modal.Content>
            <Receiving />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default BalanceOf;
