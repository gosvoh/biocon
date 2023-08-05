import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { CheckCircle2 } from "lucide-react";

export default function SuccessDialog({
  title,
  description,
  ...props
}: {
  title: string;
  description: string;
} & React.PropsWithoutRef<DialogProps>) {
  return (
    <Dialog {...props}>
      <DialogContent className="w-[80%]">
        <DialogHeader className="sm:text-center mb-8">
          <DialogTitle className="flex flex-col items-center mb-10">
            <CheckCircle2 size={50} strokeWidth={1} className="mb-10" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            variant="default"
            onClick={() => {
              props.onOpenChange?.(false);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
