import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '',
    },
];

interface Task {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    project_id: string;
    status: string;
    uuid: string;
    schedule_from: Date;
    schedule_to: Date;
}
interface Tasks {
    tasks: [Task][];
}

export default function Tasks({ tasks }: Tasks) {
    console.log(tasks);
    const tasksElement = () =>
        tasks.map((item) => (
            <div className="flex flex-auto flex-col gap-1 rounded-md bg-zinc-100 p-4 shadow">
                {item.map((item) => (
                    <Link
                        key={item.uuid}
                        href={`/task/${item.uuid}`}
                        className="bg-primary text-primary-foreground flex gap-2 rounded-md p-4 px-8 font-bold"
                        prefetch
                    >
                        <p className="w-full text-center">{item.name}</p>
                    </Link>
                ))}
            </div>
        ));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            {tasks.length === 0 ? (
                <div className="grid h-full w-full place-content-center">
                    <h1 className="text-muted-foreground text-xl">No available tasks added</h1>
                </div>
            ) : (
                <div className="flex gap-3">{tasksElement()}</div>
            )}
            <div className="absolute right-4 bottom-4">
                <Link
                    href={`/project/${route().params.id}/add-task`}
                    className="bg-primary text-primary-foreground flex gap-2 rounded-md p-4 px-8 font-bold"
                    prefetch
                >
                    <Plus />
                    Add Task
                </Link>
            </div>
        </AppLayout>
    );
}
