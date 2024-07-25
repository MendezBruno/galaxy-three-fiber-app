// components/SolarSystemInfo.tsx
import React from 'react';

export interface ISolarSystemInfo {
  solarDate: number;
  rainyDay: boolean;
  drought: boolean;
  cnpt: boolean;
  rainFactor: number;
}

interface SolarSystemInfoProps extends ISolarSystemInfo {}


const SolarSystemInfo: React.FC<SolarSystemInfoProps> = ({ solarDate, rainyDay, drought, cnpt, rainFactor }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: '8px', position: 'absolute', top: '10px', right: '10px' }}>
      <h3>Solar System Info</h3>
      <p>Date: {solarDate}</p>
      <p>Rainy Day: {rainyDay ? 'Yes' : 'No'}</p>
      <p>Drought: {drought ? 'Yes' : 'No'}</p>
      <p>CNPT: {cnpt ? 'Yes' : 'No'}</p>
      <p>Rain Factor: {rainFactor}</p>
    </div>
  );
}

export default SolarSystemInfo;
