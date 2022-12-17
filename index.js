
const express = require('express');
const { MongoClient,ServerApiVersion,ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rvc7ql.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri,{ useNewUrlParser: true,useUnifiedTopology: true,serverApi: ServerApiVersion.v1 });


async function run() {

    const UserList = client.db('ATG_DB').collection('Users');
    const PostList = client.db('ATG_DB').collection('posts');

    try {
        app.post('/user-registration',async (req,res) => {
            const user = req.body;
            console.log(user);
            const query = { email: user.email }
            const existUser = await UserList.find(query).toArray();

            if (existUser.length === 0) {
                const result = await UserList.insertOne(user);

                return res.send(result);
            }
            res.status(409).send('User already exist');
        });
        app.post('/user-login',async (req,res) => {
            const user = req.body;
            const query = { email: user.email,password: user.password }

            const userInfo = await UserList.findOne(query);

            if (userInfo) {
                console.log(userInfo);
                return res.send({ message: "Logged in Successfully",userInfo });
            }
            res.status(401).send('Invalid Credentials');
        });
        app.get('/forget-pass',async (req,res) => {
            const { email } = req.query;
            const query = { email: email }

            const userInfo = await UserList.findOne(query);

            if (userInfo) {
                return res.send({ message: 'Password sent to your email' });
            }
            res.status(401).send('This email is not registered');
        });
        app.post('/posts',async (req,res) => {
            const post = req.body;
            const result = await PostList.insertOne(post);
            console.log(result);
            res.send({ message: "posted Successfully",result });
        });
        app.patch('/posts/:id',async (req,res) => {
            const { id } = req.params;
            const updatedpost = req.body;

            const query = { _id: ObjectId(id) };
            const result = await PostList.updateOne(query,{ $set: updatedpost });

            if (result.modifiedCount > 0) {
                res.send({
                    message: 'updated Successfully',
                    data: result,
                });
            } else {
                res.send({
                    message: 'error',
                });
            }

        });

        app.delete('/posts/:id',async (req,res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
           
            const result = await PostList.deleteOne(query);
           
            res.send({
                message: "post Deleted Succesfully",
                result:result
            });
        })

        app.get('/get-posts',async (req,res) => {
            const posts = await PostList.find().toArray();
            res.send(posts);
        });
        
        app.post('/add-comment',async (req,res) => {
            const comment = req.body;
            const query = { _id: ObjectId(comment.postId) }
            const post = await PostList.findOne(query);
            if (!post.comments) post.comments = [];
            const comments = post.comments;

            comments.push(comment);
            const result = await PostList.updateOne(query,{ $set: { comments: comments } });
            res.send({ message: "Commented Successfully",totalComments: comments.length });
        });
        app.get('/get-comments',async (req,res) => {
            const { postId } = req.query;
            const query = { _id: ObjectId(postId) }
            const post = await PostList.findOne(query);
            const comments = post.comments;
            res.send(comments);
        });

        app.post('/add-like',async (req,res) => {
            const like = req.body;
            const email = like.userEmail;
            const query = { _id: ObjectId(like.postId) }

            const post = await PostList.findOne(query);
            if (!post.likes) post.likes = [];
            if (post.likes.find(like => like.userEmail === email)) {
                return res.send({
                    message: "Aleready Liked",
                    totalLikes: post.likes.length
                })
            }
            const likes = post.likes;
            likes.push(like);
            const result = await PostList.updateOne(query,{ $set: { likes: likes } });
            res.send({
                message: "Liked Successfully",
                totalLikes: post.likes.length
                ,result
            });

        });




    } finally {
        // await client.close();
    }

}
run().catch(console.dir);

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
});