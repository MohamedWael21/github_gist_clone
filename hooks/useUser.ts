"use client";

import { getUser } from "@/lib/actions/user.actions";
import { AddObjectId, IUser } from "@/types/models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<AddObjectId<IUser> | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { status, data: session } = useSession();

  useEffect(() => {
    const fetchUserInfo = async (): Promise<void> => {
      try {
        if (!session?.user.id) return;
        const user = await getUser({ id: session.user.id });
        if (user) {
          setUser(user);
          setIsAuth(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUserInfo();
    } else if (status === "unauthenticated") {
      setIsAuth(false);
      setIsLoading(false);
    } else {
      setIsLoading(status === "loading");
    }
  }, [status, session?.user?.id]);

  return { isAuth, isLoading, user };
};

export default useUser;
