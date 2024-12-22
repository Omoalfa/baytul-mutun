import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
  action?: {
    icon?: LucideIcon
    label: string
    href: string
  }
}

export function PageHeader({
  heading,
  text,
  children,
  action,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
          {text && <p className="text-lg text-muted-foreground">{text}</p>}
        </div>
        {action && (
          <Button asChild>
            <Link href={action.href}>
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </Link>
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
