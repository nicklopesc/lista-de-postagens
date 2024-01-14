import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Toolbar, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';


export default function RemovePost({ isOpen, onClose, postId }) {

  const handleConfirmDelete = async () => {
    console.log("ID", postId);
    // try {
    //   await deletePostagem(postId);
    //   // Adicione qualquer lógica adicional que você queira executar após a exclusão bem-sucedida
    //   console.log(`Post com ID ${postId} removido com sucesso.`);
    //   alert(`Post com ID ${postId} removido com sucesso.`)
    // } catch (error) {
    //   console.error('Erro ao excluir postagem:', error);
    //   // Adicione lógica de tratamento de erro, como exibir uma mensagem ao usuário
    // } finally {
    //   onClose(); // Fecha o diálogo independentemente do resultado da exclusão
    // }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" height={60} sx={{ backgroundColor: "red" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ color: "white" }}>
            Remover Post
          </Typography>
        </Toolbar>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1' sx={{ marginTop: "20px" }}>
          Atenção! Ao excluir esta postagem os comentários
          também serão excluídos.Tem certeza que deseja remover este post?
        </Typography>
      </DialogContent>
      <DialogActions>

        <Button variant='outlined' onClick={onClose} autoFocus>
          Cancelar
        </Button>
        <Button variant='outlined' onClick={handleConfirmDelete}>Excluir</Button>
      </DialogActions>
    </Dialog>
  );
}
