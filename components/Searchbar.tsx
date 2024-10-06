import { getClassOfPositionTip } from "@/lib/helpers";
import { PositionTip } from "@/types/unions";
import clsx from "clsx";
import { IoSearch } from "react-icons/io5";

interface Props {
  positionTip?: PositionTip;
}

const Searchbar = ({ positionTip = "center" }: Props) => {
  return (
    <div className="flex">
      <input
        placeholder="Search.."
        className="px-2 py-1 w-full focus:outline-none rounded-s-lg border-neutral-200 border border-r-0 peer z-10"
      />
      <button
        className={clsx(
          "flex tool-tip relative text-neutral-800 justify-center items-center bg-neutral-100   p-2 border-l border-neutral-300 rounded-e-lg cursor-pointer transition duration-300 hover:bg-primary-400 hover:text-white hover:border-primary-400 peer-focus:border-transparent",
          getClassOfPositionTip(positionTip)
        )}
        data-tip="Search Gists"
      >
        <IoSearch className="text-lg" />
      </button>
    </div>
  );
};
export default Searchbar;
