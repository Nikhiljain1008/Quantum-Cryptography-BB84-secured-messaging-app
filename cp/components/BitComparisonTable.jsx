import React from 'react';

function BitComparisonTable({ aliceBits, aliceBases, bobBits, bobBases, matchingIndices, sampleCheck }) {
  return (
    <div>
      <h3>Basis Comparison Table</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Index</th>
            <th>Alice Bit</th>
            <th>Alice Basis</th>
            <th>Bob Bit</th>
            <th>Bob Basis</th>
            <th>Match?</th>
            <th>Sample?</th>
          </tr>
        </thead>
        <tbody>
          {aliceBits.map((bit, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{bit}</td>
              <td>{aliceBases[i]}</td>
              <td>{bobBits[i]}</td>
              <td>{bobBases[i]}</td>
              <td>{aliceBases[i] === bobBases[i] ? '✅' : '❌'}</td>
              <td>{sampleCheck.includes(i) ? '🧪' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BitComparisonTable;