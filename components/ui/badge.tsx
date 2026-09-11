import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
