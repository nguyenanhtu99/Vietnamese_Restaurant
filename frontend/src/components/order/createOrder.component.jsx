import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import productService from "../../services/product.service";
import orderService from "../../services/order.service";
import authService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vposition = value => {
  if (value === null) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class createOrder extends Component {
  constructor(props) {
    super(props);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);

    this.state = {
      user_id: authService.getCurrentUser().id,
      products: [],
      product_ids: [],
      quantities: [],
      position: 0,
      note: "",
      successful: false,
      message: ""
    };
  }

  componentDidMount() {
    productService.getAllProducts().then(
      response => {
        this.setState({
          products: response.data,
          content: "Manager"
        });
        // console.log(this.state.products);
        // this.state.products.forEach(product => {
        //   this.state.product_ids.push(product.id);
        // });
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

  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }

  onChangeNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  onChangeQuantity = event => {

    let quantities = [...this.state.quantities, event.target.value];
    let product_ids = [...this.state.product_ids, event.target.id];

      if (this.state.product_ids.includes(event.target.id)){
        let id = this.state.product_ids.indexOf(event.target.id);
        quantities.splice(id, 1);
        product_ids.splice(id,1);
      }
      this.setState({
        quantities: quantities,
        product_ids: product_ids
      });
  }

  handlePlaceOrder(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        let orderRequest = {user_id: this.state.user_id,
                            position: this.state.position,
                            note: this.state.note,
                            product_ids: this.state.product_ids,
                            quantities: this.state.quantities}
      orderService.placeOrder(orderRequest).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3>New order</h3>
          <Form
            onSubmit={this.handlePlaceOrder}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="position">Table</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="position"
                    value={this.state.position}
                    onChange={this.onChangePosition}
                    validations={[required, vposition]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="note">Note</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="note"
                    value={this.state.note}
                    onChange={this.onChangeNote}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantities">Choose Products</label>
                  <table className = "table table-striped table-bordered">
                    <thead>
                      <tr>
                      <th>Name</th>
                      <th>Quantities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.products.map(product => 
                      <tr key = {product.id}>
                        <td>{product.name}</td>
                        <td>
                        <Input
                          type="number"
                          className="form-control"
                          name="quantity"
                          id = {product.id}
                          onChange={this.onChangeQuantity}
                        />
                        {product.price}$ / 1 {product.unit}</td>
                      </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Place Order</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
