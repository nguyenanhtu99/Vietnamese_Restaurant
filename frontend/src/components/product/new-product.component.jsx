import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import ProductService from "../../services/product.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be longer than 3 characters.
      </div>
    );
  }
};

export default class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.handleProduct = this.handleProduct.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSku = this.onChangeSku.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
    this.onChangeShowOnHomepage = this.onChangeShowOnHomepage.bind(this);
    this.onChangeEnteredPrice = this.onChangeEnteredPrice.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);

    this.state = {
      name: "",
      sku: "",
      price: "0",
      unit: "ITEM",
      isShowOnHomepage: false,
      isEnteredPrice: false,
      pictureId: null,
      picturePreviewUrl: null,
      successful: false,
      message: "",
      listUnit: ["ITEM", "PIECE", "SET", "KG"]
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeSku(e) {
    this.setState({
      sku: e.target.value
    });
  }

  onChangeUnit(e){
      this.setState({
          unit: e.target.value
      });
  }

  onChangeShowOnHomepage(){
    this.setState({
        isShowOnHomepage: !this.state.isShowOnHomepage
    });
  }

  onChangeEnteredPrice(){
    this.setState({
        isEnteredPrice: !this.state.isEnteredPrice
    });
  }

  onChangePicture(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    ProductService.uploadPicture(
      formData
      ).then(
      response => {
        this.setState({
          pictureId: response.data
        });
        alert("Picture uploaded successfully!");
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () =>{
        this.setState({
        picturePreviewUrl: reader.result
      });
    }
  }

  handleProduct(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      let productRequest = {
        name: this.state.name,
        sku: this.state.sku,
        price: this.state.price,
        unit: this.state.unit,
        isShowOnHomepage: this.state.isShowOnHomepage, 
        isEnteredPrice: this.state.isEnteredPrice,
        pictureId: this.state.pictureId
      };

      ProductService.addNewProduct(
        productRequest
      ).then(
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
          <Form
            onSubmit={this.handleProduct}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="sku"
                    value={this.state.sku}
                    onChange={this.onChangeSku}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="price"
                    step=".01"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                  />
                </div>
                
                <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <select
                      className="form-control"
                      name="unit"
                      value={this.state.unit}
                      onChange={this.onChangeUnit}
                      >
                    {
                        this.state.listUnit.map(item =>{
                            return (
                            <option key={item}>{item} </option>
                            )
                        })
                    }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="isShowOnHomepage">Show On Homepage</label>
                    <Input
                      type="checkbox"
                      name="isShowOnHomepage"
                      value={this.state.isShowOnHomepage}
                      onChange={this.onChangeShowOnHomepage}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="isEnteredPrice">Allow Enter Price</label>
                    <Input
                      type="checkbox"
                      name="isEnteredPrice"
                      value={this.state.isEnteredPrice}
                      onChange={this.onChangeEnteredPrice}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="picture">Picture</label>
                    <Input
                      type="file"
                      name="picture"
                      accept="image/*"
                      onChange={this.onChangePicture}
                    />                                        
                    <img alt="preview" src={
                      this.state.picturePreviewUrl === null ? 
                      "https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg" : this.state.picturePreviewUrl
                      } height="200px" width="200px"/>
                </div>
                
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Add New Product</button>
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
