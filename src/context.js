import React, { Component } from "react";
// import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

//<RoomContxt.Provider value={'hello}

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true, //loading part
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  //getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResort",
        order: "sys.createdAt"
      });
      let rooms = this.formatData(response.items);
      //response.items contains all the data from contentful

      //To use local data we need to use items from data.js rather than response.items

      let featuredRooms = rooms.filter(room => room.featured === true);

      //To know the maximum Price
      let maxPrice = Math.max(...rooms.map(item => item.price));

      //To know about maximum Size
      let maxSize = Math.max(...rooms.map(item => item.size));

      this.setState({
        rooms, //ES6 version
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
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

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //All the rooms
    let tempRooms = [...rooms];

    //Transform Value
    capacity = parseInt(capacity);
    price = parseInt(price);

    //Filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    //Filter by Price

    tempRooms = tempRooms.filter(room => room.price <= price);

    //Filter by roomsize

    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    //Changing state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

//Another way to Use Room Consumer
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
