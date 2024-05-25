import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgottenUser } from "@/redux/features/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgottenPassword = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgottenPassword = (data) => {
    const formData = new FormData();

    formData.append("email", data.email);

    dispatch(forgottenUser(formData));

    console.log(data);
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
        className=" md:w-[50%] px-3 mt-3 flex justify-center items-center mx-auto"
        onSubmit={handleSubmit(handleForgottenPassword)}
      >
        <section>
          <h1 className="font-semibold text-center text-2xl lg:text-4xl">
            Forgotten Your Password
          </h1>
          <Input
            type="email"
            placeholder="User Email"
            className="my-5"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Please Enter A Valid Email</p>}

          <Button className="w-full uppercase mt-4" type="submit">
            Forgotten Password
          </Button>
        </section>
      </form>
    </main>
  );
};

export default ForgottenPassword;
