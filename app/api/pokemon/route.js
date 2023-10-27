import { NextResponse } from "next/server";

//Get all pokemons
export async function GET()
{
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=130`);
    let data = await res.json();
    return NextResponse.json(data.results)
}
