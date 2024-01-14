import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { createPostagem, getPostagens } from '../service/routes/apiPostagens';
import { v4 as uuidv4 } from 'uuid';
import {
  Toolbar,
  Typography,
  TextField,
  Grid
} from "@mui/material";

export default function NewPost({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [isTitleExists, setIsTitleExists] = useState(false);

  const handleCreatePostagem = async () => {
    console.log("Acionado");
    try {
      // Verificar se já existe um post com o mesmo título
      const existingPosts = await getPostagens();
      const postWithTitleExists = existingPosts.some(post => post.title === title);

      if (postWithTitleExists) {
        setIsTitleExists(true);
        return;
      }

      // Se não houver um post com o mesmo título, criar o novo post
      const newPostData = {
        id: parseInt(uuidv4().replace(/-/g, ''), 16),
        title,
        body,
        userId: parseInt(uuidv4().replace(/-/g, ''), 16),
      };

      const createdPost = await createPostagem(newPostData);
      console.log("Dados:", createdPost);
      alert("Dados Enviados!");
      onClose();
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  const handleClose = () => {
    setIsTitleExists(false);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" height={50} sx={{ backgroundColor: "#023535" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ color: "#BFBFBF" }}>
            Cadastrar Nova Postagem
          </Typography>
        </Toolbar>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1' sx={{ marginTop: "20px" }}>
          Para realizar uma nova postagem, é necessário preencher os campos abaixo.
        </Typography>
        <Grid container sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <TextField
            required
            id="outlined-required"
            label="Título"
            sx={{ flex: 1, marginRight: '10px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={isTitleExists}
            helperText={isTitleExists ? 'Já existe um post com este título.' : ''}
          />
          <TextField
            required
            id="outlined-required"
            label="Descrição"
            sx={{ flex: 1 }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleCreatePostagem} disabled={!title || !body}>
          Confirmar
        </Button>
        <Button variant='outlined' onClick={handleClose} autoFocus sx={{ color: "red", borderColor: "red" }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
