
//#region - notes
//5/1/23 - 1) delete unneccessary features (like blogs, contact (or maybe just have our email), etc, also firebase stuff do not need (yet), 2) try to get them to put adds on it and work on seo

//#endregion

//#region - moving between sections
/*MOVING BETWEEN SECTIONS*/

const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function pageTransitions() {
  for (let i =0 ; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener('click', function() {
      let currentBtn = document.querySelectorAll('.active-btn');
      currentBtn[0].classList.remove('active-btn');
      this.classList.add('active-btn');
    })
  }

  allSections.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (id) {
      sectBtns.forEach(btn => {
        btn.classList.remove('active');
      })
      e.target.classList.add('active');

      //hide other sections
      sections.forEach((section) =>{
        section.classList.remove('active');
      })
      const element = document.getElementById(id);
      element.classList.add('active');
    }
  })

  //Toggle light/dark mode/theme
  const themeBtn = document.querySelector('.theme-btn');
  themeBtn.addEventListener('click', () => {
    let element = document.body;
    element.classList.toggle('light-mode');
  })
}

pageTransitions();

/*END OF MOVING BETWEEN SECTIONS*/
//#endregion

//#region - timer functionality
/*TIMER*/

/*Declare Variables and Grab from the Dom*/
let countdown
let secondsLeftAtStop
const timerDisplay = document.querySelector('.display_time-left')
const endTime = document.querySelector('.display_end-time')
const currentTask = document.querySelector('.display_current-task')
const buttons = document.querySelectorAll('[data-time]')
const buttonsText = document.querySelectorAll('.timer-btn-text')
let startStopBtn = document.querySelector('.start-stop-btn')
let startStopBtnToggled = true 
let shouldStartFromSecondsLeft = false 

let currentItem = []
setTimeout(() => {
  items.forEach(item => {
    item.current ? currentItem.push(item) : currentItem
  })
  currentItem.length === 1 ? currentTask.innerHTML = `Current Task: <span style='color: white'>${currentItem[0].text}</span` : currentTask.textContent = '\u00A0\u00A0\u00A0'
}, 500)

/*Functions*/
// highlight button (timer tab) that's clicked on
function toggleButtonHighlight() {
  buttons.forEach(button => {
    button.classList.remove('highlighted')
  })
  this.classList.add('highlighted')
  shouldStartFromSecondsLeft = false 
  const seconds = parseInt(this.dataset.time)
  displayTimeLeft(seconds)
  endTime.textContent = '\u00A0\u00A0\u00A0'
  startStopBtn.innerHTML = "Start"
  startStopBtn.classList.add('start')
  startStopBtnToggled = true; 
  clearInterval(countdown) 
}


let timeEnd 
let progressClock = document.querySelector('.progress-clock')

function determineProgress(seconds) {
  const progress = 1 - (seconds / timeEnd) 
  const progressDegrees = progress * 360
}


function toggleStartStopBtn () {
  startStopBtnToggled = this.classList.toggle('start') 
  let highlightedBtn = [...buttons].filter(button => button.classList.contains('highlighted'))[0] 
  timeEnd = secondsLeftAtStop 

  if (startStopBtnToggled) { 
    this.innerHTML = "Start"
    endTime.textContent = '\u00A0\u00A0\u00A0'
    stopTimer(secondsLeftAtStop)
    shouldStartFromSecondsLeft = true;
  } else { 
    this.innerHTML = "Stop"
    const seconds = parseInt(highlightedBtn.dataset.time)
    timeEnd = seconds
    shouldStartFromSecondsLeft ? timer(secondsLeftAtStop) : timer(seconds)
  }
}

// function that starts countdown on timer
function timer(seconds) {
  // clear existing timers
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // check if we should stop it
    if (secondsLeft < 0) {
      alert(`You're done!`)
      clearInterval(countdown)
      displayTimeLeft(seconds)
      return
    } 
    // display it
    displayTimeLeft(secondsLeft)
    determineProgress(secondsLeft)
  }, 1000)
}

function stopTimer(seconds) {
  clearInterval(countdown)
  displayTimeLeft(seconds)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  secondsLeftAtStop = seconds
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  document.title = `${display} - Let's Pomoroo!` 
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const adjustedHour = hour > 12 ? hour - 12 : hour
  const minutes = end.getMinutes()
  endTime.textContent = `Ends at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`
}

buttons.forEach(button => button.addEventListener('click', toggleButtonHighlight))
//Start/Stop Button Functionality
startStopBtn.addEventListener('click', toggleStartStopBtn)

const editTimer = document.querySelector('.edit-timer')
const workTimer = document.querySelector('#work-time')
const breakTimer = document.querySelector('#break-time')
const longBreakTimer = document.querySelector('#long-break-time')
const settingsSection = document.querySelector('#settings-section')
const timerSection = document.querySelector('#home')
const settingsBtn = document.querySelector('[data-id=settings-section]')
const timerBtn= document.querySelector('[data-id=home]')

function updateTimer (e) {
  e.preventDefault() 
  const newWorkTime = this.querySelector('[name=work-time]').value
  workTimer.dataset.time = +newWorkTime * 60
  const newBreakTime = this.querySelector('[name=break-time]').value
  breakTimer.dataset.time = +newBreakTime * 60
  const newLongBreakTime = this.querySelector('[name=long-break-time]').value
  longBreakTimer.dataset.time = +newLongBreakTime * 60
 
  startStopBtnToggled = false 
  shouldStartFromSecondsLeft = false 
  startStopBtn.classList.add('start') 
  startStopBtn.innerHTML = 'Start'
   //reset timer
  clearInterval(countdown)

  endTime.textContent = '\u00A0\u00A0\u00A0'

  buttons.forEach(button => {
    button.classList.remove('highlighted')
  })
  buttons[0].classList.add('highlighted')
  timerDisplay.textContent = `${newWorkTime}:00`
  document.title = `${newWorkTime}: 00 - Let's Pomoroo!`

  settingsSection.classList.remove('active')
  timerSection.classList.add('active')
  settingsBtn.classList.remove('active-btn')
  timerBtn.classList.add('active-btn')
  
}


editTimer.addEventListener('submit', updateTimer)

/*END OF TIMER*/
//#endregion

//#region - tasks
/*TASKS*/

// Grab from the dom
const addItems = document.querySelector('.add-items')
const clearItems = document.querySelector('.clear-items')
const itemsList = document.querySelector('.tasks')
const showAddItems = document.querySelector('.show-add-items')
const addItemInputField = document.getElementById('add-item-input-field')
let itemName;


//parse tasks from local storage
const items = JSON.parse(localStorage.getItem('items')) || []
//functions
function addItem(e) {

  e.preventDefault()
  const text = this.querySelector('[name=item]').value
  const item = {
    text,
    done: false,
    current: false
  }

  items.push(item)
  populateList(items, itemsList)

  localStorage.setItem('items', JSON.stringify(items))

  this.reset()
  toggleAddItemsContainer()
}

function populateList(tasks = [], tasksList) {
  tasksList.innerHTML = tasks.map((task, i) => {
    return `
      <div class="task-container">
        <li class="task">
          <div class="task-item task-left">
            <span>&nbsp;&nbsp;</span>
            <input class="completed-checkbox" type="checkbox" name="completed-checkbox" data-index=${i} id="item${i}" ${task.done ? 'checked' : ''}/>
            <span>&nbsp;</span>
            <label for="item${i}" class="${task.done ? 'completed' : ''}">${task.text}</label>
          </div>
          <div class="task-item" />
          <div class="task-item task-right">
            <input class="delete-btn" type="submit" data-index=${i} id="item${i}" name="delete-item-btn" value="X" />
          </div>
        </li>
        <button class="option-expand" name="option-expand-button" data-index=${i} data-itemname="${task.text}" data-current=${task.current}><i class="fas fa-ellipsis-v"></i></button>
      </div>
    `
  }).join('')

  setupCheckboxListeners();
}

//NEW - Dev Aidan H - Event listener to update class for label text
function setupCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.completed-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const id = e.target.id;
      const label = document.querySelector(`label[for="${id}"]`);

      if (e.target.checked) {
        label.classList.add('completed');
      } else {
        label.classList.remove('completed');
      }
    });
  });
}


function deleteItem(e) {

  if (!e.target.matches('[name=delete-item-btn]')) return
  const el = e.target
  const index = el.dataset.index
  if (items[index].current) {
    currentTask.textContent = '\u00A0\u00A0\u00A0'
  }

  items.splice(index, 1)
  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}

function clearAllItems() {
  localStorage.clear()
}

function toggleDone(e) {
  if (!e.target.matches('[name=completed-checkbox]')) return 
  const el = e.target
  const index = el.dataset.index
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}

function setAsCurrentTask(e) {
  if (!e.target.matches('[name=current-task-checkbox]')) return 
  const el = e.target
  const index = el.dataset.index

  if (items[index].current) { 
    items[index].current = !items[index].current

  } else { 
    items.forEach(item => {
      item.current = false
    })
    items[index].current = true
  }

  localStorage.setItem('items', JSON.stringify(items))

}

function toggleAddItemsContainer () {
  addItems.classList.toggle('inactive')
  addItemInputField.scrollIntoView()
  addItemInputField.focus()
}

function expandItemOptions (e) {
  if (!e.target.matches('[name=option-expand-button]')) return
  e.preventDefault() 
  const el = e.target
  let taskContainers = [...this.children]
  let doesItContainExpanded = false
  const index = el.dataset.index

  let openedContainerIndex;
  for (let i=0; i<taskContainers.length; i++) {
    if (taskContainers[i].classList.contains('expanded')) {
      openedContainerIndex = i;
    }
    taskContainers[i].classList.remove('expanded')
  }

  let lastOpenedContainer = taskContainers[openedContainerIndex]

  if (typeof lastOpenedContainer !== 'undefined') {
    lastOpenedContainer.innerHTML = `
    <li class="task">
      <div class="task-item task-left">
        <span>&nbsp;&nbsp;</span>
        <input class="completed-checkbox" type="checkbox" name="completed-checkbox" data-index=${openedContainerIndex} id="item${openedContainerIndex}" ${items[openedContainerIndex].done ? 'checked' : ''}/>
        <span>&nbsp;</span>
        <label for="item${openedContainerIndex}">${items[openedContainerIndex].text}</label>
      </div>
      <div class="task-item" />
      <div class="task-item task-right">
        <input class="delete-btn" type="submit" data-index=${openedContainerIndex} id="item${openedContainerIndex}" name="delete-item-btn" value="X" />
      </div>
    </li>
    <button class="option-expand" name="option-expand-button" data-index=${openedContainerIndex} data-itemname="${items[openedContainerIndex].text}" data-current=${items[openedContainerIndex].current}><i class="fas fa-ellipsis-v"></i></button>
    `
  }

  const itemName = el.dataset.itemname 
  const current = items[index].current
  let parentDiv = el.parentElement
  parentDiv.classList.add('expanded')

if (!parentDiv.classList.contains('expanded')) {
  console.log('true')

} 
// else {
//   console.log('false')
// }

  parentDiv.innerHTML = `
  <div class="update-items" name="update-items" data-index=${index}>
    <div class="update-item-row-1">
      <label for="item">Task:&nbsp;</label><input id="update-item-input-field" type="text" name="item" placeholder="${itemName}" value="${itemName}" required>
    </div>
    <div class="update-item-row-2">
      <div class="update-item-row-2-left">
      <label for="item${index}">Set as Current Task&nbsp;</label><input type="checkbox" name="current-task-checkbox" data-index=${index} class="current-task-checkbox-item" id="current-task-checkbox-item${index}"  ${current ? 'checked' : ''}/>
      </div>
      <div class="update-item-row-2-right">
        <input type="button" class="update-items-cancel-btn" name="cancel-update-btn" value="Cancel">
        <input type="button" class="update-items-update-btn" name="update-btn" data-index=${index} value="Update">
      </div>
    </div>
  </div>
  `

  const updateItemInputField = document.getElementById('update-item-input-field') 
  updateItemInputField.scrollIntoView()
  updateItemInputField.focus()
  updateItemInputField.select() 
}

let cancelUpdateBtn = document.getElementById('cancel-update-btn')
function cancelUpdate (e) {
  if (!e.target.matches('[name=cancel-update-btn]')) return
  const el = e.target
  const index = el.dataset.index
  populateList(items, itemsList)
}

let hasCheckBeenCheckedThisUpdate = false; 
function setAsCurrentTaskInUpdateSection(e) {
  if (!e.target.matches('[name=current-task-checkbox]')) return
  hasCheckBeenCheckedThisUpdate = true
}

let isCurrentCheckBoxChecked = false

function updateItem (e) {
  e.preventDefault()
  if (!e.target.matches('[name=update-items]')) return
  const el = e.target
  const index = el.dataset.index
  const currentCheckBox = el.lastElementChild.firstElementChild.lastElementChild
  isCurrentCheckBoxChecked = currentCheckBox.checked

  const itemName = el.firstElementChild.lastElementChild.value 
  items[index].text = itemName
  if (hasCheckBeenCheckedThisUpdate) {
    if (items[index].current) { 
      items[index].current = !items[index].current
      currentTask.textContent = '\u00A0\u00A0\u00A0'
    } else { 
      items.forEach(item => {
        item.current = false
      })
      items[index].current = true
      currentTask.innerHTML = `Current Task: <span style='color: white'>${itemName}</span>`
    }
  }

  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}

let currentCheckedItem = []
function checkForCurrentCheckedItem (tasks) {
  currentCheckedItem = []
  tasks.forEach(task => {
    if (task.current) {
      currentCheckedItem.push(task)
    }
  })
}

function updateItemUsingBtn (e) { 

  if (!e.target.matches('[name=update-btn]')) return
  const el = e.target
  const index = el.dataset.index

  const text = this.querySelector('#update-item-input-field').value

  const wasCurrentCheckboxChecked = this.querySelector('[name=current-task-checkbox]').checked
  items[index].text = text

  checkForCurrentCheckedItem(items)

  if (items[index].current) { 
    currentTask.innerHTML = `Current Task: <span style='color: white'>${text}</span>`
  } else { 
    currentTask.textContent = '\u00A0\u00A0\u00A0'
    currentCheckedItem.length === 1 ? currentTask.innerHTML = `Current Task: <span style='color: white'>${currentCheckedItem[0].text}</span>` : currentTask.textContent = '\u00A0\u00A0\u00A0'
  }

  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}
//#endregion

//#region - Event Listeners
//Event Listeners
showAddItems.addEventListener('click', toggleAddItemsContainer)
addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
itemsList.addEventListener('click', deleteItem)
itemsList.addEventListener('click', setAsCurrentTask)
itemsList.addEventListener('click', expandItemOptions)
itemsList.addEventListener('click', updateItemUsingBtn)
itemsList.addEventListener('click', cancelUpdate)
populateList(items, itemsList);
//#endregion
