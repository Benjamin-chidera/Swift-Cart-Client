import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  createProducts,
  editAProducts,
  getSingleProduct,
} from "@/redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";

const EditProducts = () => {
  const [profileImage, setProfileImage] = useState("");
  const [images, setImages] = useState(null);
  const { productId } = useParams();
  const token = Cookies.get("userToken");
  const [description, setDescription] = useState("");

  const { singleProduct, status } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // RICH TEXT

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    // [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  // RICH TEXT

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImages(URL.createObjectURL(e.target.files[0]));
  };

  const handleEditProduct = (data) => {
    const formData = new FormData();

    if (profileImage) {
      formData.append("image", profileImage);

      console.log(profileImage);
    }

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
    // formData.append("description", data.description);
    formData.append("description", description);
    formData.append("status", data.status);

    dispatch(editAProducts({ formData, productId, token }));
  };

  if (status === "loading" || !singleProduct) {
    return <p>Loading....</p>;
  }

  return (
    <main>
      <form onSubmit={handleSubmit(handleEditProduct)}>
        <section>
          <div className="flex flex-wrap gap-4">
            <main className="relative overflow-hidden h-56 w-56 bg-gray-200 rounded-lg mb-4">
              <div>
                {images ? (
                  <img
                    src={images && images}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={singleProduct.product.image}
                    className="absolute inset-0 object-cover w-full h-full"
                    alt="Product Image"
                  />
                )}
              </div>

              <input
                type="file"
                name="image" // Add name attribute for registration
                id="image" // Add id attribute if needed
                // {...register("image")}
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
            <Input
              type="text"
              {...register("name", { required: true })}
              defaultValue={singleProduct.product.name}
            />
            {errors.name && <p>Please fill the product name</p>}
          </div>
          <div className=" w-full">
            <Label className="text-xs mb-2">CATEGORIES</Label>

            <select
              {...register("category", { required: true })}
              defaultValue={singleProduct.product.category}
            >
              <option value="" disabled>
                Select CATEGORY
              </option>
              <option value="skin">Skin</option>
              <option value="clothes">Clothes</option>
              <option value="shoes">Shoes</option>
              <option value="bodysuits">Bodysuits</option>
              <option value="lounge">Lounge</option>
            </select>

            {errors.category && <p>Please select the product category</p>}
          </div>
          <div className=" w-full">
            <Label className="text-xs mb-2">Gender</Label>

            <select
              {...register("gender", { required: true })}
              defaultValue={singleProduct.product.gender}
            >
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
            <Input
              type="number"
              {...register("price", { required: true })}
              defaultValue={singleProduct.product.price}
            />
            {errors.price && <p>Please select the product price</p>}
          </div>

          <div>
            <Label className="text-xs mb-2 text-black">TAGS</Label>
            <select
              {...register("tags", { required: true })}
              defaultValue={singleProduct.product.tags}
            >
              <option value="" disabled>
                Select Tags
              </option>
              <option value="skincare">Skin Care</option>
              <option value="haircare">Hair Care</option>
              <option value="bodycare">Body Care</option>
              <option value="sunprotection">Sun Protection</option>
              <option value="makeup">Make Up</option>
              <option value="men">Men</option>
              <option value="boy">Boy</option>
              <option value="women">Women</option>
              <option value="girl">Girl</option>
              <option value="scentfree">Scent Free</option>
              <option value="toothpaste">Tooth Paste</option>
            </select>
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Choose Color</Label>
            <Input
              type="text"
              {...register("color", { required: true })}
              defaultValue={singleProduct.product.color}
            />
            {errors.color && <p>Please select the product color</p>}
          </div>
        </section>
        <section className="my-10 flex gap-5 items-center justify-between">
          <div className="w-full">
            <Label className="text-xs mb-2">Choose Quantity</Label>
            <Input
              type="number"
              {...register("quantity", { required: true })}
              defaultValue={singleProduct.product.quantity}
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
                  //   defaultValue={singleProduct.product.size}
                  defaultChecked={singleProduct.product.size.includes("s")}
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
                  defaultChecked={singleProduct.product.size.includes("m")}
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
                  defaultChecked={singleProduct.product.size.includes("l")}
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
                  defaultChecked={singleProduct.product.size.includes("xl")}
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
                  defaultChecked={singleProduct.product.size.includes("xxl")}
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

          <div>
            <select
              className=" text-black"
              {...register("status", { required: true })}
              defaultValue={singleProduct.product.status}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="out">Out Of Stock</option>
            </select>
          </div>
        </section>

        <section className="w-full flex justify-between gap-5">
          <div className="w-full">
            <Label className="text-xs mb-2">Product Details</Label>
            <Textarea
              placeholder="Product Details..."
              className="h-[300px] resize-none mb-10"
              {...register("details", { required: true })}
              defaultValue={singleProduct.product.details}
            />
            {errors.details && <p>Please select the product details</p>}
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Shipping</Label>
            <Textarea
              placeholder="Shipping..."
              className="h-[300px] resize-none mb-10"
              {...register("shipping", { required: true })}
              defaultValue={singleProduct.product.size}
            />
            {errors.shipping && <p>Please select the product shipping</p>}
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Returns</Label>
            <Textarea
              placeholder="Returns..."
              className="h-[300px] resize-none mb-10"
              {...register("returns", { required: true })}
              defaultValue={singleProduct.product.returns}
            />
            {errors.returns && <p>Please select the product returns</p>}
          </div>
        </section>

        {/* <section>
          <Label className="text-xs mb-2">Description</Label>

          <Textarea
            placeholder="Description..."
            className="h-[300px] resize-none mb-10"
            {...register("description", { required: true })}
            defaultValue={singleProduct.product.description}
          />
          {errors.description && <p>Please select the product description</p>}
        </section> */}

        <section>
          <Label className="text-xs mb-2">Description</Label>
          {/* <Textarea
            placeholder="Description..."
            className="h-[300px] resize-none mb-10"
            {...register("description", { required: true })}
          /> */}
          <div
            dangerouslySetInnerHTML={{
              __html: singleProduct.product.description,
            }}
          ></div>

          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            defaultValue={singleProduct.product.description}
            className="h-[300px] resize-none"
            modules={module}
          />
        </section>

        <section>
          <Button className="w-full mt-16" type="submit">
            Edit Product
          </Button>
        </section>
      </form>
    </main>
  );
};

export default EditProducts;
