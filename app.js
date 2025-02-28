const btnStart = document.querySelector('.pomodoro__btn');
const pomodoro = document.querySelector('.pomodoro');
const existe = document.querySelector('.pomodoro__conttask');
const timeElement = document.querySelector('.pomodoro__clock');
const inputElement = document.querySelector('.pomodoro__input');
let timer;
let tiempo = 0; 

function startClock() {
    tiempo=25*60;
    timer = setInterval(()=>{
    timeHandler();
    }, 1000);
};

function timeHandler() {
    tiempo--;
    renderTime();
    if (tiempo == 0) {
        doneTask();
        clearInterval(timer);
    }
};

function renderTime () {
    const minutos=parseInt(tiempo/60);
    const segundos=parseInt(tiempo%60);

    timeElement.textContent= `${minutos<10?'0':""}${minutos} : ${segundos<10?"0":""}${segundos}`;
};


function deleteTask () {
    const iconTrash = document.querySelector('.pomodoro__trash');
    iconTrash.addEventListener('click', (eve)=>{
        const containerTask = document.querySelector('.pomodoro__conttask');
        console.log(containerTask);
        containerTask.remove(pomodoro);
        inputElement.readOnly=false;
        clearInterval(timer);
        timeElement.textContent='25 : 00';
    });
};

function doneTask() {
    const iconTrash=document.querySelector('.pomodoro__trash');
    iconTrash.classList.remove('pomodoro__icon--active');
    const iconCheck=document.querySelector('.pomodoro__done');
    iconCheck.classList.add('pomodoro__icon--active');
    iconCheck.addEventListener('click', (eve)=>{
        const containerTask = document.querySelector('.pomodoro__conttask');
        containerTask.remove(pomodoro);
        inputElement.readOnly=false;
        timeElement.textContent='25 : 00';
    });
};

function getTask (eve) {
    console.log(inputElement.value);
    if (inputElement.value.length>3) {
        console.log('ha escrito algo');
        const containerTask = document.createElement('div');
        containerTask.classList.add('pomodoro__conttask');
        const plantilla = `<p class="pomodoro__task">${inputElement.value}</p>
        <svg class="pomodoro__trash pomodoro__icon pomodoro__icon--active" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="25px">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <svg class="pomodoro__done pomodoro__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  width="25px">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>`;
        containerTask.innerHTML=plantilla;
        pomodoro.appendChild(containerTask);
        inputElement.value='';
        inputElement.readOnly=true;


        startClock();
        deleteTask();
    }
};

btnStart.addEventListener('click', getTask);