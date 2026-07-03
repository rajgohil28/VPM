"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { VpMark } from "@/components/ui/VpMark";
import { AssistantMessage } from "@/components/chat/AssistantMessage";
import { resolveQuery, suggestedPrompts, type ExecResponse } from "@/lib/chat";
import { user } from "@/lib/company";

interface Msg {
  id: number;
  role: "user" | "assistant";
  text?: string;
  response?: ExecResponse;
  instant?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const send = (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    const { response } = resolveQuery(q);
    const uid = Date.now();
    setMessages((m) => [
      ...m,
      { id: uid, role: "user", text: q },
      { id: uid + 1, role: "assistant", response },
    ]);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const started = messages.length > 0;

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {!started ? (
        // Empty state
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl text-center"
          >
            <VpMark size={56} rounded="rounded-2xl" className="mx-auto mb-5" />
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
              VP of Marketing
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-gradient">
              How can I help, {user.firstName}?
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
              I coordinate your entire marketing organization. Ask a strategic question and I&apos;ll
              convene the right departments to give you a decision-ready answer.
            </p>

            <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
              {suggestedPrompts.map((p, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  onClick={() => send(p)}
                  className="group flex items-center gap-2.5 rounded-xl border border-line bg-base-850/50 px-3.5 py-3 text-left text-sm text-ink-muted transition-all hover:border-line-strong hover:bg-base-850 hover:text-ink"
                >
                  <Icon name="CornerDownRight" className="h-4 w-4 shrink-0 text-ink-ghost group-hover:text-accent" />
                  <span className="flex-1">{p}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-8 py-2">
            {messages.map((m) =>
              m.role === "user" ? (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm border border-line-strong bg-base-800 px-4 py-2.5 text-sm text-ink">
                    {m.text}
                  </div>
                </motion.div>
              ) : (
                <AssistantMessage
                  key={m.id}
                  response={m.response!}
                  instant={m.instant}
                  onDone={() => setBusy(false)}
                  onFollowup={(q) => send(q)}
                />
              )
            )}
            <div ref={endRef} />
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="mx-auto w-full max-w-3xl pt-4">
        <div className="flex items-end gap-2 rounded-2xl border border-line-strong bg-base-850/80 p-2 shadow-card backdrop-blur-xl focus-within:border-accent/40">
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink-faint transition-colors hover:text-ink-muted">
            <Icon name="Paperclip" className="h-[18px] w-[18px]" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Ask your VP of Marketing…"
            className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-ink placeholder:text-ink-ghost focus:outline-none"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || busy}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-fg transition-all hover:opacity-90 disabled:opacity-30 disabled:shadow-none"
          >
            <Icon name={busy ? "Loader" : "ArrowUp"} className={`h-[18px] w-[18px] ${busy ? "animate-spin" : ""}`} />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-ghost">
          Your VP coordinates 8 departments and 32 specialist agents · Responses are simulated for demo
        </p>
      </div>
    </div>
  );
}
