((doc, win) => {
  const Ele = doc.documentElement
  const screenMonitor = 'orientationchange' in win ? 'orientationchange' : 'resize'
  const recalc = () => {
    let Width = Ele.clientWidth
    if (!Width) {
      return
    }
    Ele.style.fontSize = `${20*(Width/100)}px`
  }
  win.addEventListener(screenMonitor,recalc,false)
  doc.addEventListener('DOMContentLoaded',recalc,false)
})(document, window)