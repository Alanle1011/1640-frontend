import React, { useEffect, useState } from "react"
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon, } from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { undefined } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/types"
import { ChevronLeftIcon, ChevronRightIcon, PenSquare, Plus, PlusCircle, XSquare } from "lucide-react"
import { toast } from "@/components/ui"

const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

export const columns: ColumnDef<User>[] = [
    // {
    //     accessorKey: "select",
    //     header: ({table}) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Selected all"
    //         />
    //     ),
    //     cell: ({row}) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Selected row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "imageId",
        header: "",
        cell: ({ row }) => (
            <div className="capitalize">
                <img className="h-8 w-8 rounded-full"
                    src={row.getValue("imageId") ? `${VITE_WEBSERVICE_URL}/image/${row.getValue("imageId")}` : "/assets/icons/profile-placeholder.svg"} />
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue("name")}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "faculty",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Faculty
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("faculty")}</div>
        ),
    },
    {
        accessorKey: "userRole",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User Role
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (

            <div className="capitalize">{row.getValue("userRole")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original

            const deleteUser = async (userId: string) => {
                if (!!user.id) {
                    try {
                        const response = await fetch(`${VITE_WEBSERVICE_URL}/user/delete/${userId}`, { method: "DELETE" });

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
                }

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
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy ID into clipboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                        >
                            <Link className={'flex justify-start w-full'} to={`/edit-user/${user.id}`}>
                                <PenSquare className="flex flex-row mr-2" />Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem*/}
                        {/*>*/}
                        {/*    <Link className={'flex justify-start w-full'} to={`/user-details/${user.id}`}>*/}
                        {/*        <View className="flex flex-row mr-2"/>Details*/}
                        {/*    </Link>*/}
                        {/*</DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => deleteUser(user.id)}
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

const AllUsers = () => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [userData, setUserData] = useState<User[]>()
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/user`, {
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
                setUserData(data);
            });
    }, []);
    console.log("userData", userData)

    const table = useReactTable({
        onStateChange(): void {
        },
        // @ts-ignore
        data: userData,
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
        // manualPagination: true,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })

    if (!userData) {
        return (
            <div className="w-full mx-2">
                <div className="flex flex-1 justify-end px-7 py-5">
                    <h1 className="h1-bold">List of Users</h1>
                </div>
                <div className="flex items-center py-4">

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
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-4">
            <div className="flex flex-1 justify-end px-7 py-5">
                <h1 className="h1-bold">List of Users</h1>
            </div>
            <div className="flex justify-between items-center gap-2 py-4">
                <Input
                    placeholder="Type to filter..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-1.5">
                    <Button
                        variant="outline"
                        className="ml-auto mr-2 button_green"
                        onClick={() => navigate("/create-user")}
                    >
                        <PlusCircle /> Add
                    </Button>
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
                                            }>
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
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
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}>
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
                                    className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2 mr-4">
                    <Button
                        variant="secondary"
                        className="bg-white"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        <ChevronLeftIcon />
                    </Button>

                    <Button
                        variant="secondary"
                        className="bg-white"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default AllUsers;
