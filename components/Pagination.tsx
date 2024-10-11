"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  isNext: boolean;
}
const Pagination = ({ isNext }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPage = () => {
    return Number(searchParams.get("page")) || 1;
  };
  const handleNext = () => {
    if (!isNext) return;
    const page = getPage();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(page + 1));
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  const handlePrev = () => {
    const page = getPage();
    if (page === 1) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(page - 1));
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <div className="my-4 flex justify-center">
      <div className="flex gap-2">
        <button
          disabled={getPage() === 1}
          className="px-[10px] py-[5px] border border-transparent hover:border-neutral-600 transition-all duration-300 font-bold text-sm text-neutral-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-default disabled:hover:border-transparent disabled:font-medium rounded-lg"
          onClick={handlePrev}
        >
          Older
        </button>
        <button
          disabled={!isNext}
          className="px-[10px] py-[5px] border border-transparent hover:border-neutral-600 transition-all duration-300 font-bold text-sm text-neutral-800 disabled:text-neutral-500 cursor-pointer disabled:cursor-default disabled:hover:border-transparent disabled:font-medium rounded-lg"
          onClick={handleNext}
        >
          Newer
        </button>
      </div>
    </div>
  );
};
export default Pagination;
