import { NextResponse } from "next/server";
export function GET() { return NextResponse.json([{ id: "architecture", title: "Feature-based", description: "Keep code close to the feature that owns it." }, { id: "data", title: "Query-ready", description: "Use TanStack Query hooks for remote state." }]); }
