import { ColumnDef } from "@tanstack/react-table";

export type Contribution = {
    id: string;
    title: string;
    faculty: "Computing" | "Business Administration" | "Graphic Design";
}

export const columns: ColumnDef<Contribution>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "faculty",
        header: "Faculty",
    },
]
