let tasksbydate = JSON.parse(localStorage.getItem("tasksByDate")) || {}
let tasklist = document.getElementById("tasklist")
let addbttn = document.getElementById("add")
let ismigrating = false
let migratedfrom ;
let taskmigrating ;
let  migrating_time;
let num ;

function countnumactive(activedate){
    let number = 0;
    (tasksbydate[activedate]).forEach((task)=>{
        if (task.status === false){
            number = number + parseInt(task.hour)
        }
        
    })
    return number
    

}

function saveTasks() {
    localStorage.setItem("tasksByDate", JSON.stringify(tasksbydate));
}


export function getintensity(){
let dates = Object.keys(tasksbydate)
dates.forEach((indate)=>{
num = countnumactive(indate)
let ele = document.getElementById(indate)

if (!ele) return; 
if (num > 0 && num <= 7 ){
    ele.style.backgroundColor = "green"
        ele.addEventListener("mouseover",(e)=>{
        ele.style.backgroundColor = "#00ff2aff";
    })
    ele.addEventListener("mouseleave",(e)=>{
        ele.style.backgroundColor = "green"
    })

}
else if (num>7 && num <= 11){
        ele.style.backgroundColor = "#e6690f"
        ele.addEventListener("mouseover",(e)=>{
        ele.style.backgroundColor = "#ff8d29ff";
    })
    ele.addEventListener("mouseleave",(e)=>{
        ele.style.backgroundColor = "#e6690f"
    })

}


else if (num>11){
        ele.style.backgroundColor = "#ff0000ff"
        ele.addEventListener("mouseover",(e)=>{
        ele.style.backgroundColor = "#e65959ff";
    })
    ele.addEventListener("mouseleave",(e)=>{
        ele.style.backgroundColor = "#ff0000ff"
    })

}

else{
    ele.style.backgroundColor = " #7b02c6"
    ele.addEventListener("mouseover",(e)=>{
        ele.style.backgroundColor = "#ff4d94";
    })
    ele.addEventListener("mouseleave",(e)=>{
        ele.style.backgroundColor = " #7b02c6"
    })
    
}


})



}


function rendertasks(date) {
    if (tasksbydate[date]){
    let tasks = tasksbydate[date]
      tasklist.innerHTML =""
      let serial = 0
    tasks.forEach((task)=>{
      
    if(!task.status){
        let taskframe = document.createElement("div")
        taskframe.draggable = true
        taskframe.id = task.text
        taskframe.className = "TaskFrame"

        let serialnumber = document.createElement("div")
        serial = serial + 1
        serialnumber.innerText = serial

        if(task.hour > 1){taskframe.setAttribute("data-hour", `${task.hour} hours`)}
        else{
            taskframe.setAttribute("data-hour", `${task.hour} hour`);
        }


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

        taskframe.draggable = true
        taskframe.appendChild(serialnumber)
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
            let taskbeingfound = (tasksbydate[date].find(task => task.text === taskmigrating))
            migrating_time = taskbeingfound.hour
            console.log(migrating_time)
            modal.style.display = "none"

            tasksbydate[date]= tasks.filter(task=> task.text !=taskmigrating)

        })
        /* ---------------------------------------------------------------*/

    }


}) /*task for each end */

tasks.forEach((task)=>{
  if (task.status){

      
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
    }/*if tasks exists in structure end */
    getintensity()
} /*Function end */

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
    let time = document.getElementById("time").value
    if(task!=""){
    (tasksbydate[e.target.dataset.value]).push(({ text: `${task}`, status: false , hour: `${parseInt(time)}`}))
    document.getElementById("time").value = 1
    saveTasks()
    rendertasks(e.target.dataset.value)
    
    }
    box.value=""
    
    })
      



    
    span.onclick = function() {
    modal.style.display = "none";
    getintensity()
    }

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        getintensity()
        
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
    
(tasksbydate[migratetasktodate]).push(({ text: `${taskmigrating}`, status: false , hour: `${parseInt(migrating_time)}`}))
saveTasks(migratetasktodate)
modal.style.display = "block";
rendertasks(migratedfrom)
ismigrating = false
getintensity()




}

})
)}