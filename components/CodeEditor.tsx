"use client";
import { FiTrash } from "react-icons/fi";
import { ChangeEvent, useState } from "react";
import Editor from "@monaco-editor/react";

import { getLanguageFromFilename } from "@/lib/helpers";
import { ButtonClickEvent, CodeEditorInstance } from "@/types/utils";
import ToolTip from "./ToolTip";

interface Props {
  codeEditor: CodeEditorInstance;
  counts: number;
  onDelete: (codeEditorId: string) => void;
  onUpdate: (updatedCodeEditor: CodeEditorInstance) => void;
}

const CodeEditor = ({ codeEditor, counts, onDelete, onUpdate }: Props) => {
  const [fileName, setFileName] = useState(codeEditor.fileName);

  const language = getLanguageFromFilename(fileName);

  const handleEditorChange = (value: string | undefined) => {
    onUpdate({ ...codeEditor, content: value || "", fileName, lang: language });
  };

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    onUpdate({
      ...codeEditor,
      fileName: e.target.value,
      lang: getLanguageFromFilename(e.target.value),
    }); // we don't use language sate because it still didn't update when this function execute
  };
  const handleDelete = (e: ButtonClickEvent) => {
    e.preventDefault();
    onDelete(codeEditor.id);
  };
  return (
    <div>
      <div className="px-2 py-1 border border-neutral-400">
        <div className="flex items-center w-[300px] max-w-full gap-2">
          <input
            name="fileName"
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            className="py-[5px] px-3 border-neutral-400 border rounded-lg text-sm focus:border-transparent flex-1  m-[1px]"
            placeholder="Filename including extension.."
          />
          {counts > 1 && (
            <ToolTip text="Remove File" position="right">
              <button
                className="text-red-500  p-1 border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={handleDelete}
              >
                <FiTrash />
              </button>
            </ToolTip>
          )}
        </div>
      </div>
      <div className="border border-neutral-400 border-t-0 pt-4 h-80">
        <Editor
          height="100%"
          language={language}
          onChange={handleEditorChange}
          options={{
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            },
          }}
        />
      </div>
    </div>
  );
};
export default CodeEditor;
