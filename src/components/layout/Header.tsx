import { Suspense } from "react";
import { HeaderClient } from "./HeaderClient";
import { HeaderShell } from "./HeaderShell";

export function Header() {
  return (
    <Suspense fallback={<HeaderShell transparent={false} />}>
      <HeaderClient />
    </Suspense>
  );
}
