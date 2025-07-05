import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '',
    },
];

const formSchema = z.object({
    taskTitle: z.string().min(1, 'Title is required'),
    taskDescription: z.string().min(1, 'Description is required'),
    schedFrom: z.date().optional(),
    schedTo: z.date().optional(),
});

interface ProjectId {
    projectId: string;
}

export default function AddTask({ projectId }: ProjectId) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskTitle: '',
            taskDescription: '',
            schedFrom: new Date(),
            schedTo: new Date(),
        },
    });
    const { handleSubmit } = form;

    const handleAddTask = async (data: z.infer<typeof formSchema>) => {
        const newData = { projectId: projectId, ...data };
        router.post('add-project-task', newData, {
            onSuccess: () => {
                toast.success('Succesfully added a task!');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Task" />
            <div className="h-full">
                <Form {...form}>
                    <form onSubmit={handleSubmit(handleAddTask)} className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex h-full w-full place-content-center">
                                <div className="flex w-lg flex-col place-content-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="taskTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Task Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="taskDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Task Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex w-full flex-row gap-4">
                                        <FormField
                                            control={form.control}
                                            name="schedFrom"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-auto flex-col">
                                                    <FormLabel>Task Start Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full pl-3 text-left font-normal',
                                                                        !field.value && 'text-muted-foreground',
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="schedTo"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-auto flex-col">
                                                    <FormLabel>Task Finished Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={'outline'}
                                                                    className={cn(
                                                                        'w-full pl-3 text-left font-normal',
                                                                        !field.value && 'text-muted-foreground',
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" size="lg">
                                    Clear
                                </Button>
                                <Button type="submit" size="lg" className="font-bold">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </AppLayout>
    );
}
