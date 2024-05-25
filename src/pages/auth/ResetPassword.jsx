import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetUser } from "@/redux/features/authSlice";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Access the token directly from the user object
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleResetPassword = (data) => {
    const formData = new FormData();

    formData.append("password", data.password);

    dispatch(resetUser({ formData, token: token }));
  };

  return (
    <main className=" flex w-full h-screen absolute top-0">
      <ToastContainer />
      <section className="w-[50%] bg-green-400 hidden md:block">
        <div className=" flex justify-center items-center h-screen flex-col font-bold md:text-5xl lg:text-7xl">
          <h1>SWIFTCART</h1>
          <p>🛒</p>
        </div>
      </section>

      <form
        className=" mx-auto md:w-[50%] px-3 mt-3 flex justify-center items-center"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <section>
          <h1 className="font-semibold text-center text-2xl lg:text-4xl">
            Reset Your Password
          </h1>
          <Input
            type="password"
            placeholder="User Password"
            className="my-5"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Please Enter A Valid Password</p>}

          <Button className="w-full uppercase mt-4" type="submit">
            Reset Password
          </Button>
        </section>
      </form>
    </main>
  );
};

export default ResetPassword;
