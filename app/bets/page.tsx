"use client";
import useSWR from "swr"; import { useState } from "react";
const fetcher=(u:string)=>fetch(u).then(r=>r.json());
export default function BetsPage(){ const {data,mutate}=useSWR("/api/bets",fetcher);
const [form,setForm]=useState({book:"DraftKings",sport:"Football",league:"NFL",eventId:"NFL-2025-NE-NYJ",eventName:"Patriots @ Jets",market:"Spread",selection:"Patriots -2.5",oddsAmerican:-110,oddsDecimal:1.91,stake:55,toWin:50,placedAt:new Date().toISOString(),notes:""});
async function addBet(e:React.FormEvent){e.preventDefault();await fetch("/api/bets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});await mutate();}
return(<main className="grid gap-6 md:grid-cols-2"><section className="rounded-2xl bg-white p-4 shadow"><h2 className="mb-2 text-lg font-semibold">Add Bet</h2>
<form onSubmit={addBet} className="grid gap-2"><input className="rounded border p-2" placeholder="Book" value={form.book} onChange={e=>setForm({...form,book:e.target.value})}/>
<input className="rounded border p-2" placeholder="Sport" value={form.sport} onChange={e=>setForm({...form,sport:e.target.value})}/>
<input className="rounded border p-2" placeholder="League" value={form.league} onChange={e=>setForm({...form,league:e.target.value})}/>
<input className="rounded border p-2" placeholder="Event Name" value={form.eventName} onChange={e=>setForm({...form,eventName:e.target.value})}/>
<div className="grid grid-cols-2 gap-2"><input className="rounded border p-2" placeholder="Market" value={form.market} onChange={e=>setForm({...form,market:e.target.value})}/>
<input className="rounded border p-2" placeholder="Selection" value={form.selection} onChange={e=>setForm({...form,selection:e.target.value})}/></div>
<div className="grid grid-cols-3 gap-2"><input type="number" className="rounded border p-2" placeholder="Odds (US)" value={form.oddsAmerican} onChange={e=>setForm({...form,oddsAmerican:+e.target.value})}/>
<input type="number" step="0.01" className="rounded border p-2" placeholder="Odds (Dec)" value={form.oddsDecimal} onChange={e=>setForm({...form,oddsDecimal:+e.target.value})}/>
<input type="datetime-local" className="rounded border p-2" value={form.placedAt.slice(0,16)} onChange={e=>setForm({...form,placedAt:new Date(e.target.value).toISOString()})}/></div>
<div className="grid grid-cols-2 gap-2"><input type="number" step="0.01" className="rounded border p-2" placeholder="Stake" value={form.stake} onChange={e=>setForm({...form,stake:+e.target.value})}/>
<input type="number" step="0.01" className="rounded border p-2" placeholder="To Win" value={form.toWin} onChange={e=>setForm({...form,toWin:+e.target.value})}/></div>
<textarea className="rounded border p-2" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
<button className="rounded bg-black px-4 py-2 text-white">Save Bet</button></form></section>
<section className="rounded-2xl bg-white p-4 shadow"><h2 className="mb-2 text-lg font-semibold">All Bets</h2><div className="overflow-x-auto">
<table className="w-full text-sm"><thead><tr className="text-left"><th className="p-2">Date</th><th className="p-2">Book</th><th className="p-2">Event</th><th className="p-2">Pick</th><th className="p-2">Odds</th><th className="p-2">Stake</th><th className="p-2">To Win</th><th className="p-2">Status</th></tr></thead>
<tbody>{data?.map((b:any)=>(<tr key={b.id} className="border-t"><td className="p-2">{new Date(b.placedAt).toLocaleString()}</td><td className="p-2">{b.book}</td><td className="p-2">{b.eventName}</td><td className="p-2">{b.selection}</td><td className="p-2">{b.oddsAmerican}</td><td className="p-2">${"{"}b.stake.toFixed(2){"}"}</td><td className="p-2">${"{"}b.toWin.toFixed(2){"}"}</td><td className="p-2">{b.status}</td></tr>))}</tbody></table></div></section></main>)}