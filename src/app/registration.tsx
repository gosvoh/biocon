import { useState } from "react";
import RegistrationDialog from "./registration.dialog";
import { Button } from "@/components/ui/button";
import { componentsClassNames } from "./classNames";

export default function Registration() {
  const [openRegistration, setOpenRegistration] = useState(false);

  return (
    <>
      <RegistrationDialog
        open={openRegistration}
        onOpenChange={setOpenRegistration}
      />
      <Button
        onClick={() => setOpenRegistration(true)}
        {...componentsClassNames.button.accent}
      >
        Registration
      </Button>
    </>
  );
}
