import Link from "next/link";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { BsTwitterX } from "react-icons/bs";
import { GoPeople } from "react-icons/go";

import Avatar from "./Avatar";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="flex lg:flex-col gap-4 mb-6 items-center lg:order-1">
        <div className="basis-1/6 shrink-0 lg:w-full">
          <Avatar
            alt="Profile image"
            width={290}
            height={290}
            src="/placeholder.png"
          />
        </div>
        <h1 className="flex flex-col">
          <span className="font-bold text-2xl ">Adrian Haijdin-Js Mastery</span>
          <span className="font-light text-xl text-neutral-500">
            adrianhagjdin
          </span>
        </h1>
      </div>

      <p className="mb-4 lg:mb-4 text-base max-w-full lg:order-2">
        Next.js Enthusiast & Educator
      </p>

      <ul className="mb-2 lg:mb-4 flex flex-col gap-1 lg:order-4">
        <li className="flex items-center gap-2">
          <MdOutlineMailOutline className="text-base" />
          <Link href={`mailto:`} className="text-sm text-neutral-600 link">
            contact@jsmastery.pro
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <MdOutlineLocationOn className="text-base" />
          <span className="text-sm text-neutral-600">Egypt</span>
        </li>
        <li className="flex items-center gap-2">
          <GoOrganization className="text-base" />
          <span className="text-sm text-neutral-600">Javascript Mastery</span>
        </li>
        <li className="flex items-center gap-2">
          <BsTwitterX className="text-base" />
          <Link
            href={`https://twitter.com/`}
            className="text-sm text-neutral-600 link"
          >
            @jsmaterypro
          </Link>
        </li>
      </ul>

      <div className="mb-8 lg:mb-4 flex lg:flex-wrap  gap-2 text-sm text-neutral-500 lg:order-3">
        <Link
          href={`https://github.com/adrianhajdin?tab=followers`}
          className="flex group hover:text-primary-500 items-center gap-1.5"
        >
          <GoPeople />
          <span className="font-bold group-hover:text-primary-500  text-neutral-950">
            27.7k
          </span>
          followers
        </Link>
        .
        <Link
          href={`https://github.com/adrianhajdin?tab=following`}
          className="flex hover:text-primary-500 items-center gap-1.5 group"
        >
          <span className="font-bold text-neutral-950 group-hover:text-primary-500">
            0
          </span>
          following
        </Link>
      </div>

      <Link href={`https://github.com/adrianhajdin`} className="btn lg:order-5">
        view github profile
      </Link>
    </div>
  );
};
export default ProfileHeader;
