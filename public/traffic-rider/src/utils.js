export class Input {
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;

    window.addEventListener("keydown", (e) => this.onKey(e, true));
    window.addEventListener("keyup", (e) => this.onKey(e, false));
  }

  onKey(event, isDown) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
        this.forward = isDown;
        break;
      case "ArrowLeft":
      case "a":
        this.left = isDown;
        break;
      case "ArrowRight":
      case "d":
        this.right = isDown;
        break;
    }
  }
}