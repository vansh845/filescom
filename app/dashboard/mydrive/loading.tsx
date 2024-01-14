import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div >

            <div className="flex my-3 space-x-2">

                <Skeleton className="w-20 h-9" />

                <Skeleton className="w-20 h-9" />


            </div>
            <div className="space-y-2 px-3">
                <div className="flex space-x-2">
                    <Skeleton className="w-9 h-9" />
                    <Skeleton className="flex justify-between w-full h-9" />
                </div>


            </div>
        </div>
    )
}