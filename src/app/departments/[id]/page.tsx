import { departments } from "@/lib/org";
import { DepartmentDetail } from "./DepartmentDetail";

// Pre-render one static page per department for the export build.
export function generateStaticParams() {
  return departments.map((d) => ({ id: d.id }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DepartmentDetail id={id} />;
}
