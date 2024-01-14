import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Obtém todas as postagens
export const getPostagens = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter postagens:', error);
    throw error;
  }
};

// Cria uma nova postagem
export const createPostagem = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    throw error;
  }
};

// Cria um novo comentário para uma postagem específica
export const createComentarios = async (postId, comentarioData) => {
  try {
    const response = await api.post(`/comments?postid=${postId}`, comentarioData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    throw error;
  }
};

//Exclui postagem por api
export const deletePostagem = async (id) => {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    throw error;
  }
};

