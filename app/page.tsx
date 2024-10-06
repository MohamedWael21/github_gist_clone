import { requireUser } from "@/lib/auth";
import { LuSquareCode } from "react-icons/lu";

import Link from "next/link";
import AddGistForm from "@/components/AddGistForm";
import { getUserGists } from "@/lib/actions/user.actions";
import { shortenText } from "@/lib/helpers";

export default async function Home() {
  const user = await requireUser("/starred");
  const result = await getUserGists({ author: user._id, pageSize: 4 });

  if (!result) return null;
  const { gists } = result;
  return (
    <section className="pt-4">
      {gists.length === 0 && (
        <section className="py-10 text-center">
          <h1 className=" text-primary-500 text-[32px] font-light">
            Instantly share code, notes, and snippets.
          </h1>
        </section>
      )}
      {gists.length && (
        <div className="pb-4 mb-6 border-b border-neutral-300">
          <div className="container px-4">
            <div className="lg:flex lg:gap-4">
              <ul className="hidden lg:grid grid-cols-4 flex-1">
                {gists.map((gist) => (
                  <li
                    className="flex gap-2"
                    key={gist._id as unknown as string}
                  >
                    <LuSquareCode className="text-xl text-neutral-800" />
                    <div className="flex flex-col group">
                      <Link
                        href={`/${user.username}/${gist._id}`}
                        className="text-sm font-bold text-primary-600"
                      >
                        {gist.name}
                      </Link>
                      <span className="text-neutral-500 text-xs group-hover:underline group-hover:decoration-2 group-hover:decoration-primary-600  cursor-pointer">
                        {shortenText(gist.description || "No description", 16)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                className="btn lg:text-primary-600 lg:text-right lg:bg-transparent lg:hover:underline lg:hover:bg-transparent lg:decoration-2 lg:p-0 lg:flex lg:justify-end lg:items-center lg:w-fit  lg:border-transparent lg:rounded-none lg:font-bold"
                href={`/${user.username}`}
              >
                View your gists
              </Link>
            </div>
          </div>
        </div>
      )}

      <AddGistForm authorId={user._id} />
    </section>
  );
}
