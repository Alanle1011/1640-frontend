import { string, undefined } from "zod";

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { Label } from "@radix-ui/react-label";
import { PenSquare, View, XSquare } from "lucide-react";
import { CaretSortIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"

import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

import { toast } from "@/components/ui";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Contribution } from "@/types";
import { EditContribution } from ".";

export const columns: ColumnDef<Contribution>[] = [
    {
        accessorKey: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Selected all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Selected row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "uploadedUserId",
        header: "User ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("uploadedUserId")}</div>
        ),
    },
    {
        accessorKey: "uploadedUserName",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("uploadedUserName")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="."
                    className="flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <CaretSortIcon className="sort-icon" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
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
        accessorKey: "submissionPeriod",
        header: "Submission Period",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("submissionPeriod")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Uploaded Date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("createdAt")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const contribution = row.original

            const editContribution = (contributionId: string) => {
                window.open(`/admin/contribution-edit/${contributionId}`
                    // , "_blank"
                );
            };

            const viewContribution = (contributionId: string) => {
                window.open(`/admin/contribution-details/${contributionId}`
                    // , "_blank"
                );
            };

            const deleteContribution = async (contributionId: string) => {
                if (!!contribution.id) {
                    try {
                        const response = await fetch(`${VITE_WEBSERVICE_URL}/contribution/delete/${contributionId}`, { method: "DELETE" });

                        if (!response.ok) {
                            throw new Error(`Failed to delete item: ${response.statusText}`);
                        }

                        toast({ title: "Deleted successfully!" });
                        window.location.reload();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return toast({ title: "Failed to delete! Please try again.", });
                };
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(contribution.id)}
                        >
                            Copy ID into clipboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => editContribution(contribution.id)}
                        >
                            {/* <Link to={`/admin/contribution-edit/${contribution.id}`}> */}
                            <PenSquare className="flex flex-row mr-2" />Edit
                            {/* </Link> */}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => viewContribution(contribution.id)}
                        >
                            {/* <Link to={`/admin/contribution-details/${contribution.id}`}> */}
                            <View className="mr-2" />View
                            {/* </Link> */}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => deleteContribution(contribution.id)}
                        >
                            <XSquare className="mr-2" />Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL;

const ContributionsList = () => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [contributionData, setContributionData] = useState<Contribution[]>()
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [contributions, setContributions] = useState<Contribution[]>([]);

    const [loading, setLoading] = useState(false)

    // const editContribution = (contribution.id = string)=>{

    // };

    useEffect(() => {
        setLoading(true);
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
        setLoading(false);
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

    if (loading) {
        <div className="w-full h-full flex justify-center items-center">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }

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
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto mr-4">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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