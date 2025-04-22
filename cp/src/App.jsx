import React, { useState } from 'react';
import BB84Simulator from '../components/BB84Simulator';
import PhotonVisualizer from '../components/PhotonVisualizer';
import BitComparisonTable from '../components/BitComparisonTable';
import EveToggleSwitch from '../components/EveToggleSwitch';
import SampleErrorRateGraph from '../components/SampleErrorRateGraph';

function App() {
  const [eveEnabled, setEveEnabled] = useState(false);
  const [simulationData, setSimulationData] = useState(null);

  // Callback function to run simulation and set the result
  const handleRunSimulation = (result) => {
    setSimulationData(result);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🔐 BB84 Quantum Key Distribution Simulation</h1>
      <EveToggleSwitch enabled={eveEnabled} toggle={() => setEveEnabled(!eveEnabled)} />

      {/* Pass the eveEnabled state and handle the simulation callback */}
      <BB84Simulator
        bitCount={20}
        eveEnabled={eveEnabled}
        onSimulationComplete={handleRunSimulation}
      />

      {simulationData && (
        <>
          <PhotonVisualizer
            aliceBits={simulationData.aliceBits}
            aliceBases={simulationData.aliceBases}
            bobBases={simulationData.bobBases}
            eveEnabled={eveEnabled}
          />
          <BitComparisonTable
            aliceBits={simulationData.aliceBits}
            aliceBases={simulationData.aliceBases}
            bobBits={simulationData.bobBits}
            bobBases={simulationData.bobBases}
            matchingIndices={simulationData.matchingIndices}
            sampleCheck={simulationData.sampleIndices}
          />
          <SampleErrorRateGraph
            aliceBits={simulationData.aliceBits}
            bobBits={simulationData.bobBits}
            sampleCheck={simulationData.sampleIndices}
          />
        </>
      )}
    </div>
  );
}

export default App;
