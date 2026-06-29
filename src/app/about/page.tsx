"use client";

import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  Link,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #cea9ff)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}
        >
          {/* 👇 รูปโปรไฟล์ */}
          <Avatar
            src="/prof.JPG" 
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              border: "4px solid #fff",
            }}
          />

          <CardContent>
            {/* 🛠️ แก้ไขตรงนี้: ย้าย fontWeight เข้ามาอยู่ใน sx */}
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              About This Project
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Pokemon Web Application (Pokedex UI)
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2} sx={{ textAlign: "left" }}>
              <Typography>
                <b>ผู้พัฒนา:</b> Narissara Martsud
              </Typography>

              <Typography>
                <b>รายวิชา:</b> IN403101 Front-end Web Programming
              </Typography>

              <Typography>
                <b>หลักสูตร:</b> Computer Science
              </Typography>

              <Typography>
                <b>มหาวิทยาลัย:</b> Khon Kaen University
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* 🔗 GitHub */}
            <Link
              href="https://github.com/narishchi/pokemon-app.git"
              target="_blank"
              sx={{
                display: "inline-block",
                mt: 1,
                fontWeight: "bold",
              }}
            >
              🔗 View Source Code on GitHub
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}