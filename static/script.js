async function fetchLogs() {
  const a = await fetch("/fetch")
  const b = await a.json()
  return b.data
}

function animateModalOpen(m) {
  m.style.display = ""
  m.style.opacity = "1"
  m.style.background = "rgba(0, 0, 0, 0.7)"
  m.style.animation = "fade-in 0.3s"
  m.children[0].style.animation = "move-up 0.3s"
}

function animateModalClose(m) {
  setTimeout(function() {
    m.style.display = "none"
  }, 301)
  m.children[0].style.animation = "move-down 0.3s"
  m.style.animation = "fade-out 0.3s"
  m.style.opacity = 0
}

function openSearchModal() {
  animateModalOpen(document.querySelector("#searchModal"))
}

function closeSearchModal() {
  animateModalClose(document.querySelector("#searchModal"))
}

function renderLogs(logs, parent) {
  parent.innerHTML = ""
  logs.forEach(function(log) {
    const e = document.createElement("div")
    e.className = "log"
    const logHeader = document.createElement("div")
    const logDate = document.createElement("div")
    const logContent = document.createElement("div")
    logHeader.style.display = "flex"
    logHeader.style.alignItems = "center"
    logHeader.style.gap = "1em"
    logHeader.style.position = "relative"
    logHeader.append(logDate)
    if (log.tag) {
      const tag = document.createElement("div")
      tag.className = "tag"
      tag.innerHTML = log.tag
      logHeader.append(tag)
    }
    
    logDate.className = "log-date"
    logContent.className = "log-content"
    logDate.innerHTML = log.date
    logContent.innerHTML = log.content
    if (log.important) {
      e.classList.add("important")
    }
    e.append(logHeader, logContent)
    parent.append(e)
  })
}

function setCookie(name, value) {
  document.cookie = name + "=" + (value || "") + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setTheme(theme) {
  if (theme) {
    // dark theme
    document.documentElement.style.setProperty("--background", "#212121");
    document.documentElement.style.setProperty("--text", "#d6d6d6");
    document.documentElement.style.setProperty("--border", "#5c5c5c");
    document.documentElement.style.setProperty("--shadow", "#3d3d3d");
    document.documentElement.style.setProperty("--text-light", "#cccccc");
    document.documentElement.style.setProperty("--accent", "#ffef42");
    document.documentElement.style.setProperty("--tag", "#4377cb");
    document.documentElement.style.setProperty("--icon-filter", "invert(100%) sepia(0%) saturate(2413%) hue-rotate(184deg) brightness(104%) contrast(68%)");
    document.documentElement.style.setProperty("--filter", "invert(33%) sepia(0%) saturate(19%) hue-rotate(143deg) brightness(102%) contrast(86%)")
  } else {
    // light theme
    document.documentElement.style.setProperty("--background", "#ffffff");
    document.documentElement.style.setProperty("--text", "#000000");
    document.documentElement.style.setProperty("--border", "#9e9e9e");
    document.documentElement.style.setProperty("--shadow", "#d9d9d9");
    document.documentElement.style.setProperty("--text-light", "#4f4f4f");
    document.documentElement.style.setProperty("--accent", "#ffef42");
    document.documentElement.style.setProperty("--tag", "#5294ff");
    document.documentElement.style.setProperty("--icon-filter", "brightness(0)");
    document.documentElement.style.setProperty("--filter", "invert(69%) sepia(0%) saturate(0%) hue-rotate(2deg) brightness(92%) contrast(89%)")
  }
}

function updateTheme() {
  if (getCookie("theme")) {
    eraseCookie("theme")
  } else {
    setCookie("theme", "dark")
    
  }
  setTheme(getCookie("theme"))
  updateThemeButton()
}

function updateThemeButton() {
  const theme = document.querySelector("#theme")
  if (getCookie("theme")) {
    theme.innerHTML = "Light Mode"
  } else {
    theme.innerHTML = "Dark Mode"
  }
}
