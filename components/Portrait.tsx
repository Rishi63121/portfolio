import fs from "node:fs";
import path from "node:path";
import { withBase } from "@/lib/site";

const candidates = ["rishi.png", "rishi.webp", "rishi.jpg", "rishi.jpeg"];

function findPhoto() {
  return candidates.find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));
}

/**
 * Save a cut-out portrait (transparent PNG works best) as public/rishi.png and it replaces the
 * monogram automatically on the next build. `variant="square"` is the framed version for About.
 */
export default function Portrait({ variant = "hero" }: { variant?: "hero" | "square" }) {
  const photo = findPhoto();

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBase(`/${photo}`)}
        alt="Portrait of Rishi Roy"
        width={640}
        height={800}
        fetchPriority={variant === "hero" ? "high" : "auto"}
        className={
          variant === "hero"
            ? "h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
            : "h-full w-full object-cover object-top"
        }
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Monogram RR"
      className={`grid place-items-center ${variant === "hero" ? "h-full" : "h-full w-full"}`}
    >
      <span
        aria-hidden
        className={`cond select-none leading-none text-text/95 [text-shadow:0_8px_40px_rgb(0_0_0/0.45)] ${variant === "hero" ? "text-[clamp(5rem,15vw,11rem)]" : "text-[clamp(3rem,6vw,4.4rem)]"}`}
      >
        RR
      </span>
    </div>
  );
}
