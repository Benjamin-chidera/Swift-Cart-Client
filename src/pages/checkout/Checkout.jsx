import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/lib/FormatCurrency";
import { getTotalPrice, getTotalQtyItem } from "@/redux/features/cartSlice";
import { CheckoutItem } from "./CheckoutItem";

export const Checkout = () => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const totalPrice = useSelector(getTotalPrice);

  const { cart } = useSelector((state) => state.cart);

  console.log(cart, totalPrice);

  return (
    <main className=" px-3 md:container md:mx-auto md:flex justify-between w-full">
      <section className="md:w-[53%] w-full ">
        <div>
          <Link to={"/"} className="font-bold text-3xl">
            SwiftCart
          </Link>
        </div>

        <div className="mt-10">
          {/* contact info*/}
          <h6 className="font-semibold mb-4">contact</h6>
          <Input type="email" placeholder="Email" className={"border"} />
        </div>
        <div className="mt-10">
          {/* delivery info*/}
          <h6 className="font-semibold mb-4">delivery</h6>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
            }}
            placeHolder="Select Country"
          />
        </div>

        <div className="mt-4">
          {/* address info*/}

          <Input type="text" placeholder="Address" className={"border"} />
        </div>

        <div className="flex gap-5 w-full">
          {/* city and state */}
          <div className="mt-4 w-[50%]">
            {/* city info*/}

            <Input type="text" placeholder="City" className={"border"} />
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

          <Input type="tel" placeholder="Phone" className={"border"} />
        </div>
        <div className="mt-4">
          {/* Payment Btn */}

          <Button className="w-full mt-5">Pay Now</Button>
        </div>
      </section>
      <section className="md:w-[47%] md:flex  flex-col space-y-3">
        {/* second div */}
        {cart.map((c) => (
          <CheckoutItem key={c.id} c={c} />
        ))}

        <div className="mx-10 mt-5 font-semibold flex justify-between text-lg">
          <h1>Total</h1>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </section>
    </main>
  );
};
