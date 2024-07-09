"use client";

import { ConfigProvider, theme } from "antd";

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: {
          Timeline: {
            lineType: "dotted",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
