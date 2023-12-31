import NextLink from "next/link";

export default function Link(props: React.ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} target="_blank" {...props} />;
}
