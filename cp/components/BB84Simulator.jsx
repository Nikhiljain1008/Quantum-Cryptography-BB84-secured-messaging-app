// === BB84Simulator.jsx ===
import React, { useState } from 'react';
import PhotonVisualizer from './PhotonVisualizer.jsx';
import BitComparisonTable from './BitComparisonTable.jsx';
import EveToggleSwitch from './EveToggleSwitch.jsx';
import SampleErrorRateGraph from './SampleErrorRateGraph.jsx';

const generateRandomBits = (n) => Array.from({ length: n }, () => Math.round(Math.random()));
const generateRandomBases = (n) => Array.from({ length: n }, () => (Math.random() > 0.5 ? '+' : 'x'));
const measurePhoton = (bit, aliceBasis, bobBasis) => {
  if (aliceBasis === bobBasis) return bit;
  return Math.round(Math.random());
};

function BB84Simulator({ eveEnabled, bitCount }) {
  // const [bitCount, setBitCount] = useState();
  // const [eveEnabled, setEveEnabled] = useState(false);
  const [aliceBits, setAliceBits] = useState([]);
  const [aliceBases, setAliceBases] = useState([]);
  const [bobBases, setBobBases] = useState([]);
  const [bobBits, setBobBits] = useState([]);
  const [matchingIndices, setMatchingIndices] = useState([]);
  const [sampleCheck, setSampleCheck] = useState([]);

  const runSimulation = () => {
    const aBits = generateRandomBits(bitCount);
    const aBases = generateRandomBases(bitCount);
    const bBases = generateRandomBases(bitCount);
    let bBits = [];

    for (let i = 0; i < bitCount; i++) {
      let bitToBob = aBits[i];
      let basisToBob = aBases[i];

      if (eveEnabled) {
        const eveBasis = Math.random() > 0.5 ? '+' : 'x';
        const eveBit = measurePhoton(bitToBob, basisToBob, eveBasis); // Eve collapses the state
        bitToBob = eveBit;
        basisToBob = eveBasis;
      }

      bBits.push(measurePhoton(bitToBob, basisToBob, bBases[i]));
    }

    // Basis matching
    let matchIndices = [];
    for (let i = 0; i < bitCount; i++) {
      if (aBases[i] === bBases[i]) matchIndices.push(i);
    }

    // Sample check (public comparison)
    const sample = matchIndices.slice(0, Math.floor(matchIndices.length * 0.3));

    setAliceBits(aBits);
    setAliceBases(aBases);
    setBobBases(bBases);
    setBobBits(bBits);
    setMatchingIndices(matchIndices);
    setSampleCheck(sample);

    onSimulationComplete({
      aliceBits: aBits,
      aliceBases: aBases,
      bobBases: bBases,
      bobBits: bBits,
      matchingIndices: matchIndices,
      sampleIndices: sample,
    });
  };
                                      
  return (
    <div>
      <h2>BB84 Protocol Simulation</h2>
      <label>
        Number of Bits:
        <input
          type="number"
          value={bitCount}
          onChange={(e) => setBitCount(parseInt(e.target.value))}
        />
      </label>
      <EveToggleSwitch enabled={eveEnabled} toggle={() => setEveEnabled(!eveEnabled)} />
      <button onClick={runSimulation}>Start Simulation</button>
      <PhotonVisualizer
        aliceBits={aliceBits}
        aliceBases={aliceBases}
        bobBases={bobBases}
        eveEnabled={eveEnabled}
      />
      <BitComparisonTable
        aliceBits={aliceBits}
        aliceBases={aliceBases}
        bobBits={bobBits}
        bobBases={bobBases}
        matchingIndices={matchingIndices}
        sampleCheck={sampleCheck}
      />
      <SampleErrorRateGraph
        aliceBits={aliceBits}
        bobBits={bobBits}
        sampleCheck={sampleCheck}
      />
    </div>
  );
}

export default BB84Simulator;
