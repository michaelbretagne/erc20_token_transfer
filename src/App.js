import React, { Component } from "react";
import "./App.css";
import BalanceOf from "./components/Balance";
import Sending from "./components/Sending";
import Receiving from "./components/Receiving";
import Transactions from "./components/Transactions";
import { Container, Grid } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Breizh Coin Token Wallet</h1>
          <h3 className="App-title">
            The easiest way to transfer your tokens!
          </h3>
        </header>
        <Container>
          <BalanceOf />

          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Sending />
              </Grid.Column>
              <Grid.Column>
                <Receiving />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Transactions />
        </Container>
      </div>
    );
  }
}

export default App;
