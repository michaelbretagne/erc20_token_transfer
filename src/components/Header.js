import React, { Component } from "react";
import { Menu, Modal, Message, Form } from "semantic-ui-react";
import Sending from "./Sending";
import Receiving from "./Receiving";
import ContractToken from "../ethereum/factory";

class Header extends Component {
  state = {
    modalOpenSend: false,
    modalOpenReceive: false,
    errorMessage: "",
    successMessage: ""
  };

  handleOpenSend = () => this.setState({ modalOpenSend: true });
  handleOpenReceive = () => this.setState({ modalOpenReceive: true });
  handleClose = () =>
    this.setState({ modalOpenSend: false, modalOpenReceive: false });

  getAirdrop = async event => {
    event.preventDefault();

    try {
      // Check if user already got an airdtop
      const airdrop = await ContractToken.methods
        .freeTokenReceiver(this.props.account)
        .call();

      if (!airdrop) {
        this.setState({
          successMessage:
            "Free tokens on their way... Please be patient. The transaction can take few minutes."
        });
        await ContractToken.methods
          .getFreeToken()
          .send({ from: this.props.account });

        this.setState({ successMessage: "Success, you got 1000 free BZH!" });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        this.setState({
          errorMessage: "You already got your free BZH tokens!"
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      this.setState({
        errorMessage: "Oops! " + err.message.split("\n")[0],
        successMessage: ""
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={this.getAirdrop}
          error={!!this.state.errorMessage}
          success={!!this.state.successMessage}
        >
          <Menu inverted icon="labeled">
            <Menu.Item name="ACCOUNTS" icon="users" active />
            <Menu.Item
              name="SEND"
              icon="arrow circle up"
              onClick={this.handleOpenSend}
            />
            <Menu.Item
              name="RECEIVE"
              icon="arrow circle down"
              onClick={this.handleOpenReceive}
            />
            <Menu.Item
              name="FREE TOKENS"
              icon="gift"
              onClick={this.getAirdrop}
            />

            <Menu.Menu position="right">
              <Menu.Item>
                BZH<br />
                <br />
                {this.props.balance}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
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
          <Message success content={this.state.successMessage} />
          <Message error content={this.state.errorMessage} />
        </Form>
      </div>
    );
  }
}

export default Header;
