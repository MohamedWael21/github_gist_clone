import Pagination from "@/components/Pagination";

import SnippetCard from "@/components/SnippetCard";
import { PROFILE_PAGE_SIZE } from "@/constants";
import { getUserStarredGists } from "@/lib/actions/user.actions";
import { createSortQuery } from "@/lib/helpers";
import { SearchParamsType } from "@/types/utils";

interface Props {
  params: { username: string };
  searchParams: SearchParamsType;
}

export default async function page({ params, searchParams }: Props) {
  const result = await getUserStarredGists({
    username: params.username,
    pageNumber: Number(searchParams?.page || 1),
    pageSize: PROFILE_PAGE_SIZE,
    sortOptions: createSortQuery({
      sort: searchParams.sort || "created",
      direction: searchParams.direction || "desc",
    }),
  });

  if (!result) return null;
  const { gists, isNext, totalGists } = result;

  return (
    <>
      {gists.length === 0 && (
        <div className="p-5 text-center">
          <h2 className="text-base font-bold mb-1">
            You don&apos;t have any starred gists yet
          </h2>
        </div>
      )}
      <div className="flex flex-col gap-7">
        {gists.map((gist) => (
          <SnippetCard key={gist._id as unknown as string} gist={gist} />
        ))}
      </div>
      {gists.length !== totalGists && <Pagination isNext={isNext} />}
    </>
  );
}
