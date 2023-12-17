import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const componentsClassNames = {
  xl5: {
    className: "text-5xl sm:text-7xl md:text-9xl",
  },
  xl4: {
    className: "text-4xl sm:text-6xl md:text-8xl",
  },
  xl3: {
    className: "text-3xl sm:text-4xl md:text-5xl",
  },
  xl2: {
    className: "text-2xl sm:text-3xl md:text-4xl",
  },
  xl: {
    className: "text-xl sm:text-2xl md:text-3xl",
  },
  lg: {
    className: "text-lg sm:text-xl md:text-2xl",
  },
  base: {
    className: "text-base sm:text-ls md:text-xl",
  },
  sm: {
    className: "text-sm sm:text-base md:text-lg",
  },
  xs: {
    className: "text-xs sm:text-sm md:text-base",
  },
  button: {
    className: "px-8 py-4 text-base sm:text-lg md:text-xl font-normal",
    get accent() {
      return {
        className: cn(
          "sm:py-5 md:py-6",
          "w-full sm:w-auto",
          this.className,
          buttonVariants({ variant: "default" })
        ),
      };
    },
    get outline() {
      return {
        className: cn(
          buttonVariants({ variant: "outline" }),
          "bg-transparent",
          "border-white",
          "hover:bg-white",
          "hover:text-black",
          "sm:py-5 md:py-6",
          "w-full sm:w-auto",
          this.className
        ),
      };
    },
  },
};
