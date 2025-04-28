import { CheckCheckIcon } from 'lucide-react'

export default function AppLogo() {
    return (
        <>
            <div className="bg-cyan-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <CheckCheckIcon/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Project Task Tracker</span>
            </div>
        </>
    );
}
