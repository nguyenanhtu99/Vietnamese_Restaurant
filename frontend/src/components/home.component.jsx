import React, { Component } from "react";

import UserService from "../services/user.service";

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1575"
};
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div>
        {/* <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header> */}
        <div class="hero-text-box">
                <h1>Goodbye junk food. <br></br> Hello super healthy meals.</h1>
                <a class="btn btn-full js--scroll-to-plans" href="#">I’m hungry</a>
                <a class="btn btn-ghost js--scroll-to-start" href="#">Show me more</a>
        </div>
      </div>
    );
  }
}
