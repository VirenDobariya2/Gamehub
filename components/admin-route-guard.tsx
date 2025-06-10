  "use client"

  import { useEffect } from "react"
  import { useRouter } from "next/navigation"
  import { useAuth } from "@/contexts/auth-context"

  /**
   * @typedef {Object} AdminRouteGuardProps
   * @property {React.ReactNode} children
   */

  /**
   * @param {AdminRouteGuardProps} props
   */
  export function AdminRouteGuard({ children }) {
    const { user, isAdmin, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && (!user || !isAdmin)) {
        router.push("/login")
      }
    }, [user, isAdmin, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    }

    if (!user || !isAdmin) {
      return null
    }

    return <>{children}</>
  }
