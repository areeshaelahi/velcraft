"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/account");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2
            className="text-3xl tracking-[0.1em] uppercase mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Welcome Back
          </h2>
          <p className="text-sm text-[var(--foreground-secondary)]">
            Sign in to access your saved customizations and orders.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="glass p-8 sm:rounded-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="p-3 text-sm text-[var(--color-velcraft-error)] bg-[var(--color-velcraft-error)]/10 border border-[var(--color-velcraft-error)]/20 rounded-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wider text-[var(--foreground-secondary)] mb-2"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wider text-[var(--foreground-secondary)] mb-2"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-sm text-sm focus:outline-none focus:border-[var(--color-velcraft-gold)] transition-colors"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-[var(--color-velcraft-error)]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs">
                <Link
                  href="/forgot-password"
                  className="text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-[var(--foreground-secondary)]">
              New to {BRAND.name}?{" "}
            </span>
            <Link
              href="/register"
              className="font-medium text-[var(--color-velcraft-gold)] hover:text-[var(--color-velcraft-gold-light)] transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
