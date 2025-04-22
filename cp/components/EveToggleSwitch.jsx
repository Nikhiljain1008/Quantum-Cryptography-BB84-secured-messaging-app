import React from 'react';

function EveToggleSwitch({ enabled, toggle }) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={enabled} onChange={toggle} /> Enable Eve
      </label>
    </div>
  );
}

export default EveToggleSwitch;