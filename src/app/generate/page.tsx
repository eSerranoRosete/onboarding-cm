"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { encryptString } from "@/lib/cryptoUtils";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

type State = {
  url: string | null;
  email: string | null;
  secret: string | null;
};

export default function Page() {
  const [state, setState] = useState<State>({
    url: null,
    email: null,
    secret: null,
  });

  const onGenerate = async () => {
    if (state.email && state.secret) {
      const encrypted = await encryptString(state.email, state.secret);

      const url = `${window.location.origin}?id=${encrypted}`;

      setState((prev) => ({ ...prev, url: url }));
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border shadow p-6 rounded-3xl flex flex-col gap-8">
        <h1 className="text-2xl font-medium">Generate URL</h1>
        <div className="grid gap-2">
          <Label>Dest Email</Label>
          <Input
            onChange={(e) =>
              setState((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="jdoe@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label>Secret</Label>
          <Input
            onChange={(e) =>
              setState((prev) => ({ ...prev, secret: e.target.value }))
            }
          />
        </div>

        {state.url && (
          <div className="grid gap-2">
            <Label>Encrypted URL</Label>
            <div className="relative">
              <Input value={state.url} readOnly />
              <Button
                size="icon"
                className="w-8 h-8 absolute top-1/2 -translate-y-1/2 right-2"
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(state.url!);
                }}
              >
                <CopyIcon className="w-3" />
              </Button>
            </div>
          </div>
        )}

        <Button onClick={onGenerate}>Generate</Button>
      </div>
    </main>
  );
}
