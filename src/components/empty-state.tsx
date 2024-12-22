import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionLink?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
}: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-3">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {actionLabel && actionLink && (
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href={actionLink}>{actionLabel}</Link>
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
