import express from "express";
import crypto from "crypto";


const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const data = req.body;
        if (!data.userName) {
            throw new Error('userName is required')
        }
        const result = await fetch('http://localhost:3000/users', {
            method: 'post',
            body: JSON.stringify({ ...data, id: `US${crypto.randomUUID()}` })
        });
        const createData = await result.json();
        console.log(createData)
        res.send({
            createData
        });
    } catch (error) {
        res.send({
            message: error.message
        })
    }
});

const findUserById = async (userId) => {
    try {
        const response = await fetch('http://localhost:3000/users')
        const userAsJson = await response.json()
        const user = userAsJson.find((_user) => {
            return _user.id === userId
        })
        return user
    } catch (err) {
        console.log('Loi')
    }
}
// 2. Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
app.post('/posts', async (req, res) => {
    //Sử dụng try catch để khi lỗi xảy ra, server vẫn tiếp tục hoạt động, nếu không chương trình sẽ dừng hoàn toàn
    try {
        const data = req.body;
        const author = await findUserById(data.authorId)
        if (!author) throw new Error('Khong tim thay tac gia')

        const result = await fetch('http://localhost:3000/posts', {
            method: 'post',
            //random ID with prefix
            body: JSON.stringify({ ...data, id: `PO${crypto.randomUUID()}`, authorId: author.id })
        })
        const createdData = await result.json();
        //* 2xx thanh cong
        //* 4xx Loi client
        //* 5xx Loi server
        // 3xx thanh cong
        res.status(200).send({
            createdData,
            message: 'Data posted!'
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }

})


// 3. Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
app.put('/users/:userId/posts/:postId', async (req, res) => {
    const { userId, postId } = req.params
    const { content } = req.body
    const rsUsers = await fetch(`http://localhost:3000/users/${userId}`)
    const user = await rsUsers.json()
    const rsPosts = await fetch(`http://localhost:3000/posts/${postId}`)
    const post = await rsPosts.json()
    if (user.id !== userId) {
        return res.status(403).send('User khong ton tai')
    }
    if (post.authorId !== userId) {
        return res.status(403).send('Khong phai user tao bai post')
    }
    const updateResp = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...post,
            content: content
        })
    })
    const updatePost = await updateResp.json()
    res.status(200).send({
        message: 'Cap nhap thanh cong',
        posts: updatePost
    })
})

// 4. Viết API cho phép user được comment vào bài post

app.post('/make-a-comment', async (req, res) => {
    try {
        const { authorId, postId, content } = req.body
        const author = await findUserById(authorId)

        const rsPosts = await fetch(`http://localhost:3000/posts/${postId}`)
        const post = await rsPosts.json()
        if (!post) throw new Error('Khong tim thay bai post')

        const result = await fetch('http://localhost:3000/comments', {
            method: 'post',
            //random ID with prefix
            body: JSON.stringify({ content, id: `CMT${crypto.randomUUID()}`, authorId: author ? author.id : 'Anonymous', postId: postId })
        })

        return res.send(await result.json())
    } catch (err) {
        res.send({
            message: err.message
        })
    }
})

app.patch('/comments/:id', async (req, res) => {
    const commentId = req.params.id;
    const { userId, content } = req.body;

    const result = await fetch(`http://localhost:3000/comments/${commentId}`);


    if (!result.ok) {
        return res.status(404).send({ message: 'Comment not found' });
    }
    const comment = await result.json();

    if (comment.userId !== userId) {
        return res.status(403).send({ message: 'You are not allowed to edit this comment' });
    }

    const updateResult = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
    const updatedComment = await updateResult.json();
    res.send({
        message: 'Comment updated successfully',
        comment: updatedComment
    });
});


app.listen(3001, () => {
    console.log("Server is running on port 3000");
});