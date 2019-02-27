export default class Die {
  constructor(faces) {
    this.faces = faces;
    this.value = 0;
  }

  roll() {
    return Math.ceil(Math.random() * this.faces);
  }
}
