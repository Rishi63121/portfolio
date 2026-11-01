import fs from "node:fs";
import path from "node:path";
import Avatar from "@/components/Avatar";
import LookAt from "@/components/LookAt";
import { withBase } from "@/lib/site";

const candidates = ["rishi.png", "rishi.webp", "rishi.jpg", "rishi.jpeg"];

function findPhoto() {
  return candidates.find((f) => fs.existsSync(path.join(process.cwd(), "public", f)));
}

/**
 * Hero / About figure. If public/rishi.png (or .webp/.jpg) exists it is used, tilting toward the
 * cursor; otherwise the cartoon avatar is shown. Both follow the pointer via LookAt.
 */
export default function Portrait({ variant = "hero" }: { variant?: "hero" | "square" }) {
  const photo = findPhoto();

  if (photo) {
    return (
      <LookAt className={variant === "hero" ? "h-full" : "size-full"}>
        <div className="av-head size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase(`/${photo}`)}
            alt="Portrait of Rishi Roy"
            width={640}
            height={800}
            fetchPriority={variant === "hero" ? "high" : "auto"}
            className={
              variant === "hero"
                ? "h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
                : "size-full object-cover object-top"
            }
          />
        </div>
      </LookAt>
    );
  }

  return (
    <LookAt className={variant === "hero" ? "mx-auto aspect-[4/5] h-full" : "size-full"}>
      <Avatar uid={variant === "hero" ? "avh" : "ava"} />
    </LookAt>
  );
}
