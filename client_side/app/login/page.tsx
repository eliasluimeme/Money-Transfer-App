import LoginForm from './login-form'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Image
            src="/onbanklogo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}