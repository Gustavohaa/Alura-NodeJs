import { getAllPosts, createPost} from "../models/postsModel.js";
import fs from 'fs'
export async function listPosts(req, res) {

    const posts = await getAllPosts();

    res.status(200).json(posts); 
};

export async function postNewPost(req,res){
    const newPost = req.body;

    try{
        const postCreated = await createPost(newPost)
        res.status(200).json(postCreated);
    }catch(e){
        console.error(e.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }

}

export async function uploadImage(req,res){
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try{
        const postCreated = await createPost(newPost)
        const imageAtt = `uploads/${postCreated.insertedId}.png`
        fs.renameSync(req.file.path, imageAtt) 
        res.status(200).json(postCreated);
    }catch(e){
        console.error(e.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }

}