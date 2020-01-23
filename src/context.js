import React, { Component } from "react";
import items from "./data";
const RoomContext = React.createContext();

//<RoomContxt.Provider value={'hello}

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true //loading part
  };

  //getData

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    this.setState({
      rooms, //ES6 version
      featuredRooms,
      sortedRooms: rooms,
      loading: false
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;

      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id }; //to overwrite images object

      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms]; //creATING A TEMP ROOMS ARRAY
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

//Another way to Use Room Consumer

export { RoomProvider, RoomConsumer, RoomContext };
