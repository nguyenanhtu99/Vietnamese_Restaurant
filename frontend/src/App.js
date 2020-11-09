import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/user/login.component.jsx";
import Register from "./components/user/register.component.jsx";
import Home from "./components/home.component.jsx";
import Profile from "./components/user/profile.component.jsx";
import Product from "./components/product/product.component.jsx";
import NewProduct from "./components/product/new-product.component.jsx";
import UpdateProduct from "./components/product/update-product.component.jsx";
import BoardUser from "./components/board/board-user.component.jsx";
import BoardManager from "./components/board/board-manager.component.jsx";
import BoardAdmin from "./components/board/board-admin.component.jsx";
import BoardWaiter from "./components/board/board-waiter.component.jsx";
import BoardCashier from "./components/board/board-cashier.component.jsx";
import BoardChef from "./components/board/board-chef.component.jsx";
import Update from "./components/user/update.component";
import createOrder from "./components/order/createOrder.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showWaiterBoard: (user.roles.includes("ROLE_WAITER") || user.roles.includes("ROLE_ADMIN")),
        showCashierBoard: (user.roles.includes("ROLE_CASHIER") || user.roles.includes("ROLE_ADMIN")),
        showChefBoard: (user.roles.includes("ROLE_CHEF") || user.roles.includes("ROLE_ADMIN")),
        showManagerBoard: (user.roles.includes("ROLE_MANAGER") || user.roles.includes("ROLE_ADMIN")),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showWaiterBoard, showCashierBoard, showChefBoard, showManagerBoard, showAdminBoard } = this.state;

    return (
      <div className="background">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Vietnamese Restaurant
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showManagerBoard && (
              <li className="nav-item">
                <Link to={"/manager"} className="nav-link">
                  Manager Board
                </Link>
              </li>
            )}

            {showWaiterBoard && (
              <li className="nav-item">
                <Link to={"/waiter"} className="nav-link">
                  Waiter Board
                </Link>
              </li>
            )}

            {showChefBoard && (
              <li className="nav-item">
                <Link to={"/chef"} className="nav-link">
                  Chef Board
                </Link>
              </li>
            )}

            {showCashierBoard && (
              <li className="nav-item">
                <Link to={"/cashier"} className="nav-link">
                  Cashier Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/product"} className="nav-link">
                  Product
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className = "navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/product/add" component={NewProduct} />
            <Route exact path="/product/:id" component={UpdateProduct} />
            <Route exact path="/order/add" component={createOrder} />
            <Route path="/user/:id" component={Update} />
            <Route path="/user" component={BoardUser} />
            <Route path="/waiter" component={BoardWaiter} />
            <Route path="/cashier" component={BoardCashier} />
            <Route path="/chef" component={BoardChef} />
            <Route path="/manager" component={BoardManager} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
