"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2, CheckCircle2 } from "lucide-react"
import { ShineBorder } from "@/components/ui/shine-border"


interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(false)

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Failed to send message")

            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
            }, 2000)
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop with strong blur effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] shadow-2xl"
                    >
                        <ShineBorder 
                            className="pointer-events-none" 
                            shineColor={["#6366f1", "#60496e", "#71C4FF"]} 
                        />
                        {/* Header */}
                        <div className="relative flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/50 px-6 py-5">
                            <h2 className="text-xl font-bold text-black dark:text-white">Get in Touch</h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Form Area */}
                        <div className="relative p-6 sm:p-8">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-10 text-center"
                                >
                                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500">
                                        <CheckCircle2 className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white">Message Sent!</h3>
                                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">I'll get back to you as soon as possible.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-800/50 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-800/50 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={4}
                                                className="w-full resize-none rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-800/50 transition-all"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="text-sm font-medium text-red-500 dark:text-red-400">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black dark:bg-white px-4 py-3.5 font-medium text-white dark:text-black transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 shadow-md"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}