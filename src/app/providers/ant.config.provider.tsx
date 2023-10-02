import { ConfigProvider, theme } from "antd";

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      {children}
    </ConfigProvider>
  );
}
