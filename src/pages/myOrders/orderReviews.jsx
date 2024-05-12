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
import { useDispatch } from "react-redux";
import { createReviews } from "@/redux/features/reviewsSlice";
import Cookies from "js-cookie";

export const OrderReviews = (id) => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
                <Button className="mt-3" type="submit">
                  Submit Review
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};
