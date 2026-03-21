import * as THREE from "three";

export interface PhysicsObject {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  oscillationOffset: number;
  oscillationSpeed: number;
  initialPosition: THREE.Vector3;
}

export class GravityPhysics {
  private gravityStrength: number = 0.8;
  private gravityRadius: number = 3;
  private damping: number = 0.92;
  private maxVelocity: number = 1.5;
  private amplitude: number = 0.2;

  update(
    objects: PhysicsObject[],
    mousePos: THREE.Vector3,
    time: number,
    delta: number
  ) {
    objects.forEach((obj) => {
      // 1. Idle Motion (Vertical Oscillation)
      // We apply this to the target position to keep the physics fluid
      const targetY = obj.initialPosition.y + Math.sin(time * obj.oscillationSpeed + obj.oscillationOffset) * this.amplitude;
      
      // Gentle spring force back to initial/oscillating position
      const springForce = new THREE.Vector3(
        obj.initialPosition.x - obj.position.x,
        targetY - obj.position.y,
        obj.initialPosition.z - obj.position.z
      ).multiplyScalar(0.05);
      
      obj.velocity.add(springForce);

      // 2. Gravity Interaction
      const distToMouse = obj.position.distanceTo(mousePos);
      if (distToMouse < this.gravityRadius) {
        // force = (cursorPosition - objectPosition) * gravityStrength
        const force = new THREE.Vector3()
          .subVectors(mousePos, obj.position)
          .multiplyScalar(this.gravityStrength * (1 - distToMouse / this.gravityRadius));
        
        // Apply force over time
        obj.velocity.add(force.multiplyScalar(delta * 2));
      }

      // 3. Velocity Damping & Clamping
      obj.velocity.multiplyScalar(this.damping);
      obj.velocity.clampLength(0, this.maxVelocity);

      // 4. Update Position
      obj.position.add(obj.velocity);
    });
  }
}
