"use client";

import { Loader2Icon, UploadCloudIcon } from "lucide-react";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

import { isEmpty } from "lodash";
import { useFormState } from "@/context/useFormState";
import { sendEmail } from "@/lib/sendMail";
import { formContent, getFormContent } from "@/lib/formContent";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

export function ProfesionalInfo(props: Props) {
  const params = useSearchParams();

  const id = params.get("id");

  const router = useRouter();

  const [fileName, setFileName] = useState<string>();

  const [isPending, setIsPending] = useState(false);

  const setValue = useFormState((s) => s.setValue);
  const values = useFormState((s) => s.values);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !isEmpty(e.target.files)) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result;

        setValue("resume", base64String);
      };

      reader.readAsDataURL(file);

      setFileName(file.name);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (id) {
      setIsPending(true);

      e.preventDefault();

      let body: string = "";

      /**
       * Parse body to make it a string
       */
      Object.entries(formContent).forEach(([key, value]) => {
        const formValue = values[key];

        if (key === "resume") {
          return;
        }

        const entry = `<b>${value.label}</b>: <br/> ${formValue} <br/><br/>`;

        body += entry;
      });

      try {
        await sendEmail({
          body: {
            body,
            header: "Nueva solicitud recibida",
            destEmail: id,
            attachments: [{ filename: fileName, content: values["resume"] }],
          },
        });
        router.push("/thankyou");
      } catch (error) {}

      setIsPending(false);
    }
  };

  return (
    <form
      className="w-full max-w-lg p-6 border shadow rounded-3xl flex flex-col gap-8"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-medium">Información profesional</h1>
      <div className="grid gap-2">
        <Label>{getFormContent("profile").label}</Label>
        <Textarea
          onChange={(e) => setValue("profile", e.target.value)}
          placeholder={getFormContent("profile").label}
          className="resize-none"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>{getFormContent("expectations").label}</Label>
        <Input
          onChange={(e) => setValue("expectations", e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>{getFormContent("experience").label}</Label>
        <RadioGroup
          onValueChange={(val) => setValue("experience", val)}
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="si" id="si" />
            <Label htmlFor="si">Si</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-2">
        <div className="flex relative flex-col items-center gap-2 border border-dashed rounded-md p-4 hover:bg-muted ">
          <Input
            onChange={onUpload}
            type="file"
            className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            required
          />
          <div className="flex items-center gap-2 text-sm">
            {fileName || (
              <>
                <UploadCloudIcon className="w-5" />
                Sube tu CV
              </>
            )}
          </div>
          <span className="text-xs font-muted-foreground">Peso máx. 25 MB</span>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>
          Esta es una vacante de modalidad híbrida que no ofrece sueldo base
        </Label>
        <div className="flex items-center gap-2">
          <Checkbox required />
          <Label>De acuerdo</Label>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" onClick={props.prevStep}>
          Regresar
        </Button>
        <Button disabled={isPending}>
          {isPending ? <Loader2Icon className="w-4 animate-spin" /> : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
