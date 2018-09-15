import React from "react";
import Header from "./customer/Header.jsx";
import axios from "axios";
import { Router, Link } from "@reach/router";
import Search from "./customer/search.jsx";
import Orders from "./customer/orders.jsx";
import Menu from "./customer/menu.jsx";
import Checkout from "./customer/checkout.jsx";
import Header from "./customer/Header.jsx";
class App extends React.Component {
  state = {
    menu: {},
    orders: [],
    checkout: {
      CustomerId: "",
      status: "pending",
      drinkOrder: [
        // {
        //   quantity: "",
        //   subtotal: "",
        //   menuItemId: "",
        //   menuItemUrl: "",
        //   menuItemName: ""
        // }
      ]
    },
    modal: ""
  };

  checkOutUpdate(order) {
    let drinks = this.state.checkout.drinkOrder;
    drinks.push(order);
    this.setState({
      checkout: Object.assign({}, this.state.checkout, { drinkOrder: drinks })
    });
  }

  componentDidMount() {
    axios.get("http://localhost:7337/api/menu/categories").then(response => {
      this.setState({
        menu: response.data
      });
    });
    let customerID = 2;
    axios
      .get(`http://localhost:7337/api/customers/${customerID}/orders`)
      .then(response => {
        console.log(response.data);
        this.setState({
          orders: response.data
        });
      });
  }

  changeModal(view) {
    this.setState({
      modal: view
    });
  }

  renderModal() {
    if (this.state.modal === "checkout") {
      return (
        <Checkout
          checkout={this.state.checkout}
          changeModal={this.changeModal.bind(this)}
        />
      );
    }
  }
  render() {
    return (
      <div>
        <h1>Title</h1>
        <div id="test" />
        <nav>
          <button onClick={() => this.changeModal("checkout")}>Checkout</button>
        </nav>
        <Router>
          <Checkout path="/checkout" />
        </Router>
        <Search />
        <Orders currentOrders={this.state.orders} />
        <Menu
          menuItems={this.state.menu}
          checkOutUpdate={this.checkOutUpdate.bind(this)}
        />
        <div>{this.renderModal()}</div>
      </div>
    );
  }
}

export default App;
