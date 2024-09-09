import SignupForm from './signup-form'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Image
            src="/onbanklogo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join us and start transferring money securely
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}