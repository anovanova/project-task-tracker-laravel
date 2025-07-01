import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: '',
    },
];

interface Task {
    task: {
        createdAt: Date;
        updatedAt: Date;
        name: string;
        project_id: string;
        status: string;
        description: string;
        uuid: string;
        schedule_from: Date;
        schedule_to: Date;
    };
}

export default function Tasks({ task }: Task) {
    const info = [
        {
            name: 'Title',
            value: task.name,
        },
        {
            name: 'Description',
            value: task.description,
        },
        {
            name: 'Status',
            value: task.status,
        },
        {
            name: 'Schedule From',
            value: new Date(task.schedule_from).toString(),
        },
        {
            name: 'Schedule To',
            value: new Date(task.schedule_to).toString(),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div>
                <div>
                    {info.map((item, index) => {
                        return (
                            <div key={index}>
                                <h2>{item.name}</h2>
                                <p className="mb-2 p-2 font-bold">{item.value}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
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
