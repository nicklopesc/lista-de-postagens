import  React, {useEffect, useState, useRef } from "react";
import {
  
  Accordion,
  TextField,
  Grid,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
  Divider,
  ListItem,
  
  ListItemIcon,
  ListItemText,
  Paper,
 
  IconButton,
  Toolbar,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CancelIcon from "@mui/icons-material/Cancel";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { getPostagens, createComentarios } from "./service/routes/apiPostagens"
import RemovePost from './Modais/RemovePost';


export default function CardPostagem() {
 
  const [expanded, setExpanded] = React.useState([]);
  const [postagens, setPostagens] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [commentbody, setCommentBody] = useState('');
  const modalRef = useRef();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => {
      const newExpansionState = { ...prevExpanded };
      newExpansionState[panel] = newExpanded;
      return newExpansionState;
    });
  };
  
  const handleCommentChange = (event) => {
    setCommentBody(event.target.value);
  };

  const handleSendClick = async (postId, postTitle) => {
    try {
      console.log('Enviar comentário:', commentbody, postId, postTitle);
  
      const newComments = {
        postId,
        postTitle,
        body: commentbody,
      };
  
      const createdCommentPost = await createComentarios(newComments);
      console.log("Dados:", newComments);
      console.log("Dados Ev:", createdCommentPost);

      // Atualizar a lista local de postagens
    setPostagens((prevPostagens) => [...prevPostagens, createdCommentPost])

      alert("Dados Enviados!");
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPostagens();
        console.log("Dados da API:", result); 
        setPostagens(result);
      } catch (error) {
        console.log("Erro na solicitação à API:", error);
      }
    };

    fetchData();
  }, []);

  // Dados mockados
  const mockedData = [
    // { title: "Natureza", id:"2", body: "Lorem Ipsum is simply dummy textillum quis cupiditate provident sit magnam ea sed aut omnis", user: "user3",userId: "3", comments: "Lorem Ipsum is simply dummy text..." },
    // { title: "Água", id:"4", body: "Lorem Ipsum is simply dummy textillum quis cupiditate provident sit magnam ea sed aut omnis", user: "user1",userId: "1", comments: "Lorem Ipsum is simply dummy text..." },
    
  ];

  // Combina os dados mockados com os dados da API
  const combinedData = [...mockedData, ...postagens];

  /// Classifica a matriz combinada em ordem alfabética pela propriedade title
const sortedData = combinedData.slice().sort((a, b) => {
  const titleA = a.title || ''; // Se a.title for undefined, assume uma string vazia
  const titleB = b.title || ''; // Se b.title for undefined, assume uma string vazia

  return titleA.localeCompare(titleB);
});



  
  return (
    <Grid container spacing={2}>
    {sortedData.map((item, index) => (
       <Grid Grid item key={item.id} xs={12} md={6}>
          
           <React.Fragment >
                <Paper elevation={0} sx={{ width: '95%',  backgroundColor:"#023535", color:"#FFFFFF", margin: "5px", padding: "10px", marginBottom:"50px" }}>
          <Toolbar >
            <ListItemIcon sx={{ fontSize: 20 }}>
              <AlternateEmailIcon sx={{color:"#BFBFBF"}}/>
            </ListItemIcon>
            <ListItemText
              sx={{
                my: 0,
                primary: {
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 0,
                },
              }}
              primary={item.title}
            />
            
              <IconButton>
                <CancelIcon sx={{color:"#BFBFBF"}} onClick={handleOpenModal}/>
              </IconButton>
            
          </Toolbar>
          <Divider />
          <ListItem component="div" disablePadding>
            <Card sx={{ display: "flex", flexDirection: "column",  backgroundColor:"#023535" }}>
              {/* <CardMedia
                component="img"
                alt="natureza"
                height="180"
                image={item.image}
                sx={{ width: 300 }}
              /> */}
              <CardContent>
                <Typography variant="body2" sx={{color:"#BFBFBF"}} >
                {item.body}
                </Typography>
              </CardContent>
              <Divider />
              {/* INFORMAÇÕES */}
              <Accordion key={item.id} expanded={expanded[item.id]} onChange={handleChange(item.id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#015958" }}>
              <Typography sx={{ fontSize: 15, fontWeight: "medium", color: "#BFBFBF" }}>
                Informações
              </Typography>
            </AccordionSummary>
            <Accordion
              expanded={expanded[item.id + "panel2"]}
              onChange={handleChange(item.id + "panel2")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#015958" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "medium", color: "#BFBFBF" }}>
                <IconButton>
                <AccountBoxIcon sx={{color:"#BFBFBF"}} onClick={handleOpenModal}/>
              </IconButton>
                  User
                </Typography>
              </AccordionSummary>
              {expanded[item.id + "panel2"] && (
                <Card>
                  <CardContent>
                    <Typography>ID: {item.id}</Typography>
                    <Typography>Usuário: {item.userId}</Typography>
                  </CardContent>
                </Card>
              )}
            </Accordion>
            <Accordion
              expanded={expanded[item.id + "panel3"]}
              onChange={handleChange(item.id + "panel3")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#015958" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "medium", color: "#BFBFBF" }}>
                <IconButton>
                <CommentIcon sx={{color:"#BFBFBF"}} onClick={handleOpenModal}/>
              </IconButton>
                  Comentários
                </Typography>
              </AccordionSummary>
              {expanded[item.id + "panel3"] && (
                <Card>
                  <CardContent>
                    <Grid container sx={{ display: "flex", marginTop: "5px" }}>
                      <IconButton>
                        <AccountCircleIcon />
                      </IconButton>
                      <Typography sx={{ marginTop: "8px", paddingX: "20px", color:"black" }}>{item.body}</Typography>
                    </Grid>
                    <Grid sx={{ display: "flex", justifyContent: "flex-end", marginTop: "-10px" }}>
                      <IconButton>
                        <FavoriteBorderIcon />
                      </IconButton>
                      <Divider />
                    </Grid>
                  </CardContent>
                  <CardContent >
                  <TextField
        id="outlined-multiline-flexible"
        label="Comentário"
        multiline
        placeholder="Digite aqui seu comentario"
        maxRows={2}
        sx={{ width: '100%',minHeight: '3%', }}
        value={commentbody}
        onChange={handleCommentChange}
        InputProps={{
          endAdornment: (
            <IconButton
              edge="end"
              disabled={!commentbody}  
              
              style={{ fontSize: '20px' }}
            >
              <SendIcon onClick={() => handleSendClick(item.id, item.title)} />
            </IconButton>
          ),
        }}
      />
                  </CardContent>
                </Card>
              )}
            </Accordion>
          </Accordion>
                
              </Card>
          </ListItem>
          
                </Paper>
                </React.Fragment>
                <RemovePost isOpen={isModalOpen} onClose={handleCloseModal} ref={modalRef} postId={item.id}/>
        </Grid>
      ))}
     
    </Grid>
  );
}
