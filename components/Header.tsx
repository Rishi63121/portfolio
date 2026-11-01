"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { links, withBase } from "@/lib/site";
import { applyMood, moods } from "@/lib/moods";

type Command = { id: string; label: string; hint: string; run: () => void };

const nav = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#recognition", label: "Recognition" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }, []);

  const go = (hash: string) => () => {
    document.querySelector(hash)?.scrollIntoView();
    history.replaceState(null, "", hash);
  };

  const commands: Command[] = [
    ...nav.map((n) => ({ id: n.href, label: `Go to ${n.label}`, hint: "Section", run: go(n.href) })),
    ...moods.map((m) => ({
      id: `mood-${m.id}`,
      label: `Mood: ${m.label}`,
      hint: "Recolour the page",
      run: () => applyMood(m.id),
    })),
    {
      id: "resume",
      label: "Download resume (PDF)",
      hint: "File",
      run: () => window.open(withBase(links.resume), "_blank"),
    },
    {
      id: "copy",
      label: "Copy email address",
      hint: links.email,
      run: () => {
        navigator.clipboard?.writeText(links.email).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
    },
    { id: "gh", label: "Open GitHub", hint: "External", run: () => window.open(links.github, "_blank", "noopener") },
    { id: "li", label: "Open LinkedIn", hint: "External", run: () => window.open(links.linkedin, "_blank", "noopener") },
    { id: "lc", label: "Open LeetCode", hint: "External", run: () => window.open(links.leetcode, "_blank", "noopener") },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      filtered[active].run();
      if (filtered[active].id !== "copy") close();
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="glass flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 shadow-2xl">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight">
          <span aria-hidden className="grid size-7 place-items-center rounded-full bg-accent text-accent-ink">
            R
          </span>
          <span className="hidden sm:inline">rishi.roy</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-text/10 hover:text-text"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className="flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
        >
          Command
          <kbd className="rounded bg-bg/10 px-1.5 font-mono text-[11px]">Ctrl K</kbd>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto mt-[12vh] w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-line-strong bg-[#101217] p-0 text-text shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined}
          placeholder="Type a command or search…"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-faint"
        />
        <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-faint">No matching command</li>}
          {filtered.map((c, i) => (
            <li
              key={c.id}
              id={`${listId}-${c.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                c.run();
                if (c.id !== "copy") close();
              }}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                i === active ? "bg-text/10 text-text" : "text-muted"
              }`}
            >
              <span>{c.id === "copy" && copied ? "Copied to clipboard" : c.label}</span>
              <span className="font-mono text-xs text-faint">{c.hint}</span>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
}
