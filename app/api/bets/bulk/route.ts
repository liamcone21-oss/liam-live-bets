import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
const TOKEN=process.env.EXTENSION_BEARER_TOKEN;
export async function POST(req:NextRequest){ if(TOKEN){const auth=req.headers.get('authorization')||''; if(!auth.startsWith('Bearer ')||auth.slice(7)!==TOKEN){return NextResponse.json({error:'Unauthorized'},{status:401})}}
 const {bets}=await req.json(); if(!Array.isArray(bets)) return NextResponse.json({error:'Invalid payload'},{status:400});
 const created=await prisma.$transaction(bets.map((b:any)=>prisma.bet.create({data:{...b,placedAt:new Date(b.placedAt),oddsAmerican:Number(b.oddsAmerican),oddsDecimal:Number(b.oddsDecimal),stake:Number(b.stake),toWin:Number(b.toWin)}})));
 return NextResponse.json({count:created.length}); }
