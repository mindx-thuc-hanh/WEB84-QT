
const postController = {
    getPost: async (req, res) => {
        try {
            const newPost = await PostsModel.create(req.body)
            res.send(newPost)
        } catch (err) {
            res.send(err)
        }
    },
    createPost: async (req, res) => {
        try {
            const posts = await PostsModel.find({})
            res.send(posts)
        } catch (err) {
            res.send(err)
        }
    }
}

export default postController