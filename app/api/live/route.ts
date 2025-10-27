import { NextResponse } from 'next/server';
export async function GET(){const now=new Date().toISOString();return NextResponse.json([{id:'NFL-2025-NE-NYJ',league:'NFL',status:'Q3 07:12',home:{name:'Jets',score:17},away:{name:'Patriots',score:20},updatedAt:now}]);}
