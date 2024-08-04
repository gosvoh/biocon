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
        token: {
          colorPrimary: "hsl(268 67% 44%)",
          colorBgBase: "#000000",
          boxShadow: "none",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
