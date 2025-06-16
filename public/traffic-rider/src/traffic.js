import * as THREE from 'three';

export class Traffic {
  constructor(scene) {
    this.scene = scene;
    this.cars = [];
    this.spawnInterval = 2;
    this.timer = 0;
  }

  spawnCar() {
    const geometry = new THREE.BoxGeometry(1.5, 1, 3);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa00 });
    const car = new THREE.Mesh(geometry, material);
    const lane = [-2, 0, 2][Math.floor(Math.random() * 3)];
    car.position.set(lane, 0.5, -100);
    this.scene.add(car);
    this.cars.push(car);
  }

  update(delta, bikeZ) {
    this.timer += delta;
    if (this.timer >= this.spawnInterval) {
      this.spawnCar();
      this.timer = 0;
    }

    for (let i = this.cars.length - 1; i >= 0; i--) {
      const car = this.cars[i];
      car.position.z += delta * 50;
      if (car.position.z > bikeZ + 10) {
        this.scene.remove(car);
        this.cars.splice(i, 1);
      }
    }
  }

  checkCollision(bikeMesh) {
    const bikeBox = new THREE.Box3().setFromObject(bikeMesh);
    for (let car of this.cars) {
      const carBox = new THREE.Box3().setFromObject(car);
      if (bikeBox.intersectsBox(carBox)) return true;
    }
    return false;
  }
}