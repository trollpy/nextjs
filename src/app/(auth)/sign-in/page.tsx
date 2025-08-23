import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back to TaskManager Pro
          </p>
        </div>
        <SignIn 
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white dark:bg-gray-800 shadow-xl rounded-2xl",
              headerTitle: "text-gray-900 dark:text-white",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              socialButtonsBlockButton: "border-gray-300 dark:border-gray-600",
              socialButtonsBlockButtonText: "text-gray-700 dark:text-gray-300",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              footerActionText: "text-gray-600 dark:text-gray-400",
              footerActionLink: "text-blue-600 hover:text-blue-700 dark:text-blue-400",
            },
          }}
        />
      </div>
    </div>
  );
}