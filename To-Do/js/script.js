import { clickabledate } from "./todo.js";
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const days = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
];

const dee = new Date();
let monthvalue = dee.getMonth(); 
document.getElementById("month").innerHTML = months[monthvalue];


function isValidDate(year, month, day) {
  const d = new Date(year, month, day); 
  return d instanceof Date && !isNaN(d) &&
         d.getFullYear() === parseInt(year) &&
         d.getMonth() === parseInt(month) &&
         d.getDate() === parseInt(day);
}

function getlastday(year, month){
  let x = 31;
  while (x > 27) {
    if (isValidDate(year, month, x)) {
      return x;
    } else {
      x--;
    }
  }
}


let yearvalue = parseInt(document.getElementById("year-select").innerText);

export function renderdates(){
  document.querySelectorAll(".day-column").forEach(ele => {
      while (ele.children.length > 1) {
          ele.removeChild(ele.lastChild);
      }
  });

  let i = 1;
  let firstday = new Date(yearvalue, monthvalue, 1);
  let fday = firstday.getDay();
  let k = 0;

  // Fill previous month's trailing days
  while(k < fday){
    let prevMonth = monthvalue - 1;
    let prevYear = yearvalue;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }
    let lastday = getlastday(prevYear, prevMonth);
    let previousdate = new Date(prevYear, prevMonth, lastday - (fday - 1) + k);
    let ftday = days[previousdate.getDay()];
    let dateemptyelem = document.createElement("div");
    dateemptyelem.innerHTML = lastday - (fday - 1) + k;
    dateemptyelem.className = "Empty";
    document.getElementById(ftday).appendChild(dateemptyelem);
    k++;
  }

  // Fill current month dates
  while (i < 33){
    if(isValidDate(yearvalue, monthvalue, i)){
      const date = new Date(yearvalue, monthvalue, i);
      let day = days[date.getDay()];
      let current_element = document.getElementById(day);
      let dateelement = document.createElement("div");
      dateelement.className = "Calendardates";
      dateelement.id = `${i}-${monthvalue+1}-${yearvalue}`
      dateelement.innerHTML = i;
      current_element.appendChild(dateelement);
      i++;
    }
    else{
      break;
    }
  }
  clickabledate()
}

let backbutton = document.getElementById("back");
let forwardbutton = document.getElementById("forward");

forwardbutton.addEventListener('click',()=>{
  monthvalue++;
  if (monthvalue > 11){
    monthvalue = 0;
    yearvalue++;
  }
  document.getElementById("year-select").innerText = yearvalue;
  document.getElementById("month").innerHTML = months[monthvalue];
  renderdates();
});

backbutton.addEventListener('click',()=>{
  monthvalue--;
  if (monthvalue < 0){
    monthvalue = 11;
    yearvalue--;
  }
  document.getElementById("year-select").innerText = yearvalue;
  document.getElementById("month").innerHTML = months[monthvalue];
  renderdates();
});

renderdates();
