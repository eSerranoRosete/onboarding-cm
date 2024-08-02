"use client";

import { PersonalInfo } from "@/components/steps/PersonalInfo";
import { ProfesionalInfo } from "@/components/steps/ProfesionalInfo";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";

export default function Home() {
  const [step, setStep] = useState<number>(0);

  const steps = [PersonalInfo, ProfesionalInfo];

  return (
    <Suspense>
      <main className="w-full min-h-screen flex items-center justify-center">
        {steps.map((Step, index) => (
          <div
            key={index}
            className={cn("hidden w-full max-w-xl", index === step && "block")}
          >
            <Step
              prevStep={() => setStep((prev) => prev - 1)}
              nextStep={() => setStep((prev) => prev + 1)}
            />
          </div>
        ))}
      </main>
    </Suspense>
  );
}
