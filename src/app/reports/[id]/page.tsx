import { reports } from "@/lib/reports";
import { ReportView } from "./ReportView";

// Pre-render one static page per report for the export build.
export function generateStaticParams() {
  return reports.map((r) => ({ id: r.id }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReportView id={id} />;
}
