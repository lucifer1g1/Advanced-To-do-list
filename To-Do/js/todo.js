let tasksbydate = JSON.parse(localStorage.getItem("tasksByDate")) || {}
let tasklist = document.getElementById("tasklist")
let addbttn = document.getElementById("add")
let ismigrating = false
let migratedfrom ;
let taskmigrating ;

function saveTasks() {
    localStorage.setItem("tasksByDate", JSON.stringify(tasksbydate));
}
function rendertasks(date) {
    if (tasksbydate[date]){
    let tasks = tasksbydate[date]
      tasklist.innerHTML =""
      tasks.forEach((task)=>{
      
if(!task.status){
      let taskframe = document.createElement("div")
      taskframe.draggable = true
      taskframe.id = task.text
      taskframe.className = "TaskFrame"
      let taskname = document.createElement("div")
      taskname.innerHTML = task.text
      let donebttn = document.createElement("button")
      donebttn.innerHTML = "Done"
      donebttn.className = "Done"
      donebttn.dataset.value = task.text

      let migratebuttn = document.createElement("button")
      migratebuttn.innerText = "Migrate"
      migratebuttn.className = "migrate"
      migratebuttn.dataset.value = task.text

      let deletebttn = document.createElement("button")
      deletebttn.innerHTML = "Delete"
      deletebttn.className = "Delete"
      deletebttn.dataset.value = task.text
      taskframe.appendChild(taskname)
      taskframe.appendChild(donebttn)
      taskframe.appendChild(migratebuttn)
      taskframe.appendChild(deletebttn)
      tasklist.appendChild(taskframe)

      donebttn.addEventListener('click',(e)=>{
        task.status = true
        saveTasks(date)
        rendertasks(date)

      })
      deletebttn.addEventListener("click",(e)=>{
        console.log(e.target)
        let idd = e.target.dataset.value
        tasksbydate[date]= tasks.filter(task=> task.text !=idd)
        saveTasks(date)
        rendertasks(date)
      })
       /* Migration -------------------------------------------------*/
      migratebuttn.addEventListener("click",(e)=>{
        migratedfrom = date
        ismigrating = true
        var modal = document.getElementById("myModal");
        taskmigrating  = migratebuttn.dataset.value
        modal.style.display = "none"
        tasksbydate[date]= tasks.filter(task=> task.text !=taskmigrating)

      })
     /* ---------------------------------------------------------------*/

}
else{
                  let doneframe = document.createElement("div")
                  let undonebttn = document.createElement("button")
                  let doneframe_name = document.createElement("div")
                  doneframe_name.style.textDecoration = 'line-through'
                  doneframe_name.innerHTML = task.text

                  undonebttn.dataset.value = task.text
                  undonebttn.innerHTML = "Undo"
                  doneframe.className = "doneframe"

                  doneframe.appendChild(doneframe_name)
                  doneframe.appendChild(undonebttn)
                  tasklist.appendChild(doneframe)


                  undonebttn.addEventListener('click',(e)=>{
                    task.status = false
                    saveTasks(date)
                    rendertasks(date)
                  })
}
})
}
}

export function clickabledate(){

let calenderdates = document.querySelectorAll(".Calendardates")
calenderdates.forEach((cdate)=>
cdate.addEventListener("click",(e)=>{
    if (!ismigrating){
        let currentdate = e.target.id
    addbttn.dataset.value = currentdate
    if(!tasksbydate[currentdate]){
        tasksbydate[currentdate] = []
        saveTasks()
    }
    
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    rendertasks(currentdate)
    
    addbttn.addEventListener("click",(e)=>{
        e.preventDefault()
    let box = document.getElementById("box")
    let task = box.value
    if(task!=""){
    (tasksbydate[e.target.dataset.value]).push(({ text: `${task}`, status: false }))
    saveTasks()
    rendertasks(e.target.dataset.value)
    
    }
    box.value=""
    
    })

    
    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        
    }

}
    }
/* Migration */
else {
var modal = document.getElementById("myModal");
let migratetasktodate = e.target.id
    if(!tasksbydate[e.target.id]){
        tasksbydate[e.target.id] = []
        saveTasks()
    }
    
(tasksbydate[migratetasktodate]).push(({ text: `${taskmigrating}`, status: false }))
saveTasks(migratetasktodate)
alert("Task Migrated succesfiuly")
modal.style.display = "block";
rendertasks(migratedfrom)
ismigrating = false




}

})
)}