class ModalPhoto {

  constructor(index) {

    this.index = index;
    this.image = document.createElement('img');
    this.image.src = PHOTO_LIST[index]

    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragAfter = this.dragAfter.bind(this);
    this.dragLimit = 30; // 30px drag limit to change image

    this.onKeyUp = this.onKeyUp.bind(this);

    this.startPos = null;

    window.addEventListener('keyup', this.onKeyUp)

    this.image.addEventListener('pointerdown', this.dragStart)
    this.image.addEventListener('pointermove', this.dragMove)
    this.image.addEventListener('pointerup', this.dragAfter)
    this.image.addEventListener('pointercancel', this.dragAfter)

  }

  checkIndex() {

    if (this.index < 0) {
      this.index = PHOTO_LIST.length - 1;
    }

    if (this.index === PHOTO_LIST.length) {
      this.index = 0;
    }
  }

  onIndexChange(classStr) {
    this.image.src = PHOTO_LIST[this.index];
    this.image.classList.remove(...this.image.classList);
    this.image.classList.add(classStr);
    this.image.style.transform = '';
  }

  onKeyUp(event) {

    let classStr = ''
    switch(event.key) {
      case "ArrowRight":
        this.index++
        classStr += 'animate-next'
        break;

      case "ArrowLeft":
        this.index--;
        classStr += 'animate-prev'
        break;

      case "Escape":
        document.dispatchEvent(new CustomEvent('modal-exit'))
        break;
    }

    this.updateImg(classStr)
  }


  dragStart(event) {
    event.preventDefault();
    event.stopPropagation();

    this.image.setPointerCapture(event.pointerId);
    this.startPos = event.clientX;
  }

  dragMove(event) {
    if (this.startPos) {
      let deltaX = event.clientX - this.startPos;
      this.image.style.transform = 'translateX(' +  deltaX + 'px)';
    }

  }

  updateImg(classStr)
  {
    this.checkIndex();
    this.onIndexChange(classStr);
  }

  dragAfter(event) {

    if (!this.startPos) {
      return;
    }

    let deltaX = event.clientX - this.startPos;
    this.startPos = null;

    let classStr = '';

    if (Math.abs(deltaX) > this.dragLimit) {

      if (deltaX < 0) {
        this.index++;
        classStr += 'animate-next'
      } else {
        this.index--;
        classStr += 'animate-prev'
      }

    this.updateImg(classStr)

    } else {
      this.image.style.transform = '';
    }
  }
}
