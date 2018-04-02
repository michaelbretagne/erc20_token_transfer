import React, { Component } from "react";
import { Segment, List, Container, Icon } from "semantic-ui-react";
import styles from "./Styles.css";

export default class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <Segment
          inverted
          vertical
          style={{
            margin: "1.5em 0em 0em",
            padding: "1.5em 0em",
            borderRadius: ".28571429rem"
          }}
        >
          <Container textAlign="center">
            <List horizontal inverted divided link>
              <List.Item
                href="https://github.com/michaelbretagne"
                target="_blank"
              >
                <Icon name="github" size="big" />
              </List.Item>
              <List.Item
                href="https://www.linkedin.com/in/michael-donal"
                target="_blank"
              >
                <Icon name="linkedin" size="big" />
              </List.Item>
              <List.Item href="https://michaeldonal.com/" target="_blank">
                <Icon name="world" size="big" />
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}
