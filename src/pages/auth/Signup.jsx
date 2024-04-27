import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/redux/features/authSlice";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Signup = () => {
  const [previewUrls, setPreviewUrls] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
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
    setPreviewUrls("");
  }

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

  const handleRegister = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    // formData.append("role", "admin");
    formData.append("image", data.image[0]);

    dispatch(registerUser(formData));
    navigate("/");
  };

  return (
    <main className=" flex w-full h-screen absolute top-0">
      <section className="w-[50%] bg-green-400 hidden md:block">
        <div className=" flex justify-center items-center h-screen flex-col font-bold md:text-5xl lg:text-7xl">
          <h1>SWIFTCART</h1>
          <p>🛒</p>
        </div>
      </section>

      <form
        className="w-full mx-auto md:w-[50%] px-3 mt-3 flex justify-center items-center"
        onSubmit={handleSubmit(handleRegister)}
      >
        <section>
          <h1 className="font-semibold text-center text-2xl md:text-5xl mb-5">
            Welcome To SwiftCart
          </h1>
          {/* selecting and previewing images */}
          <div className="flex flex-wrap gap-4">
            {[...Array(1)].map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden h-14 w-14 mx-auto rounded-full bg-gray-200 mb-4"
              >
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
                  {...register("image", { required: true })}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {errors.image && (
                  <p className="text-xs text-center">Please select an Image</p>
                )}
              </div>
            ))}
          </div>

          <Input
            type="text"
            placeholder="User Name"
            className="mb-5"
            {...register("name", { required: true })}
          />
          {errors.name && <p>Please Enter a User name</p>}
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

          <Button
            className={`w-full uppercase ${
              status === "loading" && "opacity-90 cursor-default"
            }`}
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "loading..." : " Sign Up"}
          </Button>

          <p className="mt-5 text-sm">
            Already have an account?{" "}
            <span>
              <Link className=" hover:underline text-blue-500" to={"/signin"}>
                Sign In
              </Link>
            </span>
          </p>
        </section>
      </form>
    </main>
  );
};

export default Signup;
