"use client";
import EditorJs from "@natterstefan/react-editor-js";
import type EditorJSType from "@editorjs/editorjs";
import type { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
//@ts-expect-error 7016
import Table from "@editorjs/table";
// import List from '@editorjs/list'
//@ts-expect-error 7016
import Warning from "@editorjs/warning";
//@ts-expect-error 7016
import LinkTool from "@editorjs/link";
// import Image from '@editorjs/image';
//@ts-expect-error 7016
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
//@ts-expect-error 7016
import Quote from "@editorjs/quote";
//@ts-expect-error 7016
import Marker from "@editorjs/marker";
//@ts-expect-error 7016
import CheckList from "@editorjs/checklist";
//@ts-expect-error 7016
import Delimiter from "@editorjs/delimiter";
//@ts-expect-error 7016
import SimpleImage from "@editorjs/simple-image";
// import Paragraph from 'editorjs-paragraph-with-alignment';
import NestedList from "@editorjs/nested-list";

const EDITOR_JS_TOOLS = {
  table: Table,
  marker: Marker,
  list: NestedList,
  warning: Warning,
  linkTool: LinkTool,
  // image: Image,
  raw: Raw,
  //   paragraph: Paragraph,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  //   attaches: {
  //     class: AttachesTool,
  //     config: {
  //       //   endpoint: 'http://localhost:8008/uploadFile'
  //     },
  //   },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  image: SimpleImage,
};

export const EditorJSElement = ({
  viewOnly = false,
  initialData,
  onReady,
  onEditorInstance,
  className,
}: {
  viewOnly?: boolean;
  initialData: string;
  onReady?: () => void;
  onEditorInstance?: ((instance: EditorJSType) => void) | undefined;
  className?: string;
}) => {
  return (
    <div className={className}>
      <EditorJs
        readOnly={viewOnly}
        tools={
          EDITOR_JS_TOOLS as unknown as {
            [toolName: string]: ToolConstructable | ToolSettings;
          }
        }
        data={JSON.parse(initialData)}
        holder="editorJS"
        onReady={onReady}
        editorInstance={onEditorInstance}
      >
        <div id="editorJS" />
      </EditorJs>
    </div>
  );
};
