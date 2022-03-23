class ThumbnailPhoto {

  constructor(index, onClick) {
    this.index = index;
    this.image = document.createElement('img');
    this.image.src = PHOTO_LIST[index]

    this.onClick = this.onClick.bind(this);

    this.image.addEventListener('click', this.onClick);
  }

  onClick(event) {
    document.dispatchEvent(new CustomEvent('modal-enter', { detail: this.index }))
  }

}
