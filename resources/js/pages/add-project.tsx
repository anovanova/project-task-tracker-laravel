import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input';
import { toast } from "sonner"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Project',
        href: '/add-project',
    },
];

const formSchema = z.object({
    projectTitle: z.string().min(1, 'Title is required'),
    projectDescription: z.string().min(1, 'Description is required'),
  })
export default function AddProject() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectTitle: '',
            projectDescription: '',
        },
      })
    const { handleSubmit } = form

    const handleAddProject = async (data: z.infer<typeof formSchema>) => {
        router.post('add-project', data, {
            onSuccess: () => {toast.success('Succesfully added a project!')},
          })
        console.log(data)
      }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Project" />
            <div className='h-full'>
                <Form {...form}>
                    <form onSubmit={handleSubmit(handleAddProject)} className='h-full'>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='w-full h-full flex place-content-center'>
                                <div className='w-lg flex flex-col place-content-center gap-4 '>
                                    <FormField  control={form.control}
                                    name="projectTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField  control={form.control}
                                    name="projectDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder='Description' {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </div>
                            </div>

                            <div className='flex justify-end gap-2'>
                                <Button type='button' variant='outline' size='lg'>Clear</Button>
                                <Button type='submit' size='lg' className='font-bold'>Submit</Button>
                            </div>
                        </div>

                    </form>
                </Form>
            </div>
        </AppLayout>
    );
}
