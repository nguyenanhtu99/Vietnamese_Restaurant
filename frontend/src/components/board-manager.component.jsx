import React, { Component } from "react";
import authService from "../services/auth.service";

import UserService from "../services/user.service";

export default class BoardManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentUser: authService.getCurrentUser()
    };

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    UserService.getManagerBoard().then(
      response => {
        this.setState({
          users: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  updateUser(id){
    this.props.history.push(`/user/${id}`);
  }

  deleteUser(id){
    authService.deleteUser(id).then(res => {
      this.setState({users: this.state.users.filter(user => user.id !== id)});
    })
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Manager</h3>
        </header>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> User Name</th>
                                    <th> User Email</th>
                                    <th> User Roles</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.filter(user => this.state.currentUser.roles.includes("ROLE_ADMIN") || !user.roles.map(role => role.name).includes("ROLE_ADMIN")).map(user =>
                                      <tr key = {user.id}>
                                             <td> {user.username} </td>   
                                             <td> {user.email}</td>
                                             <td> {user.roles.map(role => <div>{role.name}</div>)}</td>
                                             <td>
                                                <button onClick={ () => this.updateUser(user.id)} className="btn btn-success">Update </button>                                            
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                      </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
      </div>
    );
  }
}
