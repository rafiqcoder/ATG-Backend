# ATG Backend Guid
1. Register

    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/user-registration
    Local Registration API: http://localhost:5000/register/user-registration
    Method: Post
### Data for api call
    {
    "firstName" : "Demo",
    "lastName" : " Name",
    "email" : "demo@gamil.com",
    "password" : "demoPassword"
  }

2. Login
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/login
    Local Registration API: http://localhost:5000/user-login

 ### Json Demo Data for Api:
    {
        "email" : "demo@gamil.com",
        "password" : "demoPassword"
    }
3. Forget Password
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/forgetPassword
    Local Registration API: http://localhost:5000/forgetPassword
    Method: Post
### Json Demo Data for Api:
    {
        "email" : "demo@gamil.com"
    }   
### Create: Add New Post
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/posts
    Local Registration API: http://localhost:5000/posts
    Method: Post
    {
    "title": "Demo is Ready to Test",
    "description": "This is an example of how to test the application."
    }

5. Read: Get all post

    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/allPost
    Local Registration API: http://localhost:5000/allPost
    Method: Get

6. Delete: Delete post by id
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/posts/:id
    Local Registration API: http://localhost:5000/posts/:id
    Method: Delete

7. Update: Update post by id
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/updatePost/:id
    Local Registration API: http://localhost:5000/updatePost/:id
    Method: Patch
    Need data like this (JSON):
    
8. Like: Like post by email
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/like/email=demo@gmail.com
    Local Registration API: http://localhost:5000/like/email=demo@gmail.com
    Method: Patch

9. Comment:Add new Comment 
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/comments
    Local Registration API: http://localhost:5000/add-comment
    Method: Post
### Json Demo Data for Api:
    {
    "postId": "",
    "comments": "text and comments"
    }
10. Comment: GET All Comment particular posts by id
    Online Registration API: https://atg-backend-rafiqcoder.vercel.app/comments/:postId
    Local Registration API: http://localhost:5000/comments/:postId
    Method: GET
