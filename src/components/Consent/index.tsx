"use client";
import ConsentWidget from "./Widget";
import ConsentModal from "./Modal";
import { initConsent, ConsentConfig } from "@/lib/consent";

export function ConsentProvider(props: { config: ConsentConfig }) {
  initConsent(props.config);

  return (
    <>
      <ConsentWidget />
      <ConsentModal />
    </>
  );
}
