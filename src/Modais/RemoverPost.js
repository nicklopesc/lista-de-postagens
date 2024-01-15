import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Toolbar, Typography } from "@mui/material";
import { deletePostagem } from "../service/routes/apiPostagens";

export default function RemovePost({ isOpen, onClose, postId }) {
  const handleConfirmDelete = async () => {
    try {
      await deletePostagem(postId);
      // Adicione qualquer lógica adicional que você queira executar após a exclusão bem-sucedida
      console.log(`Post com ID ${postId} removido com sucesso.`);
      alert("Post excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
      // Adicione lógica de tratamento de erro, como exibir uma mensagem ao usuário
    } finally {
      onClose(); // Fecha o diálogo independentemente do resultado da exclusão
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        height={60}
        sx={{ backgroundColor: "red" }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ color: "white" }}>
            Excluir Post
          </Typography>
        </Toolbar>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginTop: "20px" }}>
          Atenção! Ao excluir esta postagem os comentários também serão
          excluídos.Tem certeza que deseja remover este post?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleConfirmDelete}>
          Confirmar
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          autoFocus
          sx={{ color: "red", borderColor: "red" }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
