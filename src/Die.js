export default class Die {
  constructor(faces) {
    this.faces = faces;
    this.value = 0;
  }

  roll() {
    let final = Math.ceil(Math.random() * this.faces);
    return final;
   }

  
}
