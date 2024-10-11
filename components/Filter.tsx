"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SortOption } from "@/types/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
  sortOptions: SortOption[];
}

const Filter = ({ sortOptions }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultOption = useMemo(() => {
    const direction = searchParams.get("direction");
    const sortType = searchParams.get("sort");

    if (!direction || !sortType) return sortOptions[0].sortTitle;

    const option = sortOptions.find(
      (option) => option.direction === direction && option.sortType === sortType
    );

    return option?.sortTitle || sortOptions[0].sortTitle;
  }, [searchParams, sortOptions]);

  const handleOptionChange = (value: string) => {
    const option = sortOptions.find((option) => option.sortTitle === value);
    if (!option) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("direction", option.direction);
    newSearchParams.set("sort", option.sortType);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <div className="mt-2 lg:mt-0 lg:absolute lg:right-0 lg:bottom-1">
      <Select defaultValue={defaultOption} onValueChange={handleOptionChange}>
        <SelectTrigger className=" w-fit border-none text-neutral-950 font-bold focus:ring-0 focus:ring-transparent flex gap-1 bg-neutral-100  !px-2 !py-1.5 !text-xs    rounded-lg">
          <span className="text-neutral-800 font-normal">Sort:</span>
          <SelectValue placeholder="Select sort options" />
        </SelectTrigger>
        <SelectContent className="hover:ring-0 focus:ring-0">
          {sortOptions.map((option) => {
            return (
              <SelectItem
                value={option.sortTitle}
                key={option.sortTitle}
                className="cursor-pointer  hover:ring-0"
              >
                {option.sortTitle}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
export default Filter;
