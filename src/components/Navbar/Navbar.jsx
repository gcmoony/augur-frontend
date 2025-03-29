import { Box, Link, Grid, Container } from "@mui/material"

export default function Navbar() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <h1>Augur</h1>
      <nav style={{ display: "flex", gap: "1em" }}>
        <Link href='#'>Dashboard</Link>
        <Link href='#'>Invoices</Link>
        <Link href='#'>Messages</Link>
      </nav>
    </Container>
  )
}
