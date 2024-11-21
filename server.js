import express from 'express';

const posts = [
    {   id: 1,
        descricao: "Foto teste",
        imagem: "https://placecats.com/millie/300/150"
      },
      {
        id: 2,
        descricao: "Gato fazendo yoga",
        imagem: "https://placekitten.com/400/300"
      },
      {
        id: 3,
        descricao: "Gatinho dormindo",
        imagem: "https://placekitten.com/200/200"
      },
      {
        id: 4,
        descricao: "Cachorro brincando com bola",
        imagem: "https://placepup.com/500/400"
      }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function getPostById(id){
    return posts.findIndex((post)=>{
        return post.id === Number(id)
    });
};

app.get("/posts/:id", (req, res) => {
    const index = getPostById(req.params.id);
    res.status(200).json(posts[index]);
});