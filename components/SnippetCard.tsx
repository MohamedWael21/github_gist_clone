"use client";
import Link from "next/link";
import { LuSquareCode } from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";
import { useMemo } from "react";
import { IGistPopulated } from "@/types/models";
import { formatDate, limitLines, shortenText } from "@/lib/helpers";

interface Props {
  gist: IGistPopulated;
}

const SnippetCard = ({ gist }: Props) => {
  const content = limitLines(gist.previewFile.content, 10);
  const containerHeight = useMemo(() => {
    return content.split("\n").length * 24;
  }, [content]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col  gap-4 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex flex-col">
          <div>
            <Link
              href={`/${gist.author.username}`}
              className="text-sm text-primary-500 hover:underline transition-all duration-300 decoration-2"
            >
              {gist.author.username}
            </Link>
            /
            <Link
              href={`/${gist.author.username}/${gist._id}`}
              className="text-sm text-primary-500 hover:underline transition-all duration-300 decoration-2 font-bold"
            >
              {gist.previewFile.name}
            </Link>
          </div>

          <span className="text-xs text-neutral-600">
            {formatDate(gist.createdAt, gist.updatedAt)}
          </span>
          {gist.description && (
            <span className="text-xs text-neutral-600">
              {shortenText(gist.description, 15)}
            </span>
          )}
        </div>
        <ul className="flex gap-4">
          <li>
            <Link
              href={`/${gist.author.username}/${gist._id}`}
              className="flex hover:text-primary-800 text-xs text-neutral-600 items-center gap-1"
            >
              <LuSquareCode />
              <span className="flex gap-1">
                <span>{gist.files}</span> file
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={`/${gist.author.username}/${gist._id}`}
              className="flex hover:text-primary-800 text-xs text-neutral-600 items-center gap-1"
            >
              <FaRegCommentAlt />
              <span className="flex gap-1">
                <span>{gist.comments}</span> comments
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={`/${gist.author.username}/${gist._id}/stargazers`}
              className="flex hover:text-primary-800 text-xs text-neutral-600 items-center gap-1"
            >
              <FaRegStar />
              <span className="flex gap-1">
                <span>{gist.stars.length}</span>
                stars
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="border rounded-lg border-neutral-400 max-h-[200px] disable-editor"
        style={{ height: `${containerHeight}px` }}
      >
        <Editor
          height="100%"
          options={{
            readOnly: true,
            overviewRulerLanes: 0,
            scrollbar: {
              vertical: "hidden",
              handleMouseWheel: false,
              alwaysConsumeMouseWheel: false,
              horizontalScrollbarSize: 8,
              horizontal: "visible",
            },
            minimap: {
              enabled: false,
            },
            contextmenu: false,
          }}
          language="python"
          defaultValue={content}
        />
      </div>
    </div>
  );
};

export default SnippetCard;
