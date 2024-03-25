import { undefined } from "zod";
import React, { useState, useEffect } from "react"

import {
    CaretSortIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    //DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    //DropdownMenuItem,
    //DropdownMenuLabel,
    //DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Contribution = {
    id: string,
    uploadedUserId: string,
    title: string,
    content: string,
    imageId: string,
    documentId: string,
    submissionPeriodId: string,
}

export const columns: ColumnDef<Contribution>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "uploadedUserId",
        header: "Uploaded UserID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("uploadedUserId")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("content")}</div>
        ),
    },
    {
        accessorKey: "imageId",
        header: "Image ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("imageId")}</div>
        ),
    },
    {
        accessorKey: "documentId",
        header: "Document ID",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("documentId")}</div>
        ),
    },
    {
        accessorKey: "submissionPeriodId",
        header: "Submission Period ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("submissionPeriodId")}</div>
        ),
    },

    //{
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original
    //
    //     return (
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="h-8 w-8 p-0">
    //               <span className="sr-only">Open menu</span>
    //               <DotsHorizontalIcon className="h-4 w-4" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //             <DropdownMenuItem
    //                 onClick={() => navigator.clipboard.writeText(payment.id)}
    //             >
    //               Copy payment ID
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem>View customer</DropdownMenuItem>
    //             <DropdownMenuItem>View payment details</DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //     )
    //   },
    // },
]

const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL;

const ContributionsList = () => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [contributionData, setContributionData] = useState<Contribution[]>()
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/contribution`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setContributionData(data);
            });
    }, []);
    console.log("contributionData", contributionData)

    const table = useReactTable({
        onStateChange(): void {
        },
        // @ts-ignore
        data: contributionData,
        renderFallbackValue: undefined,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })

    if (!contributionData) {
        return (<div>
            No Data found.
        </div>)
    }

    return (
        <div className="w-full">
            <div className="flex flex-1 justify-end px-7 py-5">
                <h1 className="h1-bold">
                    List of Contributions
                </h1>
            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Type to filter..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-dark-1"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto mr-4 text-white bg-dark-1">
                            Columns <ChevronDownIcon className="dropdown-button" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border mr-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2 pr-4">
                    <Button
                        variant="secondary"
                        className="bg-light-1"
                        size="rounded"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon />
                    </Button>

                    <Button
                        variant="secondary"
                        className="bg-white"
                        size="rounded"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
};
export default ContributionsList;
