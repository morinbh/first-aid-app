//  "Blueprint" for all emergency cards
function EmergencyCard(props) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      marginBottom: '10px' 
    }}>
      <h2 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>{props.title}</h2>
      <p><strong>Steps:</strong> {props.action}</p>
    </div>
  );
}

//  main App
function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>First Aid Guide</h1>
      
      {/* 3. Now we can use the blueprint as many times as we want */}
      <EmergencyCard 
        title="Choking" 
        action="5 back blows and 5 abdominal thrusts." 
      />
      
      <EmergencyCard 
        title="Severe Bleeding" 
        action="Apply direct pressure with a clean cloth." 
      />

      <EmergencyCard 
        title="Burns" 
        action="Run under lukewarm water for at least 20 minutes." 
      />
    </div>
  );
}

export default App;