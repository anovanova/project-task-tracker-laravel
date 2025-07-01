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

interface Tasks {
    tasks: {
        createdAt: Date;
        updatedAt: Date;
        name: string;
        project_id: string;
        status: string;
        uuid: string;
        schedule_from: Date;
        schedule_to: Date;
    }[];
}

export default function Tasks({ tasks }: Tasks) {
    const tasksElement = () => {
        return tasks.map((item) => (
            <Link href={`/task/${item.uuid}`} className="bg-primary text-primary-foreground flex gap-2 rounded-md p-4 px-8 font-bold" prefetch>
                {item.name}
            </Link>
        ));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            {tasks.length === 0 ? (
                <div className="grid h-full w-full place-content-center">
                    <h1 className="text-muted-foreground text-xl">No available tasks added</h1>
                </div>
            ) : (
                <div>{tasksElement()}</div>
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
