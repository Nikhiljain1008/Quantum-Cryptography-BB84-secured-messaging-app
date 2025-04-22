import React from 'react';

function SampleErrorRateGraph({ aliceBits, bobBits, sampleCheck }) {
  if (sampleCheck.length === 0) return null;

  const errors = sampleCheck.filter(i => aliceBits[i] !== bobBits[i]).length;
  const rate = ((errors / sampleCheck.length) * 100).toFixed(1);

  return (
    <div>
      <h3>Sample Error Rate</h3>
      <p>{errors} / {sampleCheck.length} = <strong>{rate}%</strong></p>
      <div style={{ width: '200px', background: '#ddd', height: '20px' }}>
        <div style={{ width: `${rate}%`, background: 'red', height: '100%' }}></div>
      </div>
      <p>{rate > 10 ? '❌ Possible Eavesdropping Detected!' : '✅ Channel Secure'}</p>
    </div>
  );
}

export default SampleErrorRateGraph;