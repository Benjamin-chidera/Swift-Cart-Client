import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { clearCart, getTotalPrice } from "@/redux/features/cartSlice";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { CheckoutItem } from "./CheckoutItem";
import { useForm } from "react-hook-form";
import { handlePayMent } from "@/redux/features/payStackSlice";
import Cookies from "js-cookie";
import { createOrders } from "@/redux/features/orderSlice";
import "./checkout.css";

export const Checkout = () => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const userToken = Cookies.get("userToken");

  const { payment } = useSelector((state) => state.payStack);

  const isPaying = payment?.data?.authorization_url;

  if (!isPaying) {
    console.log("Not found");
  } else {
    console.log("found authorization");
  }

  // orders

  const myOrder = localStorage.getItem("orders");

  const order = JSON.parse(myOrder);

  const totalPrice = useSelector(getTotalPrice);

  const amount = Math.floor(totalPrice * 0.1);

  const grandTotal = amount + totalPrice;

  const handlePayment = async (data) => {
    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("price", data.price);
      formData.append("countryid", countryid);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("phone", data.city);

      await dispatch(handlePayMent(formData));
      await dispatch(createOrders(order));

      if (!isPaying) {
        console.log("error opening URL:");
      } else {
        console.log("Opening URL:", isPaying);

        const orderData = {
          cart,
          shippingAddress: data,
          user: userToken,
          totalPrice: grandTotal,
        };

        console.log(orderData);

        localStorage.setItem("orders", JSON.stringify(orderData));
        dispatch(clearCart());
        window.location.href = isPaying;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <main className=" px-3 md:container md:mx-auto md:flex justify-between w-full">
      <form
        className="md:w-[53%] w-full "
        onSubmit={handleSubmit(handlePayment)}
      >
        <div>
          <Link to={"/"} className="font-bold text-3xl">
            SwiftCart
          </Link>
        </div>

        <div className="mt-10">
          {/* contact info*/}
          <h6 className="font-semibold mb-4">contact</h6>
          <Input
            type="email"
            placeholder="Email"
            className={"border"}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mt-10">
          {/* delivery info*/}
          <h6 className="font-semibold mb-4">delivery</h6>
          <div>
            <CountrySelect
              onChange={(e) => {
                setCountryid(e.id);
              }}
              placeHolder="Select Country"
            />
          </div>
        </div>

        <div className="mt-4">
          {/* address info*/}

          <Input
            type="text"
            placeholder="Address"
            className={"border"}
            {...register("address", { required: "Email is required" })}
          />
        </div>

        <div className="flex gap-5 w-full">
          {/* city and state */}
          <div className="mt-4 w-[50%]">
            {/* city info*/}

            <Input
              type="text"
              placeholder="City"
              className={"border"}
              {...register("city", { required: "Email is required" })}
            />
          </div>
          <div className="mt-4 w-[50%]">
            {/* address info*/}
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
              }}
              placeHolder="Select State"
            />
          </div>
        </div>

        <div className="mt-4">
          {/* address info*/}

          <Input
            type="tel"
            placeholder="Phone"
            className={"border"}
            {...register("phone", { required: "Email is required" })}
          />
        </div>

        <div className="mt-5">
          {/* <h1>Total</h1> */}
          {/* <p>{formatCurrency(grandTotal)}</p> */}
          <Input
            type={"number"}
            value={grandTotal}
            placeholder="Total Price"
            className=""
            readOnly
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>

        <div className="mt-4">
          {/* Payment Btn */}

          <Button className="w-full mt-5" type="submit">
            Pay Now
          </Button>
        </div>
      </form>
      <section className="md:w-[47%] md:flex  flex-col space-y-3">
        {/* second div */}
        {cart?.map((c) => (
          <CheckoutItem key={c?._id} c={c} />
        ))}
      </section>
    </main>
  );
};
