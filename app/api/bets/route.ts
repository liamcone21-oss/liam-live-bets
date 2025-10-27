import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma=new PrismaClient();
const BetSchema=z.object({book:z.string(),sport:z.string(),league:z.string(),eventId:z.string(),eventName:z.string(),market:z.string(),selection:z.string(),oddsAmerican:z.number().int(),oddsDecimal:z.number(),stake:z.number(),toWin:z.number(),placedAt:z.string().datetime(),notes:z.string().optional()});
export async function GET(){const bets=await prisma.bet.findMany({orderBy:{placedAt:'desc'}});return NextResponse.json(bets)}
export async function POST(req:NextRequest){const data=await req.json();const parsed=BetSchema.safeParse(data);if(!parsed.success){return NextResponse.json({error:parsed.error.flatten()},{status:400})}const bet=await prisma.bet.create({data:{...parsed.data,placedAt:new Date(parsed.data.placedAt)}});return NextResponse.json(bet,{status:201})}
