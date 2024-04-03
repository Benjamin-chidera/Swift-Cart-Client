import {
  FaRegHeart,
  FaRegUser,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <main className=" mx-3 md:container md:mx-auto ">
      <section className=" rounded-xl bg-[#5e4340] text-white px-10  pt-10 pb-3 mb-2">
        <section className="lg:flex justify-between space-y-5 lg:space-y-0">
          <div>
            <Link to={"/"} className="text-5xl font-semibold mt-20">
              SwiftCart
            </Link>
          </div>

          <div>
            <h1 className="mb-2 font-bold  underline lg:no-underline">ABOUT</h1>
            <ul className="flex flex-col gap-2 font-semibold text-sm">
              <li>shop all</li>
              <li>careers</li>
              <li>account</li>
            </ul>
          </div>

          <div>
            <h1 className="mb-2 font-bold  underline lg:no-underline">HELP</h1>
            <ul className="flex flex-col gap-2 font-semibold text-sm">
              <li>FAQ'S</li>
              <li>size guide</li>
              <li>shipping & returns</li>
              <li>influencers</li>
              <li>contact us</li>
            </ul>
          </div>

          <div>
            <h1 className=" font-bold text-sm underline lg:no-underline">
              SwiftCart incoming
            </h1>

            <form action="" className="mb-5">
              <label htmlFor="" className=" font-semibold text-sm">
                Sign up be notified on drops and more
              </label>
              <br />
              <input
                type="email"
                placeholder="your@email.com"
                className=" bg-transparent border-2 mt-3 mr-1 rounded-full outline-none px-3 py-1"
              />{" "}
              <button className="bg-white text-[#5e4340] font-semibold px-7 py-1.5 rounded-full placeholder:font-semibold placeholder:text-white mt-1 lg:mt-0">
                SUBSCRIBE
              </button>
            </form>
            <hr />

            <h1 className="font-bold my-3 text-sm">SIGN UP FOR TEXTS</h1>
            <p className="max-w-[400px] text-xs leading-[20px]">
              By signing up via text, you agree to receive recurring automated
              promotional and personalized marketing text messages (e.g. cart
              reminders) from nuuds at the cell number used when signing up.
              Consent is not a condition of any purchase. Reply HELP for help
              and STOP to cancel. Msg frequency varies. Msg & data rates may
              apply. View Terms & Privacy.
            </p>
          </div>
        </section>
        <div className="bg-white h-[1px] w-full mt-7" />

        <section className="lg:flex items-center justify-between mt-4">
          <div className="flex items-center justify-center gap-8 h-[60px]">
            <a href="#">
              <FaFacebookF size={16} />
            </a>
            <a href="#">
              <FaInstagram size={16} />
            </a>
            <a href="#">
              <FaPinterestP size={16} />
            </a>
            <a href="#">
              <FaTiktok size={16} />
            </a>
            <a href="#">
              <FaTwitter size={16} />
            </a>
            <a href="#">
              <FaYoutube size={16} />
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs flex-wrap">
            <p>&copy; SwiftCart 2024</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Do not sell or share my personal information</p>
          </div>
        </section>
      </section>
    </main>
  );
};
