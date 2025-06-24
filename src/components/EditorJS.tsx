"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import type EditorJSType from "@editorjs/editorjs";
import type { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const Container = styled.div`
  .cdx-marker {
    color: inherit;
  }
`;

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
  const [isClient, setIsClient] = useState(false);
  const [EditorJs, setEditorJs] = useState<any>(null);
  const [tools, setTools] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);

    // Динамически импортируем все EditorJS компоненты только на клиенте
    const loadEditorComponents = async () => {
      const [
        { default: EditorJsComponent },
        { default: Table },
        { default: Warning },
        { default: LinkTool },
        { default: Raw },
        { default: Header },
        { default: Quote },
        { default: Marker },
        { default: CheckList },
        { default: Delimiter },
        { default: SimpleImage },
        { default: NestedList },
      ] = await Promise.all([
        import("@natterstefan/react-editor-js"),
        // @ts-expect-error 7016
        import("@editorjs/table"),
        // @ts-expect-error 7016
        import("@editorjs/warning"),
        // @ts-expect-error 7016
        import("@editorjs/link"),
        // @ts-expect-error 7016
        import("@editorjs/raw"),
        import("@editorjs/header"),
        // @ts-expect-error 7016
        import("@editorjs/quote"),
        // @ts-expect-error 7016
        import("@editorjs/marker"),
        // @ts-expect-error 7016
        import("@editorjs/checklist"),
        // @ts-expect-error 7016
        import("@editorjs/delimiter"),
        // @ts-expect-error 7016
        import("@editorjs/simple-image"),
        import("@editorjs/nested-list"),
      ]);

      const EDITOR_JS_TOOLS = {
        table: Table,
        marker: Marker,
        list: NestedList,
        warning: Warning,
        linkTool: LinkTool,
        raw: Raw,
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        image: SimpleImage,
      } satisfies {
        [toolName: string]: ToolConstructable | ToolSettings;
      };

      setEditorJs(EditorJsComponent);
      setTools(EDITOR_JS_TOOLS);
    };

    loadEditorComponents();
  }, []);

  if (!isClient || !EditorJs || !tools)
    return (
      <Container
        className={cn(
          "flex flex-col gap-2 max-w-[650px] w-full mx-auto",
          className,
        )}
      >
        <Skeleton className="h-32 w-full" />
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-12 w-${Math.floor(Math.random() * 5) + 8}/12`}
          />
        ))}
      </Container>
    );

  return (
    <Container className={className}>
      <EditorJs
        readOnly={viewOnly}
        tools={tools}
        data={JSON.parse(initialData)}
        holder="editorJS"
        onReady={onReady}
        editorInstance={onEditorInstance}
      />
    </Container>
  );
};
