import React, { Component } from "react";
import authService from "../../services/auth.service";

import ProductService from "../../services/product.service";

export default class BoardManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentUser: authService.getCurrentUser(),
      content:''
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    ProductService.getAllProducts().then(
      response => {
        this.setState({
          products: response.data,
          content: "Product"
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
    console.log(this.state.products);
  }

  updateProduct(id){
    this.props.history.push("/product/" + id);
  }

  deleteProduct(id){
    ProductService.deleteProduct(id).then(res => {
      this.setState({products: this.state.products.filter(item => item.id !== id)});
    })
  }

  render() {
    return (
      <div className="jumbotron">
          <h3>{this.state.content}</h3>

          {this.state.content === "Product" &&
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Unit</th>            
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(item =>
                                    <tr key = {item.id}>
                                            <td> <img alt="picture" src={item.pictureUri === null ? 
                                                    "https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg" : item.pictureUri
                                                    } height="200px" width="200px" /> </td>
                                            <td> {item.name} </td>   
                                            <td> {item.sku}</td>
                                            <td> {item.price}</td>
                                            <td> {item.unit}</td>
                                            <td>
                                              <button onClick={ () => this.updateProduct(item.id)} className="btn btn-success">Update </button>                                            
                                              <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProduct(item.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                    <button className = "btn btn-primary" onClick = {() => this.props.history.push("/product/add")}>
                        <span>Add new product</span>
                    </button>
                </div>
            }
      </div>
    );
  }
}
