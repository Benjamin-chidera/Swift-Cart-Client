import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createProducts } from "@/redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const AddProducts = () => {
  const [profileImage, setProfileImage] = useState("");
  const [images, setImages] = useState(null);
  const token = Cookies.get("user")
  console.log(token);


  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImages(URL.createObjectURL(e.target.files[0]));
  };

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitted },
  } = useForm();
  const dispatch = useDispatch();

  if (isSubmitted) {
    reset();
    setImages(null);
  }

  const handleCreateProduct = (data) => {
    const formData = new FormData();

    try {
      formData.append("image", profileImage);
      // formData.append("image", data.image[0]);
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("tags", data.tags);
      formData.append("gender", data.gender);
      formData.append("price", data.price);
      formData.append("color", data.color);
      formData.append("quantity", data.quantity);
      formData.append("size", data.size);
      formData.append("details", data.details);
      formData.append("shipping", data.shipping);
      formData.append("returns", data.returns);
      formData.append("description", data.description);
      // formData.append("status", data.status);

      dispatch(createProducts({ formData, token }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <section>
          <div className="flex flex-wrap gap-4">
            <main className="relative overflow-hidden h-56 w-56 bg-gray-200 rounded-lg mb-4">
              <div>
                {images && (
                  <img
                    src={images && images}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                )}
              </div>

              <input
                type="file"
                name=""
                id=""
                {...register("image", { required: true })}
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />

              {/* <input
                type="file"
                name=""
                id=""
                {...register("image", { required: true })}
              /> */}
            </main>
          </div>
        </section>

        <section className="flex items-center gap-5 w-full justify-between my-10">
          <div className=" w-full">
            <Label className="text-xs mb-2">PRODUCT NAME</Label>
            <Input type="text" {...register("name", { required: true })} />
            {errors.name && <p>Please fill the product name</p>}
          </div>
          <div className=" w-full">
            <Label className="text-xs mb-2">CATEGORIES</Label>

            <select {...register("category", { required: true })}>
              <option value="" disabled>
                Select CATEGORY
              </option>
              <option value="skin">Skin</option>
              <option value="clothes">clothes</option>
              <option value="shoes">shoes</option>
              <option value="bodysuits">Bodysuits</option>
              <option value="lounge">Lounge</option>
            </select>

            {errors.category && <p>Please select the product category</p>}
          </div>
          <div className=" w-full">
            <Label className="text-xs mb-2">Gender</Label>

            <select {...register("gender", { required: true })}>
              <option value="" disabled>
                Select GENDER
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {errors.genders && <p>Please select the product genders</p>}
          </div>
        </section>

        <section className="my-10 flex w-full gap-5">
          <div className="w-full">
            <Label className="text-xs mb-2">Choose Price</Label>
            <Input type="number" {...register("price", { required: true })} />
            {errors.price && <p>Please select the product price</p>}
          </div>

          <div>
            <Label className="text-xs mb-2">TAGS</Label>
            <select {...register("tags", { required: true })}>
              <option value="" disabled>
                Select Tags
              </option>
              <option value="skincare">Skin Care</option>
              <option value="haircare">Hair Care</option>
              <option value="bodycare">Body Care</option>
              <option value="sunprotection">Sun Protection</option>
              <option value="makeup">Make Up</option>
              <option value="men">Men</option>
              <option value="womenMen">Women Men</option>
              <option value="scentfree">Scent Free</option>
              <option value="toothpaste">Tooth Paste</option>
            </select>
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Choose Color</Label>
            <Input type="text" {...register("color", { required: true })} />
            {errors.color && <p>Please select the product color</p>}
          </div>
        </section>
        <section className="my-10 flex gap-5 items-center justify-between">
          <div className="w-full">
            <Label className="text-xs mb-2">Choose Quantity</Label>
            <Input
              type="number"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && <p>Please select the product quantity</p>}
          </div>

          <section className="w-full">
            <Label className="text-xs mb-2">Choose Sizes</Label>

            <section className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="s"
                  value={"s"}
                  {...register("size", {
                    required: {
                      value: true,
                      message: "Please select the size",
                    },
                  })}
                />

                <label className="text-xs cursor-pointer" htmlFor="s">
                  S
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="m"
                  value={"m"}
                  {...register("size", {
                    required: {
                      value: true,
                      message: "Please select the size",
                    },
                  })}
                />

                <label className="text-xs cursor-pointer" htmlFor="m">
                  M
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="l"
                  value={"l"}
                  {...register("size", {
                    required: {
                      value: true,
                      message: "Please select the size",
                    },
                  })}
                />

                <label className="text-xs cursor-pointer" htmlFor="l">
                  L
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="xl"
                  value={"xl"}
                  {...register("size", {
                    required: {
                      value: true,
                      message: "Please select the size",
                    },
                  })}
                />

                <label className="text-xs cursor-pointer" htmlFor="xl">
                  XL
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="xxl"
                  value={"xxl"}
                  {...register("size", {
                    required: {
                      value: true,
                      message: "Please select the size",
                    },
                  })}
                />

                <label className="text-xs cursor-pointer" htmlFor="xxl">
                  XXL
                </label>
              </div>
              {errors.size && (
                <p className=" text-[6px]">{errors.size.message}</p>
              )}
            </section>
          </section>

          {/* <div>
            <select {...register("tags", { required: true })}>
              <option value="" disabled>
                Select Status
              </option>
              <option value="jewelry">Jewelry</option>
              <option value="electronics">Electronics</option>
              <option value="menClothes">MenClothes</option>
              <option value="woMenClothes">WoMenClothes</option>
            </select>
          </div> */}
        </section>

        <section className="w-full flex justify-between gap-5">
          <div className="w-full">
            <Label className="text-xs mb-2">Product Details</Label>
            <Textarea
              placeholder="Product Details..."
              className="h-[300px] resize-none mb-10"
              {...register("details", { required: true })}
            />
            {errors.details && <p>Please select the product details</p>}
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Shipping</Label>
            <Textarea
              placeholder="Shipping..."
              className="h-[300px] resize-none mb-10"
              {...register("shipping", { required: true })}
            />
            {errors.shipping && <p>Please select the product shipping</p>}
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Returns</Label>
            <Textarea
              placeholder="Returns..."
              className="h-[300px] resize-none mb-10"
              {...register("returns", { required: true })}
            />
            {errors.returns && <p>Please select the product returns</p>}
          </div>
        </section>

        <section>
          <Label className="text-xs mb-2">Description</Label>
          <Textarea
            placeholder="Description..."
            className="h-[300px] resize-none mb-10"
            {...register("description", { required: true })}
          />
          {errors.description && <p>Please select the product description</p>}
        </section>

        <section>
          <Button className="w-full" type="submit">
            Create Product
          </Button>
        </section>
      </form>
    </main>
  );
};

export default AddProducts;
