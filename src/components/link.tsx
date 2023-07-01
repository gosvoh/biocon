import useSmoothScroll from "@/lib/useSmoothScroll";
import { default as NextLink } from "next/link";

export default function Link({
  onClick,
  wait = 0,
  ...props
}: {
  wait?: number;
} & React.ComponentProps<typeof NextLink>) {
  const smoothScroll = useSmoothScroll();

  return (
    <NextLink
      {...props}
      onClick={(e) => {
        if (!e.currentTarget.hash.match(/^#.*$/)) return;
        const hash = e.currentTarget.hash;
        e.preventDefault();
        onClick?.(e);
        setTimeout(() => {
          smoothScroll(hash);
          if (window.location.hash !== hash)
            window.history.pushState(null, "", hash);
        }, wait * 1000);
      }}
    ></NextLink>
  );
}
