import React from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { undefined } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon, PenSquare, PlusCircle, XSquare } from "lucide-react";
import { toast } from "@/components/ui";

const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      const deleteUser = async (userId: string) => {
        if (!!user.id) {
          try {
            const response = await fetch(
              `${VITE_WEBSERVICE_URL}/user/delete/${userId}`,
              { method: "DELETE" },
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
            <DropdownMenuItem>
              <Link
                className={"flex justify-start w-full"}
                to={`/edit-user/${user.id}`}>
                <PenSquare className="flex flex-row mr-2" />
                Edit
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
            <DropdownMenuItem onClick={() => deleteUser(user.id)}>
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

const FalcultyList = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const navigate = useNavigate();


  const table = useReactTable({
    onStateChange(): void {
    },
    // @ts-ignore
    data: [{
      id: "1",
      name: "Digital Marketing",

    },
      {
        id: "2",
        name: "Business Administration",

      },
      {
        id: "3",
        name: "Graphic Design",

      },
      {
        id: "3",
        name: "Computer Science",
      },
    ],
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
    },
  });

  return (
    <div className="w-full mx-4">
      <div className="flex flex-1 justify-end px-7 py-5">
        <h1 className="h1-bold">List of Faculties</h1>
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
            onClick={() => navigate("/create-faculties")}>
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
      <div className="rounded-md border mr-4 overflow-auto h-[65vh]">
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
                          header.getContext(),
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
                        cell.getContext(),
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
export default FalcultyList;
