function submit() {
  fetch("/submit", {
    method: "POST",
    body: JSON.stringify({
      content: document.querySelector("#content").value,
      date: new Date(),
      important: (document.querySelector("#important").classList.contains("star")) ? true : false,
      tag: (document.querySelector("#tag").value == "") ? null : document.querySelector("#tag").value
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        document.querySelector("#content").value = ""
        fetchLogs()
          .then(logs => {
            renderLogs(logs, document.querySelector("#logsContainer"))
            document.querySelector("#logAmount").innerHTML = logs.length
            renderEditLogs()
          })
      }
    })
}

function save(i) {
  fetch(`/edit/${i}`, {
    method: "POST",
    body: JSON.stringify({
      content: document.querySelector("#editContent").value,
      important: (document.querySelector("#editImportant").classList.contains("star")) ? true : false,
      tag: (document.querySelector("#editTag").value == "") ? null : document.querySelector("#editTag").value
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        document.querySelector("#content").value = ""
        fetchLogs()
          .then(logs => {
            renderLogs(logs, document.querySelector("#logsContainer"))
            document.querySelector("#logAmount").innerHTML = logs.length
            renderEditLogs()
          })
      }
    })
}

function toggle(e) {
  if (e.classList.contains("star")) {
    e.classList.remove("star")
    e.children[0].src = "/static/assets/icon_star.png"
    e.children[0].style.filter = ""
  } else {
    e.classList.add("star") 
    e.children[0].src = "/static/assets/icon_star_filled.png"
    e.children[0].style.filter = "invert(76%) sepia(100%) saturate(332%) hue-rotate(354deg) brightness(104%) contrast(102%)"
  }
}

function openModal() {
  animateModalOpen(document.querySelector("#modal"))
}

function closeModal() {
  animateModalClose(document.querySelector("#modal"))
}

function renderEditLogs() {
  const container = document.querySelector("#logsContainer").children
  for (let i=0; i<container.length; i++) {
    const logEditButton = document.createElement("img")
    const logDeleteButton = document.createElement("img")
    logEditButton.style.marginRight = "1.7em"
    logDeleteButton.onclick = function() {deleteLog(i)}
    logDeleteButton.src = "/static/assets/icon_delete.png"
    logDeleteButton.className = "log-edit"
    logEditButton.onclick = function() {editEntry(i)}
    logEditButton.src = "/static/assets/icon_edit.png"
    logEditButton.className = "log-edit"
    container[i].children[0].append(logEditButton, logDeleteButton)
  }
}

async function deleteLog(i) {
  const a = await fetch(`/delete/${i}`)
  const b = await a.json()
  if (b.success) {
    document.querySelector("#content").value = ""
    fetchLogs()
      .then(logs => {
        renderLogs(logs, document.querySelector("#logsContainer"))
        document.querySelector("#logAmount").innerHTML = logs.length
        renderEditLogs()
      })
  }
}

function editEntry(i) {
  const original = document.querySelector("#logsContainer").children[i]
  const e = document.querySelector("#editImportant")
  animateModalOpen(document.querySelector("#editModal"))
  document.querySelector("#editSave").onclick = function() {save(i)}
  document.querySelector("#editContent").value = original.children[1].innerHTML
  document.querySelector("#editTag").value = (original.children[0].children.length > 2) ? original.children[0].children[1].innerHTML : ""
  if (original.className.includes("important")) {
    e.classList.add("star") 
    e.children[0].src = "/static/assets/icon_star_filled.png"
    e.children[0].style.filter = "invert(76%) sepia(100%) saturate(332%) hue-rotate(354deg) brightness(104%) contrast(102%)"
  } else {
    e.classList.remove("star")
    e.children[0].src = "/static/assets/icon_star.png"
    e.children[0].style.filter = ""
  }
}
