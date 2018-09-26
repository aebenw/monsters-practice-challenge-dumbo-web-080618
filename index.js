  const allUrl = "http://localhost:3000/monsters"
  const newForm = document.getElementById("new-monster");

document.addEventListener('DOMContentLoaded', (e) => {

  e.preventDefault()

  //--------variables-----------//

  let firstMonster;
  let lastMonster;
  let veryLast;
  const forward = document.getElementById('forward');
  const back = document.getElementById('back');

  //----------OnLoad------------//

  function fetchFiftyMons() {
    fetch(allUrl)
    .then(res => res.json())
    .then(res => parseFiftyMons(res))
  }

  function parseFiftyMons(data){
  let copyData = data.slice(0, 50)

  firstMonster = 0
  lastMonster = 50
  veryLast = data[data.length - 1].id

  displayMonster(copyData)
  }

  //------------Next functions------------//


  forward.addEventListener('click', nextFiftyMons);

  function nextFiftyMons(e){
    e.preventDefault()
    fetch(allUrl)
    .then(res => res.json())
    .then(res => parseNextMons(res))
  }

  function parseNextMons(res){

      let nextMon = res.slice(lastMonster, lastMonster + 50)

      firstMonster += 50;
      lastMonster += 50;
      veryLast = res[res.length - 1].id
      if (firstMonster > 50){
        back.style = "display:block"
      }

      displayMonster(nextMon)
  }


  //----------Back Function------------//


  back.addEventListener('click', lastFiftyMons);

  function lastFiftyMons(e){
    e.preventDefault()
    fetch(allUrl)
    .then(res => res.json())
    .then(res => parseLastMons(res))
  }

  function parseLastMons(res){
    let lastMon = res.slice(firstMonster - 50, firstMonster)

    firstMonster -= 50;
    lastMonster -= 50;
    veryLast = res[res.length - 1].id
    displayMonster(lastMon)
  }

  //-------------FORM------------------//



  newForm.addEventListener('submit', createMonster)

  function createMonster(e){

    e.preventDefault()

    let newName = e.target.createname.value;
    let newAge = e.target.createage.value
    let newDesc = e.target.createdesc.value
    let info = {
      name:  `${newName}`,
      age: `${newAge}`,
      description: `${newDesc}`
    }

    postMonster(info)
  }


  function postMonster(info){
    debugger
    fetch(allUrl, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res)))
  }


  //---------MISC--------------//


  function toggleButtons(id){
    if (id === 50){
    back.style = "display:none"
    forward.style = "display:inline-block"
  } else if (id === veryLast) {
    back.style = "display:inline-block"
    forward.style = "display:none"
  } else {
    back.style = "display:inline-block"
    forward.style = "display:inline-block"
  }
}

  function displayMonster(copyData){

    const container = document.getElementById('monster-container');
    let str = ""

    copyData.forEach(mon => str += `<h1>${mon.id}</h1><br> <span>Name: ${mon.name} <br> Age: ${mon.age}<br> Description: ${mon.description}</span><hr>`)

    container.innerHTML = str
    let id = copyData[copyData.length - 1].id;
    toggleButtons(id)
  }

  fetchFiftyMons()

})
