"use client";

import { useFormState } from "@/context/useFormState";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getFormContent } from "@/lib/formContent";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

export function PersonalInfo(props: Props) {
  const setValue = useFormState((s) => s.setValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.nextStep();
      }}
      className="w-full max-w-lg p-6 border shadow rounded-3xl flex flex-col gap-8"
    >
      <h1 className="text-2xl font-medium">Información de contacto</h1>
      <div className="grid gap-2">
        <Label>{getFormContent("name").label}</Label>
        <Input
          onChange={(e) => setValue("name", e.target.value)}
          placeholder={getFormContent("name").placeholder}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>{getFormContent("email").label}</Label>
        <Input
          onChange={(e) => setValue("email", e.target.value)}
          type="email"
          placeholder={getFormContent("email").placeholder}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>{getFormContent("tel").label}</Label>
        <Input
          onChange={(e) => setValue("tel", e.target.value)}
          type="tel"
          placeholder={getFormContent("tel").label}
          required
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <div />
        <Button>Siguiente</Button>
      </div>
    </form>
  );
}
