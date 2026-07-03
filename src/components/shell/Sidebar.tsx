"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navSections } from "./nav";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "./ThemeToggle";
import { company, user, workspace } from "@/lib/company";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[248px] shrink-0 flex-col border-r border-line bg-base-900/60 backdrop-blur-xl lg:flex">
      {/* Workspace switcher */}
      <div className="flex h-16 items-center gap-3 border-b border-line px-4">
        <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-primary text-sm font-bold tracking-tight text-primary-fg">
          N
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-ink">{company.name}</div>
          <div className="truncate text-xs text-ink-faint">{workspace.plan} workspace</div>
        </div>
        <Icon name="ChevronsUpDown" className="h-4 w-4 text-ink-faint" />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navSections.map((section, i) => (
          <div key={i}>
            {section.title && (
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-ghost">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "text-ink"
                        : "text-ink-muted hover:bg-overlay/[0.04] hover:text-ink"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg border border-line-strong bg-overlay/[0.05]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon
                      name={item.icon}
                      className={cn(
                        "relative z-10 h-[18px] w-[18px] transition-colors",
                        active ? "text-accent" : "text-ink-faint group-hover:text-ink-muted"
                      )}
                    />
                    <span className="relative z-10 flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="relative z-10 rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="space-y-1 border-t border-line p-3">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-xs font-medium text-ink-faint">Appearance</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-overlay/[0.04]">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-base-700 text-xs font-semibold text-ink">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink">
              {user.firstName} {user.lastName}
            </div>
            <div className="truncate text-xs text-ink-faint">{user.title}</div>
          </div>
          <Icon name="MoreHorizontal" className="h-4 w-4 text-ink-faint" />
        </div>
      </div>
    </aside>
  );
}
