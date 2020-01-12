import React, { Component } from "react";

const RoomContext = React.createContext();

//<RoomContxt.Provider value={'hello}

class RoomProvider extends Component {
  state = {
    greeting: "Hello",
    name: "John"
  };

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };