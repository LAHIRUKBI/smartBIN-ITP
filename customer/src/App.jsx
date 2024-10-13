// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer_Register from "./pages/Customer_Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import Stock_CreateList from "./pages/Stock_CreateList";
import Signin from "./pages/Signin";
import Stock_welcome from "./pages/Stock_welcome";
import Stock_view from "./pages/Stock_view";
import Stock_updateList from "./pages/Stock_updateList";
import Customer_profile from "./pages/Customer_profile";
import Customer_updateInfo from "./pages/Customer_updateInfo";
import Customer_welcome from "./pages/Customer_welcome";
import Customer_request from "./pages/Customer_request";
import Customer_requestForm from "./pages/Customer_requestForm";
import Customer_order from "./pages/Customer_order";
import Customer_requestUpdate from "./pages/Customer_requestUpdate";
import Packing_welcome from "./pages/Packing_welcome";
import Notification_welcome from "./pages/Notification_welcome";
import Packing_order from "./pages/packing_order";
import Packing_orders from "./pages/Packing_orders";
import Customer_Stocks from "./pages/Customer_Stocks";
import Stock_orders from "./pages/Stock_orders";
import Packing_sending from "./pages/Packing_sending";
import Packing_shipped from "./pages/Packing_shipped";
import Packing_orders_update from "./pages/Packing_orders_update";
import Customer_Product from "./pages/Customer_Product";

/*Complaint*/
import AddComplaint from "./pages/Complaint/AddComplaint";
import AllComplaint from "./pages/Complaint/AllComplaint";
import ReplyComplaint from "./pages/Complaint/ReplyComplaint";
import MyComplaint from "./pages/Complaint/MyComplaint";
/*Vehicles*/
import VehicleForm from "./Vehical/VehicleForm";
import VehicleTable from "./Vehical/VehicleTable";
import RoutForm from "./Vehical/Rout";
import RoutShow from "./Vehical/Routshow";
import Vehicle_Welcome from "./Vehical/Vehicle_Welcome";
import Vehicle_orders from "./Vehical/Vehicle_orders";

import Product_add from "./pages/Product_add";
import Product_welcome from "./pages/Product_welcome";
import Product_view from "./pages/Product_view";

import Order_payment from "./pages/Order_payment";
import Order_orders from "./pages/Order_orders";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Customer_Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/stockcreate" element={<Stock_CreateList />} />
        <Route path="/stockwelcome" element={<Stock_welcome />} />
        <Route path="/stockview" element={<Stock_view />} />
        <Route path="/stock/update/:id" element={<Stock_updateList />} />
        <Route path="/stock_orders" element={<Stock_orders />} />

        <Route path="/customer_profile" element={<Customer_profile />} />
        <Route path="/customer_updateInfo" element={<Customer_updateInfo />} />
        <Route path="/customer_welcome" element={<Customer_welcome />} />
        <Route path="/customer_request" element={<Customer_request />} />
        <Route
          path="/customer_requestForm/:id"
          element={<Customer_requestForm />}
        />
        <Route path="/customer_orders" element={<Customer_order />} />
        <Route
          path="/customer_requestUpdate/:id"
          element={<Customer_requestUpdate />}
        />
        <Route path="/customer_Product" element={<Customer_Product />} />

        <Route path="/packing_welcome" element={<Packing_welcome />} />
        <Route path="/packing_order" element={<Packing_order />} />
        <Route path="/packing_orders" element={<Packing_orders />} />
        <Route path="/customer_stocks" element={<Customer_Stocks />} />
        <Route path="/packing_sending" element={<Packing_sending />} />
        <Route
          path="/packing_orders_update"
          element={<Packing_orders_update />}
        />
        <Route path="/packing_shipped" element={<Packing_shipped />} />

        <Route
          path="/notification_welcome"
          element={<Notification_welcome />}
        />

        {/*Complaint*/}
        <Route path="/addcomplaint" element={<AddComplaint />} />
        <Route path="/allComplaint" element={<AllComplaint />} />
        <Route path="/replyComplaint/:id" element={<ReplyComplaint />} />
        <Route path="/mycomplaint" element={<MyComplaint />} />

        
        {/*Vehicles*/}
        <Route path="/vehicles" element={<VehicleTable />} />
        <Route path="/vehicalfrom" element={<VehicleForm />} />
        <Route path="/route" element={<RoutForm />} />
        <Route path="/routeSh" element={<RoutShow />} />
        <Route path="/vehicle_welcome" element={<Vehicle_Welcome />} />
        <Route path="/vehicle_orders" element={<Vehicle_orders />} />

        <Route path="/product_welcome" element={<Product_welcome />} />
        <Route path="/product_add" element={<Product_add />} />
        <Route path="/product_view" element={<Product_view />} />

        <Route path="/order_payment" element={<Order_payment />} />
        <Route path="/order_orders" element={<Order_orders />} />

        
      </Routes>
    </BrowserRouter>
  );
}
