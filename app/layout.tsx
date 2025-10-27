import "./globals.css"; import { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body className="min-h-screen"><div className="mx-auto max-w-5xl p-4">
    <header className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">BetTracker</h1>
    <nav className="flex gap-4 text-sm"><a href="/" className="hover:underline">Dashboard</a><a href="/bets" className="hover:underline">Bets</a><a href="/live" className="hover:underline">Live</a><a href="/import" className="hover:underline">Import</a></nav></header>{children}</div></body></html>); }