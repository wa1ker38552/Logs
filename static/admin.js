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