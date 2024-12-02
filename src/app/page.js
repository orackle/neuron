'use client'
import {useUser, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to My App</h1>
        <p className="text-xl">Please sign in to get started.</p>

        <SignedIn>
          <Link href="/dashboard" className="px-6 py-3 bg-blue-600 rounded-lg">Go to Dashboard
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 rounded-lg">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
