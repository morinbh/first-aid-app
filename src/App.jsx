import React, { useState } from 'react';


const SYMPTOMS = {
  "Chest Pain": {
    steps: ["Call an ambulance immediately", "Have the person sit in a comfortable position", "Loosen tight clothing", "Ask if they have nitroglycerin"],
    color: "#d32f2f"
  },
  "Shortness of Breath": {
    steps: ["Call emergency services", "Help them sit upright", "Check for an inhaler", "Keep them calm and warm"],
    color: "#1976d2"
  },
  "Fainting": {
    steps: ["Lay them on their back", "Raise their legs about 12 inches", "Check for breathing", "If they don't wake up in 1 minute, call 911"],
    color: "#f57c00"
  }
};

function App() {
  // We use 'useState' to remember what the user clicked
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  // Function to reset and go back to home
  const goBack = () => setSelectedSymptom(null);

  return (
    
      <div style={{ 
        padding: '20px', 
        maxWidth: '400px', 
        margin: '0 auto', 
        fontFamily: 'sans-serif',
        paddingBottom: '100px' // Extra space at bottom so buttons don't cover content
      }}>
        <h1 style={{textAlign: "center"}}>Emergency Help</h1>
    
        {/* MENU VIEW */}
        {!selectedSymptom ? (
          <div>
            <p style={{ textAlign: 'center', color: '#666' }}>Select a symptom for guidance:</p>
            {Object.keys(SYMPTOMS).map((name) => (
              <button 
                key={name}
                onClick={() => setSelectedSymptom(name)}
                style={{
                  display: 'block', width: '100%', padding: '15px',
                  margin: '10px 0', fontSize: '18px', cursor: 'pointer',
                  borderRadius: '8px', border: '1px solid #ccc', backgroundColor: 'white'
                }}
              >
                {name}
              </button>
            ))}
          </div>
        ) : (
          /* GUIDED STEPS VIEW */
          <div style={{ backgroundColor: '#fff', border: '2px solid ' + SYMPTOMS[selectedSymptom].color, padding: '20px', borderRadius: '12px' }}>
            <button onClick={goBack} style={{ marginBottom: '10px' }}>← Back</button>
            <h2 style={{ color: SYMPTOMS[selectedSymptom].color }}>{selectedSymptom}</h2>
            <ul style={{ paddingLeft: '20px' }}>
              {SYMPTOMS[selectedSymptom].steps.map((step, index) => (
                <li key={index} style={{ marginBottom: '15px', fontSize: '18px' }}>{step}</li>
              ))}
            </ul>
          </div>
        )}
    
        {/* FIXED BOTTOM BUTTONS - Always visible */}
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: 'white',
          padding: '15px',
          display: 'flex',
          gap: '10px',
          borderTop: '1px solid #ddd',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px', // Matches our app width
          margin: '0 auto'   // Centers the footer on desktop
        }}>
          <button 
            onClick={() => window.open('tel:101')}
            style={{
              flex: 1, padding: '15px', backgroundColor: '#d32f2f', color: 'white',
              border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px'
            }}
          >
            🚑 MDA (101)
          </button>
          
          <button 
            onClick={() => window.open('tel:100')}
            style={{
              flex: 1, padding: '15px', backgroundColor: '#1976d2', color: 'white',
              border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px'
            }}
          >
            👮 Police (100)
          </button>
        </div>
      </div>
    );
}

export default App;

