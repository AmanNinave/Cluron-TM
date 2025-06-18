'use client';

import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { motion } from "framer-motion";

interface LandingPageProps {
  isLoggedIn: boolean | null;
}

export default function LandingPage({ isLoggedIn }: LandingPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Personal
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-2"
        >
          <span className="text-blue-600">Productivity</span> Command Center
        </motion.p>
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Streamline your workflow, manage your time effectively, and take control of your finances - all in one powerful platform.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex items-center justify-center gap-6 mt-12"
      >
        {isLoggedIn ? (
          <Button asChild size="lg" className="px-8 py-6 text-lg">
            <Link href="/workspace">Go to Workspace</Link>
          </Button>
        ) : (
          <>
            <Button size="lg" className="px-8 py-6 text-lg">
              <RegisterLink>Get Started</RegisterLink>
            </Button>

            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <LoginLink>Sign in</LoginLink>
            </Button>
          </>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-3">Time Management</h3>
          <p className="text-gray-600">Optimize your schedule and boost your productivity with smart time tracking.</p>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-3">Finance Tracking</h3>
          <p className="text-gray-600">Keep your finances organized and make informed decisions with real-time insights.</p>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-3">Personal Utility</h3>
          <p className="text-gray-600">All your essential tools in one place, designed to make your life easier.</p>
        </div>
      </motion.div>
    </motion.div>
  );
} 