const express = require('express');

const server = express();

server.use(express.json());

const projects = []


function checkIdprojects(req,res,next){
  const {id} = req.params;
  project=projects.find(p=>p.id==id);
    if (!project) {
      return res.status(400).json({ error: 'Project not found' });
    }
  return next()
}
function countRequest(req,res,next){
  console.count('Número de requisições');
  return next();
}
server.use(countRequest)

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

server.put('/projects/:id',checkIdprojects, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pro=> pro.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id',checkIdprojects,(req,res)=>{
  const id = req.params;
  const project = projects.find(project => project.id == id);
  projects.splice(project,1)

  return res.send('deletado com sucesso')
})
server.post('/projects/:id/tasks',checkIdprojects,(req,res)=>{
  const {id} = req.params;
  const {title}  = req.body;
  const project = projects.find(pro => pro.id == id);
 
  
  project.tasks.push(title)

  res.status(200).json(project)
}); 





server.listen(3000);


