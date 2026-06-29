"use client";
import { use } from "react";

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ pokemonname: string }>;
}) {
  // ดึงค่าพารามิเตอร์ pokemonname จาก URL
  const { pokemonname } = use(params);
  return (
    <div>
      <h1>{pokemonname}</h1>
    </div>
  );
}
