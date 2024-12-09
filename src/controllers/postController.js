import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(req, res) {

    const posts = await getAllPosts();

    res.status(200).json(posts);
};

export async function postNewPost(req, res) {
    const newPost = req.body;

    try {
        const postCreated = await createPost(newPost)
        res.status(200).json(postCreated);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCreated = await createPost(newPost)
        const imageAtt = `uploads/${postCreated.insertedId}.png`
        fs.renameSync(req.file.path, imageAtt)
        res.status(200).json(postCreated);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}

export async function updateNewPost(req, res) {
        const id = req.params.id;
        const urlImage = `http://localhost:3000/${id}.png`       
        try {
            const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
            const description = await gerarDescricaoComGemini(imgBuffer)

            const post = {
                imgUrl: urlImage,
                descricao: description,
                alt: req.body.alt
            }

            const postCreated = await updatePost(id,post)
            res.status(200).json(postCreated);
        } catch (e) {
            console.error(e.message);
            res.status(500).json({ "Erro": "Falha na requisição" })
        }
    }

