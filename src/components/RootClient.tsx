"use client";
import { ConsentProvider } from "@/components/Consent";

export default function RootClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsentProvider
        config={{
          languages: ["en", "pl"],
          legalVersion: "2024-08-02",
          categories: {
            necessary: { required: true },
            analytics: { default: false },
            marketing: { default: false },
          },
          onUpdate: (s) => console.log("state", s),
        }}
      />
      {children}
    </>
  );
}
