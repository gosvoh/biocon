import useSmoothScroll from "@/lib/useSmoothScroll";
import { default as NextLink } from "next/link";

export default function Link({
  ...props
}: React.ComponentProps<typeof NextLink>) {
  const smoothScroll = useSmoothScroll();
  return (
    <NextLink
      {...props}
      scroll={false}
      onClick={(e) => {
        if (!e.currentTarget.hash.match(/^#.*$/)) return;
        e.preventDefault();
        smoothScroll(e.currentTarget.hash);
      }}
    ></NextLink>
  );
}
