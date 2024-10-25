"use client";
import type EditorJSType from "@editorjs/editorjs";
import { update } from "@/app/admin/editArticle/[id]/saveArticle";
import { notification } from "antd";
import { EditorJSElement } from "@/components/EditorJS";
// import AttachesTool from '@editorjs/attaches';

export const EditArticle = ({
  id,
  initialData,
}: {
  id: number;
  initialData: string;
}) => {
  const [api, context] = notification.useNotification();
  let editor: EditorJSType | null = null;

  const onReady = () => {
    api.info({
      message: "Ready!",
      description: "EditorJS is ready to work",
    });
  };

  const onSave = async () => {
    try {
      const outputData = await editor?.save();
      await update(outputData ? outputData : { blocks: [] }, id);
      api.success({
        message: "Successfully saved!",
        description: "Now you can close this page",
      });
    } catch (e) {
      api.success({
        message: "Error saving the data",
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="p-10 w-full fcol gap-5">
      {context}
      <div className="flex items-start justify-start">
        <h1>Edit article #{id}</h1>
      </div>
      <div className="bg-white text-black max-w-full rounded-lg">
        <EditorJSElement
          initialData={initialData}
          onReady={onReady}
          onEditorInstance={(editorInstance) => {
            editor = editorInstance;
          }}
        />
      </div>
      <button className={"main-button w-full"} onClick={onSave}>
        Save
      </button>
    </div>
  );
};
