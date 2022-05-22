const Post = require("../models/post");

const addPost = (req, res) => {
  const body = req.body;
  const post = new Post(body);

  post.save((err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor. Post duplicado" });
    } else {
      if (!postStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear el post." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Post creado correctamente." });
      }
    }
  });
}

const getPosts = (req, res) => {
    // Parametros por defecto
  const { page = 1, limit = 10 } = req.query;
    // Opciones de la piginación
  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" }
  };

  Post.paginate({}, options, (err, postsStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postsStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res.status(200).send({ code: 200, posts: postsStored });
      }
    }
  });
}

const updatePost = (req, res) => {
  const postData = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Post actualizado correctamente." });
      }
    }
  });
}

const deletePost = (req, res) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id, (err, postDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postDeleted) {
        res.status(404).send({ code: 404, message: "Post no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El post ha sido eliminado correctamente."
        });
      }
    }
  });
}

const getPost = (req, res) => {
  const { url } = req.params;

  Post.findOne({ url }, (err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res.status(200).send({ code: 200, post: postStored });
      }
    }
  });
}

const getPostByTopic = (req, res) => {
    const { topic } = req.params;
    const { page = 1, limit = 10 } = req.query;
    // Opciones de la piginación
    const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" }
    };
    
    Post.paginate({topic}, options, (err, postsStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!postsStored) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun post." });
        } else {
          res.status(200).send({ code: 200, posts: postsStored });
        }
      }
    });
  }
  

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
  getPostByTopic
};