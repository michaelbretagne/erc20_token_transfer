import React, { Component } from "react";
import { Menu, Modal } from "semantic-ui-react";
import Sending from "./Sending";
import Receiving from "./Receiving";

class Header extends Component {
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
      <div>
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
          closeIcon
        >
          <Modal.Content>
            <Sending />
          </Modal.Content>
        </Modal>
        <Modal
          open={this.state.modalOpenReceive}
          onClose={this.handleClose}
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

export default Header;
