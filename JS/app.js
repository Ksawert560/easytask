const tasksDiv = document.querySelector('#tasksDiv')

const createNewBtn = document.querySelector("#createNew");
const createNewDiv = document.querySelector("#createNewDiv");

const cancel = document.querySelector('#cancel');

createNewBtn.addEventListener('click', function (){
    createNewDiv.style.visibility = 'visible';
})

cancel.addEventListener('click', function(){
  createNewDiv.style.visibility = 'hidden';
})


let taskTxt = document.querySelector('#task');

const createBtn = document.querySelector('#createBtn');

let tasks = [];

if(localStorage.getItem('task')===null){
  tasks=[];
}else{
  tasks = JSON.parse(localStorage.getItem('task'));
}
  for(let i=0; i<tasks.length; i++){
    const taskDiv = document.createElement('div')
    taskDiv.className = 'task';
    const p = document.createElement('span');
    const inputRadio = document.createElement('input');
    inputRadio.type = 'radio';
    inputRadio.className = 'inputDone';
    inputRadio.id = i;
    const icon = document.createElement('i')
    icon.className='fa-solid fa-trash';
    icon.id=i;
  
    let txt = tasks.map(function(item){
      return item['task']
    })
  
    p.innerText=tasks[i]
    p.className = 'txt'
    taskDiv.appendChild(inputRadio)
    taskDiv.appendChild(p)
    taskDiv.appendChild(icon)
    tasksDiv.appendChild(taskDiv)
  }


// console.log("task: "+tasks[0])
createBtn.addEventListener('click', function(){
  let newTask = {
    task: taskTxt.value,
    done: false,
  }
  console.log(newTask.task)
  tasks.push([newTask.task])
  localStorage.setItem('task', JSON.stringify(tasks))

  createNewDiv.style.visibility = 'hidden';

  const taskDiv = document.createElement('div')
  taskDiv.className = 'task';
  const p = document.createElement('span');

  const inputRadio = document.createElement('input');
  inputRadio.type = 'radio';
  inputRadio.className = 'inputDone';
  let lenght = tasks.length
  p.innerText=tasks[lenght-1];
  p.style.width = '90%'

  const icon = document.createElement('i')
  icon.className='fa-solid fa-trash';
  icon.id = tasks.length-1
  inputRadio.id = tasks.length-1;
  // icon.id = ta
  taskDiv.appendChild(inputRadio)
  taskDiv.appendChild(p)

  taskDiv.appendChild(icon)
  tasksDiv.appendChild(taskDiv)

  taskTxt.value = ''
  location.reload()
})

const currentTasks = localStorage.getItem('task')

//deleting task

const taskDone = document.querySelectorAll('.inputDone')

  taskDone.forEach(el => {
    let id = el.id
    el.addEventListener('click', function(){
      el.parentElement.style.textDecoration='line-through'
      tasks.splice(id, 1)
      console.log(tasks)
      localStorage.setItem('task', JSON.stringify(tasks))
      location.reload()
    })
  })





const trashIcon = document.querySelectorAll('.fa-trash');

trashIcon.forEach(el =>{
  let id = el.id;
  el.addEventListener('click', function(){
    tasks.splice(id, 1)
    console.log(tasks)
    localStorage.setItem('task', JSON.stringify(tasks))
    location.reload()
  })
})


console.log(tasks)
