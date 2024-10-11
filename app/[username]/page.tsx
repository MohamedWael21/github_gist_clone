import Pagination from "@/components/Pagination";

import SnippetCard from "@/components/SnippetCard";
import { PROFILE_PAGE_SIZE } from "@/constants";
import { getUserGistsByUsername } from "@/lib/actions/user.actions";
import { createSortQuery } from "@/lib/helpers";
import { SearchParamsType } from "@/types/utils";
import Link from "next/link";

interface Props {
  params: { username: string };
  searchParams: SearchParamsType;
}

export default async function page({ params, searchParams }: Props) {
  const result = await getUserGistsByUsername({
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
            You don&apos;t have any gists
          </h2>
          <p className="text-sm text-neutral-500 font-medium mb-2">
            Your public gists will show up here on your profile.
          </p>
          <Link href="/" className="btn">
            Create gist
          </Link>
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
