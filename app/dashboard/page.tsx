
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"

export default function Component() {
    redirect("/dashboard/mydrive");
}
