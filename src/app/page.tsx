"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  Grid,
  CardActions,
  CardActionArea,
} from "@mui/material";

interface PokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: { name: string; url: string }[];
}

export default function Home() {
  //ประกาศ state สำหรับเก็บข้อมูล Pokemon
  const [pokemonData, setPokemonData] = useState<PokemonResponse | null>(null);
  //ฟังชั่นเมื่อมีการเปลี่ยนแปลงตัวแปร state ที่กำหนด
  useEffect(() => {
    //เรียกใช้งาน API ของ Pokemon
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1351")
      .then((response) => response.json())
      .then((data) => {
        //เมื่อได้ข้อมูลจาก API ให้เก็บข้อมูลลงใน state
        setPokemonData(data);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h1">Pokemon App</Typography>
      {/* ตรวจสอบว่า pokemonData มีค่าหรือไม่ ถ้ามีให้แสดงรายการ Pokemon */}
      {pokemonData && (
        <Grid container spacing={2}>
          {/* ทำซ้ำ Loop แสดงรายการ Pokemon โดยใช้ map function เพื่อสร้าง <li> สำหรับแต่ละ Pokemon */}
          {pokemonData.results.map((pokemon) => {
            //ดึง ID ของ Pokemon จาก URL ของ API
            //https://pokeapi.co/api/v2/pokemon/1/
            const pokemonId = pokemon.url.split("/")[6];
            return (
              <Grid size={{ xs: 12, sm: 3 }} key={pokemon.name}>
                <Card key={pokemon.name} sx={{ my: 1 }}>
                  <CardActionArea href={`/pokemon/${pokemon.name}`}>
                    <CardContent>
                      <Avatar
                        alt={pokemon.name}
                        sx={{ width: 64, height: 64 }}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                      />
                      <Typography variant="h6">{pokemon.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
