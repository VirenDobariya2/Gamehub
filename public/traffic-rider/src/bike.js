import * as THREE from 'three';

export class Bike {
  constructor(scene, camera) {
    this.speed = 0;
    this.maxSpeed = 100;
    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 2),
      new THREE.MeshStandardMaterial({ color: 'red' })
    );
    this.model.position.y = 0.5;

    scene.add(this.model);
    this.camera = camera;
  }

  update(delta, input) {
    if (input.forward) this.speed += delta * 30;
    else this.speed -= delta * 20;

    this.speed = THREE.MathUtils.clamp(this.speed, 0, this.maxSpeed);

    if (input.left) this.model.position.x -= delta * 5;
    if (input.right) this.model.position.x += delta * 5;

    this.model.position.z -= this.speed * delta;

    this.camera.position.set(this.model.position.x, 5, this.model.position.z + 10);
    this.camera.lookAt(this.model.position);
  }
}