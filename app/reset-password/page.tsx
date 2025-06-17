import { Suspense } from "react"
import ResetPasswordClient from "./ResetPasswordClient"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <ResetPasswordClient />
    </Suspense>
  )
}
