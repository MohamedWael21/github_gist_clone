import { redirect } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import Filter from "@/components/Filter";
import { gistSortOptions } from "@/constants";
import ProfileTabs from "@/components/ProfileTabs";
import { getUser, getUserGistsByUsername } from "@/lib/actions/user.actions";

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  const user = await getUser({ username: params.username });
  const result = await getUserGistsByUsername({
    username: params.username,
    sortOptions: { createdAt: "desc" },
  });

  if (!result || !user) redirect("/discover");

  const { totalGists } = result;

  return (
    <section className="container-xl px-4 md:px-6 lg:px-8 mt-6">
      <div className="lg:grid lg:grid-cols-12 flex flex-col gap-10 lg:gap-4">
        <div className="lg:col-span-3">
          <ProfileHeader user={user} />
        </div>
        <div className="lg:col-span-9">
          <div className="mb-6 relative">
            <ProfileTabs
              username={params.username}
              starredCount={user.starred.length}
              gistsCount={totalGists}
            />
            <Filter sortOptions={gistSortOptions} />
          </div>
          <div className="space-y-7">{children}</div>
        </div>
      </div>
    </section>
  );
}
