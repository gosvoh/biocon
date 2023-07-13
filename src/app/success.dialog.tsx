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
      <DialogContent>
        <DialogHeader className="sm:text-center">
          <DialogTitle>{title}</DialogTitle>
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
