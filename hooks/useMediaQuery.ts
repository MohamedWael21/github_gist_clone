"use client";

import { ScreenType } from "@/types/unions";
import { useEffect, useState } from "react";

function useMediaQuery() {
  const [screenType, setScreenType] = useState<ScreenType>("DESKTOP");
  useEffect(() => {
    const onScreenChange = () => {
      if (window.innerWidth >= 1024) {
        setScreenType("DESKTOP");
      } else if (window.innerWidth >= 768) {
        setScreenType("TABLET");
      } else {
        setScreenType("MOBILE");
      }
    };

    window.addEventListener("resize", onScreenChange);
    onScreenChange();

    return () => window.removeEventListener("resize", onScreenChange);
  }, []);

  return screenType;
}
export default useMediaQuery;
