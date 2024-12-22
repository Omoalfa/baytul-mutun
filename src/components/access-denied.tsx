import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { LockIcon } from "lucide-react"
import Link from "next/link"

interface AccessDeniedProps {
  title?: string
  message?: string
  redirectText?: string
  redirectUrl?: string
}

export function AccessDenied({
  title = "Access Denied",
  message = "You don't have permission to access this page.",
  redirectText = "Go to Homepage",
  redirectUrl = "/"
}: AccessDeniedProps) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <LockIcon className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">
            {user ? (
              <p>
                You are logged in as <span className="font-medium">{user.email}</span> but you need additional permissions to access this page.
              </p>
            ) : (
              <p>Please log in to access this page.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {user ? (
            <Link href={redirectUrl}>
              <Button variant="default">{redirectText}</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="default">Log In</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
