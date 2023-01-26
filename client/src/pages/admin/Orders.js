import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

import AdminMenu from "../../components/nav/AdminMenu";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import { Select } from "antd";

import moment from "moment";
import axios from "axios";

const Orders = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
            {orders?.map((order, index) => {
              return (
                <div
                  key={order?._id}
                  className="border shadow bg-light rounded-4 mb-5"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td style={{ paddingBottom: "0px", paddingTop: "5px" }}>
                          <Select
                            bordered={false}
                            defaultValue={order?.status}
                            onChange={(value) =>
                              handleChange(order?._id, value)
                            }
                          >
                            {status?.map((s, i) => (
                              <Select.Option key={i} value={s}>
                                {s}
                              </Select.Option>
                            ))}
                            0
                          </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length} products</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="row m-2">
                      {order.products.map((productCart, index) => (
                        <ProductCardHorizontal
                          key={index}
                          productCart={productCart}
                          remove={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
