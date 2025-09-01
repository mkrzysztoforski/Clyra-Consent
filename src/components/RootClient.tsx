"use client";
import { ConsentProvider } from "@/consent";

export default function RootClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsentProvider
        config={{
          lang: "en",
          legalVersion: "2024-08-02",
          categories: {
            necessary: { required: true, label: { en: "Necessary", pl: "Niezbędne" } },
            analytics: { default: false, label: { en: "Analytics", pl: "Analityczne" } },
            marketing: { default: false, label: { en: "Marketing", pl: "Marketingowe" } },
          },
          onUpdate: (s) => console.log("state", s),
        }}
      />
      {children}
    </>
  );
}
