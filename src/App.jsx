function App() {
  // This is our data "object" for one emergency
  const emergency = {
    title: "Choking",
    action: "Give 5 back blows and 5 abdominal thrusts.",
    severity: "Critical"
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>First Aid Helper</h1>
      
      {/* This is our first 'Card' */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        borderRadius: '8px',
        backgroundColor: '#fff1f1' 
      }}>
        <h2 style={{ color: 'red' }}>{emergency.title}</h2>
        <p><strong>What to do:</strong> {emergency.action}</p>
        <span style={{ fontSize: '12px', color: '#666' }}>Status: {emergency.severity}</span>
      </div>
    </div>
  );
}

export default App;