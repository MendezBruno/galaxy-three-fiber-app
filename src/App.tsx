import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OrbitalSpheres from './components/OrbitalSpheres';
import Skybox from './components/Skybox';
import SolarSystemInfo, { ISolarSystemInfo } from './components/SolarSystemInfo';
import DaySelector from './components/DaySelector';

// Mock data for Solar System Info
const mockData = {
  solarDate: 0,
  rainyDay: false,
  drought: true,
  cnpt: false,
  rainFactor: 0.0
};


const App: React.FC = () => {

  const [solarSystemInfo, setSolarSystemInfo] = useState<ISolarSystemInfo>(mockData);
  const [showDaySelector, setShowDaySelector] = useState<boolean>(false);
  const [angles, setAngles] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        setShowDaySelector(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleSelectDay = async (day: number) => {
    try {
      const [solarSystemInfoResponse, posPlanetDayResponse] = await Promise.all([
        fetch(`http://localhost:8080/api/solarSystem/date/${day}`),
        fetch(`http://localhost:8080/api/posPlanetDay/date/${day}`)
      ]);

      const solarSystemInfoData = await solarSystemInfoResponse.json();
      const posPlanetDayData = await posPlanetDayResponse.json();

      
      setSolarSystemInfo({ ...solarSystemInfoData });

      setAngles(calculateAngles(posPlanetDayData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDaySelector = () => {
    setShowDaySelector(false);
  };


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [-10, 20, 30], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Skybox />
        <OrbitalSpheres angles={angles}  solarSystemInfo={solarSystemInfo}/>
        <OrbitControls />
      </Canvas>
        <SolarSystemInfo 
        solarDate={solarSystemInfo.solarDate}
        rainyDay={solarSystemInfo.rainyDay}
        drought={solarSystemInfo.drought}
        cnpt={solarSystemInfo.cnpt}
        rainFactor={solarSystemInfo.rainFactor}
        />
      {showDaySelector && <DaySelector onSelectDay={handleSelectDay} onClose={handleCloseDaySelector} />}

    </div>
  );
}

// Helper function to calculate angles from PosPlanetDay data
function calculateAngles(data: { currentPI: number }[]): number[] {
  return [data[0].currentPI, data[2].currentPI, data[1].currentPI];
}


export default App;
