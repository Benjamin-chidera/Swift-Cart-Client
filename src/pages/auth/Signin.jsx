import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Signin = () => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
   const [show, setShow] = useState(false);

   const handleShow = () => {
     setShow((prevShowPassword) => !prevShowPassword);
   };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm();

  if (isSubmitted) {
    reset();
  }

  const handleLogin = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    dispatch(loginUser(formData));
    const decode = jwtDecode(user.user.token);
    
    if (decode.role === "user") {
      Cookies.set("user", user.user.token);
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  return (
    <main className=" flex w-full h-screen absolute top-0">
      <section className="w-[50%] bg-green-400 hidden md:block">
        <div className=" flex justify-center items-center h-screen flex-col font-bold md:text-5xl lg:text-7xl">
          <Link to={-1}>SWIFTCART</Link>
          <p>🛒</p>
        </div>
      </section>

      <form
        className=" mx-auto md:w-[50%] px-3 mt-3 flex justify-center items-center"
        onSubmit={handleSubmit(handleLogin)}
      >
        <section>
          <h1 className="font-semibold text-center text-2xl lg:text-4xl">
            Welcome Back To SwiftCart
          </h1>
          <Input
            type="email"
            placeholder="User Email"
            className="my-5"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Please Enter A Valid Email</p>}
          <div className="relative">
            <Input
              type={!show ? "password" : "text"}
              placeholder="User Password"
              className="my-5"
              {...register("password", { required: true })}
            />

            <div className=" absolute top-2 right-2">
              <button onClick={handleShow} type="button">
                {" "}
                {!show ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          {errors.password && <p>Please Enter A Valid Password</p>}

          <div className="text-end">
            <Link
              className="text-sm  hover:underline text-blue-500"
              to={"/forgotten-password"}
            >
              Forgotten Password?
            </Link>
          </div>

          <Button
            className={`w-full uppercase mt-4 ${
              status === "loading" && "opacity-90 cursor-default"
            }`}
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "loading..." : "  Sign In"}
          </Button>

          <p className="mt-5 text-sm">
            Don&apos;t have an account?{" "}
            <span>
              <Link className=" hover:underline text-blue-500" to={"/signup"}>
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      </form>
    </main>
  );
};

export default Signin;
