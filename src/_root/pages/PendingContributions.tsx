import { undefined } from "zod";

import {
  CaretSortIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { PenSquare, View, XSquare } from "lucide-react";
import React, { useEffect, useState } from "react";

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
} from "@tanstack/react-table";

import { toast } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Contribution, ILoginUser } from "@/types";
import { Link, useNavigate } from "react-router-dom";

export const columns: ColumnDef<Contribution>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
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
          variant="outline"
          className="flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <CaretSortIcon className="sort-icon" />
        </Button>
      );
    },
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
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("imageId") ? row.getValue("imageId") : "-"}
      </div>
    ),
  },
  {
    accessorKey: "documentId",
    header: "Document",
    cell: ({ row }) => (
      <div className="lowercase flex-1">
        {row.getValue("documentId") ? row.getValue("documentId") : "-"}
      </div>
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const contribution = row.original;

      const deleteContribution = async (contributionId: string) => {
        if (!!contribution.id) {
          try {
            const response = await fetch(
              `${VITE_WEBSERVICE_URL}/contribution/delete/${contributionId}`,
              { method: "DELETE" }
            );

            if (!response.ok) {
              throw new Error(`Failed to delete item: ${response.statusText}`);
            }

            toast({ title: "Deleted successfully!" });
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        } else {
          return toast({ title: "Failed to delete! Please try again." });
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
              onClick={() => navigator.clipboard.writeText(contribution.id)}>
              Copy ID into clipboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={"w-full"}>
              <Link
                className={"flex justify-start w-full"}
                to={`/contribution-edit/${contribution.id}`}>
                <PenSquare className="flex flex-row mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className={"flex justify-start w-full"}
                to={`/contribution-details/${contribution.id}`}>
                <View className="mr-2" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteContribution(contribution.id)}>
              <XSquare className="mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL;

const PendingContribution = () => {
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [contributionData, setContributionData] = useState<Contribution[]>();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [userData, setUserData] = useState<ILoginUser>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("userData")) || null
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") || '""');
    if (data) {
      setUserData(data);
    }
  }, []);

  useEffect(() => {
    // if (userData.role === "COORDINATOR") {
    fetch(
      `${VITE_WEBSERVICE_URL}/contribution/coordinator/${userData.userId}/pending`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setContributionData(data);
      });
    // } else {
    //     fetch(`${VITE_WEBSERVICE_URL}/contribution`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "ngrok-skip-browser-warning": "69420",
    //         }
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             setContributionData(data);
    //         });
    // }
  }, []);
  console.log("contributionData", contributionData);

  const table = useReactTable({
    onStateChange(): void {},
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
    },
  });

  if (!contributionData) {
    return (
      <div className="w-full ml-4">
        <div className="flex flex-1 justify-end px-7 py-5">
          <h1 className="h1-bold">List of Pending Contributions</h1>
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2 mr-4">
            <Button variant="secondary" className="bg-white" disabled>
              <ChevronLeftIcon />
            </Button>

            <Button variant="secondary" className="bg-white" disabled>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ml-4">
      <div className="flex flex-1 justify-end px-7 py-5">
        <h1 className="h1-bold">List of Pending Contributions</h1>
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
          <Button
            variant="outline"
            className="ml-auto mr-4 bg-blue-500 text-light-2"
            onClick={() => navigate("/contributions")}>
            All
          </Button>
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
        {/* <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div> */}
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
export default PendingContribution;
