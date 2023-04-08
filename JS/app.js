const tasksDiv = document.querySelector('#tasks')

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
    icon.className='fa-solid fa-grip-vertical';
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
  icon.className='fa-solid fa-grip-vertical';
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





// Sorting list 
const gripIcon = document.querySelectorAll('.fa-grip-vertical');


const dragArea = document.querySelector('#tasks');
new Sortable(dragArea, {
  group: 'list-of-tasks',
  handle: ".fa-grip-vertical",
  animation: 350,
  draggable: ".task",
  ghostClass: 'ghost',
  store: {
    /** 
     * @param {Sortable}
     * @returns {Array} 
    */
    get: function(sortable){
      let order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },
    /**
    * @param {Sortable}
    */
   set: function(sortable){
    let order = sortable.toArray();
    localStorage.setItem(sortable.options.group.name, order.join('|'));
   }
    
  }
  
})
gripIcon.forEach(el => {
  el.addEventListener('click', function(){
    el.style.cursor = 'grabbing';
})

})



// console.log(tasks)
