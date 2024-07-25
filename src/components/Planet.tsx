import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Vector3 } from 'three';

interface PlanetProps {
  position: Vector3;
}

const Planet: React.FC<PlanetProps> = ({ position }) => {
  return (
    <Sphere position={position} visible args={[1, 100, 200]} scale={1}>
      <MeshDistortMaterial color="#8352FD" attach="material" distort={0.3} speed={2} />
    </Sphere>
  );
};

export default Planet;
