import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { createReviews } from "@/redux/features/reviewsSlice";
import Cookies from "js-cookie";

export const OrderReviews = (id) => {
  const [rating, setRating] = useState(0);
  const { status } = useSelector((state) => state.reviews);
  console.log(status);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm();
  const dispatch = useDispatch();
  const token = Cookies.get("userToken");

  const handleReviews = (data) => {
    console.log(data);

    dispatch(
      createReviews({ comment: data.comment, rating, productId: id.id, token })
    );
  };

  const ratingChanged = (selectedRating) => {
    setRating(selectedRating);
  };
  if (isSubmitted) {
    reset();
    setRating(0);
  }

  return (
    <main>
      <Dialog>
        <DialogTrigger className="text-xs">
          Click to Leave a review
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className=" text-center">
              Leave A Review For Your Purchased Item
            </DialogTitle>
            <DialogDescription>
              <form action="" onSubmit={handleSubmit(handleReviews)}>
                <Textarea
                  placeholder="Type your message here."
                  {...register("comment", { required: true })}
                />
                {errors.comment && <p>Leave a review</p>}
                <div className="mt-2">
                  <ReactStars
                    isHalf={true}
                    count={5}
                    value={rating}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
                <Button
                  className={`w-full uppercase mt-4 ${
                    status === "loading" && "opacity-90 cursor-default"
                  }`}
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting...." : "Submit Review"}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};
