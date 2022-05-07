const express=require("express");
const axios=require("axios");
const app=express();


   app.get("/todos", (req,response)=>{
   axios.get("https://jsonplaceholder.typicode.com/todos ").then((res)=>{
   const ob=[{}]
   res.data.map((item)=>{ob.push({id:item.id,title:item.title,completed:item.completed})})
   ob.shift(); // removing first empty object  of line no 8
// console.log(ob);
   response.send(ob)}).catch((err)=>console.log(err));

   });


   app.get('/user/:id',async (req, response)=>{
  await  axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
     .then((res)=>{
       

        axios.get("https://jsonplaceholder.typicode.com/todos ")
        .then((res2)=>{
            const todos=res2.data.filter((item)=>{return item.userId==req.params.id});
            console.log(todos);
         res.data['todos']=todos;
         response.send(res.data)})
      
      
        })
        .catch((errr)=>{console.log(errr)})
        
           
    .catch((err)=>console.log(err));
})
app.listen(3000,()=>{console.log("Listening on port 3000")});