import React, { Component } from "react";
import authService from "../../services/auth.service";

import CategoryService from "../../services/category.service";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Categories: [],
      currentUser: authService.getCurrentUser(),
      content:''
    };
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentDidMount() {
    CategoryService.getAllCategories().then(
      response => {
        this.setState({
          Categories: response.data,
          content: "Category"
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

  updateCategory(id){
    this.props.history.push("/category/" + id);
  }

  deleteCategory(id){
    CategoryService.deleteCategory(id).then(res => {
      this.setState({Categories: this.state.Categories.filter(item => item.id !== id)});
    })
  }

  render() {
    return (
      <div className="jumbotron">
          <h3>{this.state.content}</h3>

          {this.state.content === "Category" &&
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Categories.map(item =>
                                    <tr key = {item.id}>
                                            <td> {item.name} </td>   
                                            <td>
                                              <button onClick={ () => this.updateCategory(item.id)} className="btn btn-success">Update </button>                                            
                                              <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCategory(item.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    
                    <button className = "btn btn-primary" onClick = {() => this.props.history.push("/category/add")}>
                        <span>Add new category</span>
                    </button>
                </div>
            }
      </div>
    );
  }
}
