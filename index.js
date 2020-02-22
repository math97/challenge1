const express = require('express');

const server = express();

server.use(express.json());

const projects = []

server.get('/projects',(req,res)=>{
  res.json(projects)
});

server.post('/projects',(req,res)=>{
  const {id , title}  = req.body;
  project={
    id,
    title,
    tasks:[]
  }
  
  projects.push(project)

  res.status(200).json(projects)
}); 

server.put('/projects/:id',(req,res)=>{
  const id = req.params;
  const {title} = req.body;  
  const project = projects.find(pro => pro.id == id);

  project.title = title;

  return res.json(project)
})

server.delete('/projects/:id',(req,res)=>{
  const id = req.params;
  const project = projects.find(project => project.id == id);
  projects.splice(project,1)

  return res.send('deletado com sucesso')
})
server.post('/projects/:id/tasks',(req,res)=>{
  const id = req.params;
  const {title}  = req.body;
  const project = projects.find(project => project.id == id);
  project.tasks=title

  res.status(200).json(project  )
}); 





server.listen(3000);


