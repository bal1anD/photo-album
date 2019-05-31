
const srcs = []
let currentIndex = 0

function createImage (src) {
  const image = document.createElement('img')
  image.src = src
  return image
}

function createOrReplaceImage (src, elem) {
  let image = elem.querySelector('img')
  if (image) {
    image.src = src
  } else {
    image = document.createElement('img')
    image.src = src
  }
}
function viewAlbum (event) {
  modal.classList.add('hidden')
  modal.innerHTML = ''
  document.body.classList.remove('no-scroll')
  document.removeEventListener('keydown', move)
}

function viewModal (event) {
  const image = createImage(event.currentTarget.src)
  currentIndex = srcs.indexOf(event.currentTarget.src)
  modal.appendChild(image)
  modal.classList.remove('hidden')
  modal.style.top = window.pageYOffset + 'px'
  document.body.classList.add('no-scroll')
  document.addEventListener('keydown', move)
}

function goRight (event) {
  if (currentIndex === srcs.length - 1) return
  const image = srcs[++currentIndex]
  createOrReplaceImage(image, modal)
}

function goLeft (event) {
  if (currentIndex <= 0) return
  const image = srcs[--currentIndex]
  createOrReplaceImage(image, modal)
}

function move (event) {
  switch (event.key) {
    case 'ArrowRight': goRight(event)
      break
    case 'ArrowLeft': goLeft(event)
      break
    case 'Escape': viewAlbum()
      break
  }
}

const album = document.querySelector('#album-view')
PHOTO_LIST.forEach(photo => {
  const image = createImage(photo)
  image.addEventListener('click', viewModal)
  srcs.push(image.src)
  album.appendChild(image)
})

const modal = document.querySelector('#modal-view')
modal.addEventListener('pointerdown', viewAlbum)
