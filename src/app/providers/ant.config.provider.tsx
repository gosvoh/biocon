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
          colorBgBase: "hsl(0 0% 10%)",
          boxShadow: "none",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
