import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddProducts = () => {
  const [previewUrls, setPreviewUrls] = useState(["", "", "", ""]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviewUrls = [...previewUrls];
        newPreviewUrls[index] = reader.result;
        setPreviewUrls(newPreviewUrls);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <form>
        <section>
          {/* selecting and previewing images */}
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden h-56 w-56 bg-gray-200 rounded-lg mb-4"
              >
                <Label className="text-xs  m-2">Image ({index + 1})</Label>
                {previewUrls[index] && (
                  <img
                    src={previewUrls[index]}
                    alt={`Preview Image ${index + 1}`}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                )}
                <input
                  type="file"
                  id={`image${index + 1}`}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center gap-5 w-full justify-between my-10">
          <div className=" w-full">
            <Label className="text-xs mb-2">PRODUCT NAME</Label>
            <Input type="text" />
          </div>
          <div className=" w-full">
            <Label className="text-xs mb-2">CATEGORIES</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="SELECT CATEGORIES" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="my-10 flex w-full gap-5">
          <div className="w-full">
            <Label className="text-xs mb-2">Choose Price</Label>
            <Input type="number" />
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Choose Color</Label>
            <Input type="color" />
          </div>
        </section>
        <section className="my-10 flex gap-5 items-center justify-between">
          <div className="w-full">
            <Label className="text-xs mb-2">Choose Gender</Label>
            <Input type="text" />
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Choose Quantity</Label>
            <Input type="number" />
          </div>

          <section className="w-full">
            <Label className="text-xs mb-2">Choose Sizes</Label>

            <section className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="s" />
                <label className="text-xs cursor-pointer" htmlFor="s">
                  S
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="m" />
                <label className="text-xs cursor-pointer" htmlFor="m">
                  M
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="l" />
                <label className="text-xs cursor-pointer" htmlFor="l">
                  L
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="xl" />
                <label className="text-xs cursor-pointer" htmlFor="xl">
                  XL
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="xxl" />
                <label className="text-xs cursor-pointer" htmlFor="xxl">
                  XXL
                </label>
              </div>
            </section>
          </section>
        </section>

        <section className="w-full flex justify-between gap-5">
          <div className="w-full">
            <Label className="text-xs mb-2">Product Details</Label>
            <Textarea
              placeholder="Product Details..."
              className="h-[300px] resize-none mb-10"
            />
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Shipping</Label>
            <Textarea
              placeholder="Shipping..."
              className="h-[300px] resize-none mb-10"
            />
          </div>

          <div className="w-full">
            <Label className="text-xs mb-2">Returns</Label>
            <Textarea
              placeholder="Returns..."
              className="h-[300px] resize-none mb-10"
            />
          </div>
        </section>

        <section>
          <Label className="text-xs mb-2">Description</Label>
          <Textarea
            placeholder="Description..."
            className="h-[300px] resize-none mb-10"
          />
        </section>

        <section>
          <Button className="w-full">Create Product</Button>
        </section>
      </form>
    </main>
  );
};

export default AddProducts;
