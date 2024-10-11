"use client";
import { getClassOfPositionTip } from "@/lib/helpers";
import { PositionTip } from "@/types/unions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";

interface Props {
  positionTip?: PositionTip;
}
const AddBtn = ({ positionTip = "center" }: Props) => {
  const router = useRouter();
  return (
    <button
      className={clsx(
        "rounded-lg tool-tip bg-primary-400 hover:bg-primary-500 transition duration-300 p-2  relative text-white",
        getClassOfPositionTip(positionTip)
      )}
      data-tip="Create new gist"
      onClick={() => router.push("/")}
    >
      <GoPlus />
    </button>
  );
};
export default AddBtn;
