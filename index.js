

const express=require('express');
const bodyparser=require('body-parser');
const fs=require('fs');
const app=express();
app.use(bodyparser.json());
app.get('/todos',(req,res)=>{
    fs.readFile("todo.json","utf-8",(err,data)=>{
        if(err) throw err;
        res.json(JSON.parse(data));
    })
})
app.post('/todos',(req,res)=>{
    const newTodo={
        id:Math.floor(Math.random()*1000000),
        title:req.body.title,
        description:req.body.description
    }
    fs.readFile("todo.json","utf-8",(err,data)=>{
        if(err) throw err
        const todos=JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todo.json",JSON.stringify(todos),(err)=>{
            if(err) throw err
            res.status(201).json(newTodo);
        })
    })
})
function findIndex(arr,id){

    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id) 
        return i;
    }
    return -1;
}
app.get('/todos/:id',(req,res)=>{
    fs.readFile("todo.json","utf-8",(err,data)=>{
        if(err) throw err;
        const todos=JSON.parse(data);
        const ind=findIndex(todos,parseInt(req.params.id))
        if(ind==-1){
            res.status(404).send()
        }
        else
        res.json(todos[ind]);
    })
})
app.listen(3000,()=>{
    console.log(`server running at 3000`);
})