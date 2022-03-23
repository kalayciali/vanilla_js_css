class App {

  constructor(albumElem, modalElem) {
    this.albumElem = albumElem;
    this.modalElem = modalElem;

    this.onModalExit= this.onModalExit.bind(this);
    this.onModalEnter = this.onModalEnter.bind(this);

    document.addEventListener('modal-enter', this.onModalEnter)
    modalElem.addEventListener('pointerdown', this.onModalExit)

    this.thumbnails = [];
    this.fillAlbum();
    this.modal = null;


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
    this.modalElem.focus(); // for keyboard actions
    this.modalElem.style.top = window.pageYOffset + 'px';

    this.modal = new ModalPhoto(event.detail)
    this.modalElem.append(this.modal.image)
    this.modalElem.classList.remove('hidden')

  }

  onModalExit() {
    document.body.classList.remove('no-scroll')
    this.modalElem.classList.add('hidden');
    this.modalElem.innerHTML = '';
    this.modal = null;
  }


}
