import { ArrowBigLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
interface ButtonGetStartedProps {
  id: number;

}

const ButtonGetStarted = ({ id }: ButtonGetStartedProps) => {
  return (
    <NavLink to={`/detail/course/${id}`}>
      <button className="cursor-pointer group relative bg-white hover:bg-teal-200 text-black font-semibold text-sm px-6 py-2 rounded-md transition-all duration-200 ease-in-out shadow hover:shadow-lg w-full h-10 border-none mt-2">
        <div className="relative flex items-center justify-center gap-2">
          <span className="relative inline-block overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full ">
              View details
            </span>
            <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              Get started
            </span>
          </span>

          <ArrowBigLeft
            className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45 group-hover:text-teal-500 "
            viewBox="0 0 24 24"
          >
            <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              stroke="white"
              d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
            ></path>
          </ArrowBigLeft>
        </div>
      </button>
    </NavLink>
  );
};

export default ButtonGetStarted;
