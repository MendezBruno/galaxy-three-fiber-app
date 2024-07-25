import React from 'react';
import {  Vector3 } from 'three';
import { Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import Planet from './Planet'; // Importa el componente OrbitalSphere
import {ISolarSystemInfo} from './SolarSystemInfo';

interface OrbitalSpheresProps { 
    angles: number[];
    solarSystemInfo: ISolarSystemInfo; // Add typeOf SolarSystemInfo
}


const OrbitalSpheres: React.FC<OrbitalSpheresProps> = ({ angles, solarSystemInfo }) => {
//   const groupRef = useRef<Group>(null);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (groupRef.current) {
//       groupRef.current.rotation.y = t * 0.5; // Rotate the group over time
//     }
//   });
  const radius = [5,20,10]; // Base orbit radius
  const numSpheres = 3; // Number of spheres
  //const angleIncrement = (2 * Math.PI) / numSpheres; // Angle increment
  //const angleIncrement = Math.PI * 2

  const positions: Vector3[] = Array.from({ length: numSpheres }).map((_, i) => {
    //const angle = i * angleIncrement;
    const x = radius[i] * Math.cos(angles[i]);
    const z = radius[i] * Math.sin(angles[i]);
    return new Vector3(x, 0, z);
  });

  const orbits = positions.map((_, i) => {
    const points: [number, number, number][] = Array.from({ length: 120 }).map((_, j) => {
      const angle = (j / 100) * 2 * Math.PI;
      const x = radius[i] * Math.cos(angle);
      const z = radius[i] * Math.sin(angle);
      return [x, 0, z];
    });
    return <Line key={i} points={points} color="white" lineWidth={1} />;
  });

  const shouldHighlightLine = (i: number) => {
    switch (i) {
      case 0:
        return solarSystemInfo.rainyDay;
      case 1:
        return solarSystemInfo.drought;
      case 2:
        return solarSystemInfo.cnpt;
      default:
        return false;
    }
  };


  const lines = positions.map((pos, i) => (
    <Line
      key={`line-${i}`}
      points={[pos.toArray(), positions[(i + 1) % numSpheres].toArray()]}
      color={shouldHighlightLine(i) ? 'red' : 'white'}
      lineWidth={shouldHighlightLine(i) ? 2 : 1}
    />
  ));

  return (
    // <group ref={groupRef}>
    <group >
      {positions.map((pos, i) => (
        <Planet key={i} position={pos} />
      ))}
      {orbits}
      {lines}

      {/* Sun in the center */}
      <Sphere position={[0, 0, 0]} visible args={[1.5, 100, 200]} scale={1}>
        <MeshDistortMaterial color="yellow" attach="material" distort={0.3} speed={2} />
      </Sphere>
    </group>
  );
};

export default OrbitalSpheres;
