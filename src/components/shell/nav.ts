export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide name
  badge?: string;
}

export const navSections: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: "Executive Chat", href: "/", icon: "MessagesSquare", badge: "AI" },
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    ],
  },
  {
    title: "Organization",
    items: [
      { label: "Organization", href: "/organization", icon: "Network" },
      { label: "Departments", href: "/departments", icon: "Boxes" },
      { label: "Campaigns", href: "/campaigns", icon: "Megaphone" },
      { label: "Meetings", href: "/meetings", icon: "Presentation" },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Reports", href: "/reports", icon: "FileText" },
      { label: "Marketing Memory", href: "/memory", icon: "Library" },
      { label: "Activity", href: "/activity", icon: "Activity" },
    ],
  },
  {
    items: [{ label: "Settings", href: "/settings", icon: "Settings" }],
  },
];
