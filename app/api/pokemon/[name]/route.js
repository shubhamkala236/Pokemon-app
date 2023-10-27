import { NextResponse } from "next/server";

//Get pokemons by name
export async function GET(req,{params})
{
    let name = params.name;

    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await res.json();
    return NextResponse.json(data);
}
