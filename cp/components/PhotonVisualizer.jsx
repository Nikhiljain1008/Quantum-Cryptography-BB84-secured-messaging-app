import React from 'react';

function PhotonVisualizer({ aliceBits, aliceBases, bobBases, eveEnabled }) {
  return (
    <div>
      <h3>Photon Stream</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {aliceBits.map((bit, i) => (
          <div key={i} style={{ margin: '5px', textAlign: 'center' }}>
            <div>
              🔦 {bit} ({aliceBases[i]})
              {eveEnabled && ' 👁️'}
            </div>
            <div>📩 {bobBases[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotonVisualizer;