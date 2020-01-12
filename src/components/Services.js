import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info:
          "Nostrud consectetur elit nisi ut culpa elit duis. Pariatur exercitation qui consequat mollit"
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info:
          "Nostrud consectetur elit nisi ut culpa elit duis. Pariatur exercitation qui consequat mollit"
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Shuttles",
        info:
          "Nostrud consectetur elit nisi ut culpa elit duis. Pariatur exercitation qui consequat mollit "
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info:
          "Nostrud consectetur elit nisi ut culpa elit duis. Pariatur exercitation qui consequat mollit "
      }
    ]
  };

  render() {
    return (
      <section className="services">
        <Title title="services"></Title>
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
