
import {  useGLTF } from '@react-three/drei';

function Skybox() {
    const { scene } = useGLTF('/skybox/skybox.glb'); // Ajusta la ruta según la ubicación de tu archivo .glb

  return <primitive object={scene} scale={[100, 100, 100]} />;
}

export default Skybox;
