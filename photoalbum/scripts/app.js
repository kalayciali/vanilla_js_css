class App {

  constructor(albumElem, modalElem) {
    this.albumElem = albumElem;
    this.modalElem = modalElem;

    this.onModalExit= this.onModalExit.bind(this);
    this.onModalEnter = this.onModalEnter.bind(this);

    document.addEventListener('modal-enter', this.onModalEnter)
    document.addEventListener('modal-exit', this.onModalExit )
    modalElem.addEventListener('pointerdown', this.onModalExit)

    this.thumbnails = [];
    this.fillAlbum();
    this.modalScreen = null;
  }

  fillAlbum() {
    for (let i = 0; i < PHOTO_LIST.length; i++) {
      const photo = new ThumbnailPhoto(i);
      this.albumElem.append(photo.image)
      this.thumbnails.push(photo);
    }
  }


  onModalEnter(event) {

    document.body.classList.add('no-scroll')
    this.modalElem.focus(); 
    this.modalElem.style.top = window.pageYOffset + 'px';

    this.modalScreen = new ModalPhoto(event.detail)
    this.modalElem.append(this.modalScreen.image)
    this.modalElem.classList.remove('hidden')

  }

  onModalExit() {
    document.body.classList.remove('no-scroll')
    this.modalElem.innerHTML = '';
    this.modalElem.classList.add('hidden');
    this.modalScreen = null;
  }


}
