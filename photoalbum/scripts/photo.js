function createImage(src, index) {
  const image = document.createElement('img');
  image.src = src;
  image.dataset.index = index;
  return image;
}

function changeModalImg(classStr) {
  let src = PHOTO_LIST[photoIndex]
  const image = createImage(src, photoIndex);
  image.classList.add(classStr)
  addDragEvents(image);
  modalView.innerHTML = '';
  modalView.appendChild(image);
}

function addDragEvents(image) {
  image.addEventListener('pointerdown', startDrag)
  image.addEventListener('pointermove', dragImage)
  image.addEventListener('pointerup', afterDrag)
  image.addEventListener('pointercancel', afterDrag)
}


function onThumbClick(event) {
  photoIndex = parseInt(event.currentTarget.dataset.index);
  const image = createImage(event.currentTarget.src, photoIndex);
  // add image element drag events
  addDragEvents(image);
  document.body.classList.add('no-scroll')
  modalView.focus(); // for keyboard actions
  modalView.style.top = window.pageYOffset + 'px';
  modalView.appendChild(image)
  modalView.classList.remove('hidden')
}

function onModalClick() {
  document.body.classList.remove('no-scroll')
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
}

function onKeyUp(event) {
  switch(event.key) {
    case "ArrowRight":
      photoIndex++
      if (photoIndex === PHOTO_LIST.length) {
        photoIndex = 0;
      }
      changeModalImg()

      break;
    case "ArrowLeft":
      photoIndex--;
      if (photoIndex < 0) {
        photoIndex = PHOTO_LIST.length - 1;
      }
      changeModalImg()
      break;
    case "Escape":
      onModalClick()
      break;

  }
}

function startDrag(event) {
  event.preventDefault()
  event.stopPropagation();
  
  event.target.setPointerCapture(event.pointerId);

  startPos = event.clientX;
}

function dragImage(event) {
  if (startPos) {
    let deltaX = event.clientX - startPos;
    event.currentTarget.style.transform = 'translateX(' +  deltaX + 'px)';
  }
}

function afterDrag(event) {
  if (!startPos) {
    return;
  }

  let deltaX = event.clientX - startPos;
  startPos = null;

  let element = event.currentTarget;
  let exceededLimit = false;
  let limit = 40; // 20 px limit
  let classStr = '';

  if (Math.abs(deltaX) > limit) {
    if (deltaX < 0) {
      photoIndex++;
      classStr += 'animate-next'
    } else {
      photoIndex--;
      classStr += 'animate-prev'
    }

    if (photoIndex < 0) {
      photoIndex = PHOTO_LIST.length - 1;
    }

    if (photoIndex === PHOTO_LIST.length) {
      photoIndex = 0;
    }

    exceededLimit = true;

  } else {
    element.style.transform = '';
  }

  if (exceededLimit) {
    changeModalImg(classStr)
  }
}

const albumView = document.querySelector('#album-view');

for (let i = 0; i < PHOTO_LIST.length; i++) {
  const photoSrc = PHOTO_LIST[i];
  const image = createImage(photoSrc, i)
  image.addEventListener('click', onThumbClick);
  albumView.appendChild(image);
}

let photoIndex;
let startPos = null;
const modalView = document.querySelector('#modal-view')
modalView.addEventListener('pointerdown', onModalClick)
window.addEventListener('keyup', onKeyUp)

