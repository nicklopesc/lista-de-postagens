import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardPostagem from "./cardPostagem";
import NewPost from "./Modais/NewPost";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Card
        container
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#008F8C" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "400",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          Postagens
        </Typography>
      </Card>

      <Grid>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ marginTop: "30px" }}
          onClick={handleOpenModal}
        >
          <Typography variant="h6">Nova Postagem</Typography>
        </Button>
      </Grid>

      <Grid>
        <CardPostagem />
      </Grid>

      
      <NewPost isOpen={isModalOpen} onClose={handleCloseModal} ref={modalRef} />
    </Box>
  );
}

export default Home;
