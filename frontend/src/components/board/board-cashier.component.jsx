import React, { Component } from "react";
import userService from "../../services/user.service";

import UserService from "../../services/user.service";

export default class BoardCashier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      content:''
    };

  }

  componentDidMount() {
    UserService.getCashierBoard().then(
      response => {
        this.setState({
          orders: response.data.sort((a,b) => a.order.position - b.order.position),
          content: "Cashier"
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

  paidOrder(id){
    userService.paidOrder(id);
    window.location.reload();
  }

  render() {
    return (
      <div className="jumbotron">
          <h3>{this.state.content}</h3>

          {this.state.content === "Cashier" &&
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Table</th>
                                    <th> Created On</th>
                                    <th> Served At</th>
                                    <th> Product</th>
                                    <th> Quantity</th>
                                    <th> Total</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map(order =>                     
                                      <tr key = {order.order.id}>
                                             <td> {order.order.position} </td>   
                                             <td> {order.order.createdOn}</td>
                                             <td> {order.order.updatedOn}</td>
                                             <td> {order.product.name}</td>
                                             <td> {order.quantity} {order.product.unit}</td>
                                             <td> {order.order.total}$</td>
                                             <td>
                                                <button onClick={ () => this.paidOrder(order.order.id)} className="btn btn-success">Paid </button>                                            
                                             </td>
                                      </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            }
      </div>
    );
  }
}
