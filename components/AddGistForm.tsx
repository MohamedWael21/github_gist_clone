"use client";

import { FormEvent, useState } from "react";
import CodeEditor from "./CodeEditor";
import { ButtonClickEvent, CodeEditorInstance } from "@/types/utils";
import { Types } from "mongoose";
import { createGist } from "@/lib/actions/gist.actions";
import { useRouter } from "next/navigation";

interface Props {
  authorId: Types.ObjectId;
}

const defaultFileEditor = {
  id: crypto.randomUUID(),
  fileName: "",
  lang: "",
  content: "",
};

const AddGistForm = ({ authorId }: Props) => {
  const [description, setDescription] = useState("");
  const [codeEditors, setCodeEditors] = useState<CodeEditorInstance[]>([
    defaultFileEditor,
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setIsError] = useState("");

  const router = useRouter();

  const addCodeEditor = (e: ButtonClickEvent) => {
    e.preventDefault();
    setCodeEditors((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        fileName: "",
        lang: "",
        content: "",
      },
    ]);
  };

  const deleteCodeEditor = (codeEditorId: string) => {
    setCodeEditors((prev) =>
      prev.filter((codeEditor) => codeEditor.id !== codeEditorId)
    );
  };

  const updateCodeEditor = (updatedCodeEditor: CodeEditorInstance) => {
    setCodeEditors((prev) =>
      prev.map((codeEditor) =>
        codeEditor.id === updatedCodeEditor.id ? updatedCodeEditor : codeEditor
      )
    );
  };

  const isValidate = () => {
    for (const editor of codeEditors) {
      if (!editor.fileName) {
        return "File name can't be empty";
      }
      if (!editor.content) {
        return "Content can't be empty";
      }
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = isValidate();

    if (validationError) {
      setIsError(validationError);
      return;
    }

    setIsError("");
    setIsSubmitting(true);

    const files = codeEditors.map(({ fileName, lang, content }) => ({
      name: fileName,
      lang,
      content,
    }));

    const { error: createGistError, redirectPath } = await createGist({
      author: authorId,
      description: description,
      files,
    });

    setIsSubmitting(false);

    if (!createGistError) {
      return router.push(redirectPath);
    }

    setIsError(createGistError);
  };

  return (
    <form
      className="flex flex-col gap-4 container px-4"
      onSubmit={handleSubmit}
    >
      <span
        className={`text-red-500 opacity-0 invisible transition-all  ${
          error && "opacity-100 !visible"
        }`}
      >
        {error}
      </span>
      <input
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Gist description..."
        className="px-3 py-[5px] rounded-lg border border-neutral-400 text-sm shadow-sm focus:border-transparent"
      />
      {codeEditors.map((codeEditor) => (
        <CodeEditor
          key={codeEditor.id}
          codeEditor={codeEditor}
          counts={codeEditors.length}
          onDelete={deleteCodeEditor}
          onUpdate={updateCodeEditor}
        />
      ))}
      <div className="flex justify-between">
        <button
          className="px-4 py-[5px] border hover:bg-primary-500 hover:text-white border-primary-500 text-neutral-700 font-bold rounded-lg text-sm shadow-md hover:shadow-sm"
          onClick={addCodeEditor}
        >
          Add file
        </button>
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Creating..." : "Create Gist"}
          className="px-4 py-[5px] text-white bg-primary-500 disabled:bg-primary-800 hover:bg-primary-600 rounded-lg text-sm cursor-pointer font-medium hover:shadow-sm shadow-lg"
        />
      </div>
    </form>
  );
};
export default AddGistForm;
