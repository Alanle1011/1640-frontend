import { Contribution, columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<Contribution[]> {
    return [
        {
            id: "",
            title: "Example of Contribution",
            faculty: "Computing",
        },
    ]
}

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
