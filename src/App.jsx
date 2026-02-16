import React, { useState } from 'react';
import './App.css';
import { SYMPTOMS } from './data/symptoms';
import { getStepsAndMeta } from './utils/protocols';

const EMERGENCY = { MDA: '101', POLICE: '100' };

function MainMenu({ searchTerm, onSearchChange, onSelectSymptom, getLocation, loadingLocation, locationInfo }) {
  const filtered = Object.keys(SYMPTOMS).filter((n) => n.includes(searchTerm));
  return (
    <div>
      <div className="location-container">
        <button onClick={getLocation} className="location-button">
          📍 {loadingLocation ? 'מחפש...' : 'איפה אני?'}
        </button>
        {locationInfo && <div className="location-text">{locationInfo}</div>}
      </div>

      <input
        className="search-input"
        placeholder="חפש תרחיש..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {filtered.map((name) => (
        <button key={name} className="menu-button" onClick={() => onSelectSymptom(name)}>
          {name}
        </button>
      ))}
    </div>
  );
}

function SubCategoryPicker({ subOptions, onSelectSub, onClose }) {
  return (
    <div className="protocol-box">
      <button onClick={onClose} className="close-btn">
        ✕ סגור
      </button>
      <h3>בחר סוג מטופל:</h3>
      {Object.keys(subOptions).map((sub) => (
        <button key={sub} className="sub-button" onClick={() => onSelectSub(sub)}>
          {sub}
        </button>
      ))}
    </div>
  );
}

function ProtocolView({ title, steps, onBack, onSpeak }) {
  return (
    <div className="protocol-box">
      <button onClick={onBack} className="back-link">
        ← חזור לתפריט
      </button>
      <h2>{title}</h2>
      <button onClick={() => onSpeak(steps)} className="voice-button">
        🔊 השמע הנחיות
      </button>
      <ul>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const resetAll = () => {
    window.speechSynthesis.cancel();
    setSelectedSymptom(null);
    setSelectedSubCategory(null);
  };

  const speak = (steps) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(steps.join('. '));
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  const getLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationInfo(
          `קו רוחב: ${pos.coords.latitude.toFixed(5)}, קו אורך: ${pos.coords.longitude.toFixed(5)}`
        );
        setLoadingLocation(false);
      },
      () => {
        setLocationInfo('שגיאה בזיהוי מיקום');
        setLoadingLocation(false);
      }
    );
  };

  const view = getStepsAndMeta(SYMPTOMS, selectedSymptom, selectedSubCategory);

  return (
    <div className="app-container">
      <h1 className="main-title">🚑 עזרה ראשונה </h1>
      {!selectedSymptom && (
        <MainMenu
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectSymptom={setSelectedSymptom}
          getLocation={getLocation}
          loadingLocation={loadingLocation}
          locationInfo={locationInfo}
        />
      )}
      {selectedSymptom && view.isSubMenu && (
        <SubCategoryPicker
          subOptions={SYMPTOMS[selectedSymptom].subOptions}
          onSelectSub={setSelectedSubCategory}
          onClose={resetAll}
        />
      )}
      {selectedSymptom && view.steps.length > 0 && (
        <ProtocolView
          title={view.title}
          steps={view.steps}
          onBack={resetAll}
          onSpeak={speak}
        />
      )}

      <div className="footer">
        <button
          onClick={() => window.open(`tel:${EMERGENCY.MDA}`)}
          className="btn-mda"
        >
          🚑 מד"א (101)
        </button>
        <button
          onClick={() => window.open(`tel:${EMERGENCY.POLICE}`)}
          className="btn-police"
        >
          👮 משטרה (100)
        </button>
      </div>
    </div>
  );
}

export default App;
