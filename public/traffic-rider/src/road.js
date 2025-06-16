import * as THREE from 'three';

export class Road {
  constructor(scene) {
    this.segments = [];
    for (let i = 0; i < 10; i++) {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 20),
        new THREE.MeshStandardMaterial({ color: '#333' })
      );
      plane.rotation.x = -Math.PI / 2;
      plane.position.z = -i * 20;
      scene.add(plane);
      this.segments.push(plane);
    }
  }

  update(bikeZ) {
    for (let segment of this.segments) {
      if (bikeZ - segment.position.z < -30) {
        segment.position.z -= this.segments.length * 20;
      }
    }
  }
}