"use client";
import { use,useState, useEffect} from "react";
import {
  Typography,
  LinearProgress,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";

interface Pokemon {
  name: string;
  height: number;
  weight: number;

  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];

  types: {
    type: {
      name: string;
    };
  }[];

  cries: {
    latest: string;
  };

  species: {
    url: string;
  };
}

interface Evolution {
  name: string;
  image: string;
}

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ pokemonname: string }>;
}) {

  const { pokemonname } = use(params);

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [evolutions, setEvolutions] = useState<Evolution[]>([]);

useEffect(() => {
  async function fetchPokemonData() {
    // ดึงข้อมูลโปเกม่อน
    const pokemonData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonname}`
    ).then((res) => res.json());

    setPokemon(pokemonData);

    // ดึง Species
    const speciesData = await fetch(
      pokemonData.species.url
    ).then((res) => res.json());

    // ดึง Evolution Chain
    const evolutionData = await fetch(
      speciesData.evolution_chain.url
    ).then((res) => res.json());

    const evolutionList: Evolution[] = [];

    let current = evolutionData.chain;

    while (current) {
      // ดึงข้อมูลของโปเกม่อนแต่ละตัวในสายวิวัฒนาการ
      const evoPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${current.species.name}`
      ).then((res) => res.json());

      evolutionList.push({
        name: current.species.name,
        image:
          evoPokemon.sprites.other["official-artwork"].front_default,
      });

      if (current.evolves_to.length > 0) {
        current = current.evolves_to[0];
      } else {
        current = null;
      }
    }

    setEvolutions(evolutionList);
  }

  fetchPokemonData();
}, [pokemonname]);

  if (!pokemon) {
    return <h1>Loading...</h1>;
  }
 return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#8bbdef", // สีน้ำเงิน
      py: 5,
    }}
  >
  <Card
    sx={{
      maxWidth: 700,
      mx: "auto",
      mt: 5,
      p: 3,
      borderRadius: 4,
      boxShadow: 5,
    }}
  >
    <CardContent>
    <Box
   sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
  }}
>
        {/* ชื่อ */}
        <Typography variant="h3" gutterBottom>
          {pokemon.name.toUpperCase()}
        </Typography>

        {/* รูป */}
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={250}
        />

        {/* Height / Weight */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            mt: 2,
            mb: 2,
          }}
        >
          <Typography>Height : {pokemon.height}</Typography>
          <Typography>Weight : {pokemon.weight}</Typography>
        </Box>

        <Divider sx={{ width: "100%", my: 2 }} />

        {/* Type */}
        <Typography variant="h5" gutterBottom>
          Type
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          {pokemon.types.map((type) => (
            <Chip
              key={type.type.name}
              label={type.type.name}
              color="success"
            />
          ))}
        </Box>

        <Divider sx={{ width: "100%", my: 2 }} />

        {/* Status */}
        <Typography variant="h5" gutterBottom>
          Status
        </Typography>

        <Box sx={{ width: 450 }}>
          {pokemon.stats.map((stat) => (
            <Box key={stat.stat.name} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography>
                  {stat.stat.name.toUpperCase()}
                </Typography>

                <Typography>{stat.base_stat}</Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={(stat.base_stat / 255) * 100}
                sx={{
                  height: 10,
                  borderRadius: 5,
                }}
              />
            </Box>
          ))}
        </Box>

        <Divider sx={{ width: "100%", my: 2 }} />

        {/* เสียง */}
        <Typography variant="h5" gutterBottom>
          Pokemon Cry
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            new Audio(pokemon.cries.latest).play();
          }}
        >
          ▶ Play Sound
        </Button>

        <Divider sx={{ width: "100%", my: 3 }} />

        {/* Evolution */}
        <Typography variant="h5" gutterBottom>
          Evolution
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {evolutions.map((evo, index) => (
            <Box
              key={evo.name}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
              sx={{
              textAlign: "center",
            }}
            >
                <img
                  src={evo.image}
                  alt={evo.name}
                  width={110}
                />

                <Typography>
                  {evo.name}
                </Typography>
              </Box>

              {index < evolutions.length - 1 && (
                <Typography
                  variant="h4"
                  sx={{ mx: 2 }}
                >
                  ➜
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </CardContent>
  </Card>
  </Box>
);
}