
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '',
    },
];

interface Tasks {
    tasks: {
        createdAt: Date,
        updatedAt: Date,
        name: string,
        project_id: string,
        status: string
        uuid: string,
        schedule_from: Date,
        schedule_to: Date
    }[]
}

export default function Tasks({tasks}: Tasks) {
    console.log(tasks)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            {
                tasks.length === 0 ? <div className='h-full w-full grid place-content-center'><h1 className='text-xl text-muted-foreground'>No available tasks added</h1></div> : <div></div>
            }
            <div className='absolute bottom-4 right-4'>
                <Link href={`/project/${route().params.id}/add-task`} className='font-bold flex gap-2 bg-primary p-4 px-8 text-primary-foreground rounded-md' prefetch>
                    <Plus/>
                    Add Task
                </Link>
            </div>

        </AppLayout>
    );
}
