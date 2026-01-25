import React, { useState } from 'react';


const SYMPTOMS = {
  "שימוש במפעם (דפיברילטור)":{
    steps: ["המכשיר קל לשימוש ומנחה אתכם קולית.", 
      "הדביקו את המדבקות לפי האיורים שעליהן", 
      "המכשיר ינתח את מצב הלב וייתן הוראות ברורות, כולל מתן שוק חשמלי אם נדרש."
    ]
  },
  "ביצוע החייאה": {
    isCategory: true, // תפריט בחירה
    subOptions: {
      "מבוגר (מעל גיל 8)": {
        steps: [
          "הזעק עזרה - אם המטופל לא מגיב - חייג 101 למגן דוד אדום",
          "אם ניתן- בקש להביא דפיברילטור",
          "וודא בטיחות שלך ושל הפצוע",
          "בדוק הכרה (קרא בשמו וצבוט בטרפזים-אזור הכתפיים)",
          "בדוק נשימה (הטיית ראש אחורה)",
          " בצע 30 עיסויי חזה- הנח את 2 כפות הידיים אחת על גבי השניה במרכז החזה.לחץ חזק כלפי מטה (בעומק 5-6 ס״מ) ומהר- בקצב של בין 100 ל120- בדקה ",
          "פתח נתיב אוויר - סלק הפרשות (אם קיימות) הטה את ראשו של המטופל לאחור והרם את הסנטר",
          "בצע 2 הנשמות (אם עברת קורס החייאה- אחרת המשך בעיסויים)",
          "המשך בסבבים של 30:2 עד הגעת מד״א"
        ],
        color: "#d32f2f"
      },
      "ילד או תינוק": {
        steps: [
          "הזעק עזרה - אם המטופל לא מגיב - חייג 101 למגן דוד אדום",
          "אם ניתן- בקש להביא דפיברילטור",
          "וודא בטיחות שלך ושל הפצוע",
          "בדוק הכרה (בתינוק: שפשוף כף הרגל)",
          "בצע 30 עיסויי חזה: בתינוק (עד גיל שנה) - בצע עיסויי חזה באמצעות 2 אצבעות או 2 אגודלים. בילדים (מעל גיל שנה ועד הופעת סימני התבגרות) - בצע עיסויי חזה באמצעות יד אחת או שתיים בהתאם לגודל המטופל",
          "לחץ במרכז בית החזה כלפי מטה, לעומק של 1/3 מעומק בית החזה לפחות ומהר בקצב של בין 100 ל120- בדקה",
          "פתח נתיב אוויר - סלק הפרשות (אם קיימות) הטה את ראשו של המטופל לאחור והרם את הסנטר",
          "(אם עברת קורס החייאה, אחרת- המשך בעיסויים) בצע 2 הנשמות",
          "המשך בסבבים של 30:2 עד הגעת מד״א"
        ],
        color: "#f57c00"
      }
    }
  },
  "חנק מגוף זר": {
    steps: [
      "התקשר למד׳׳א",
      "עודד שיעול",
      "יש לבצע 4-6 לחיצות ברום הבטן (היימליך)- בילדים מעל גיל שנה ובמבוגרים, או 4-6 לחיצות במרכז בית החזה וטפיחות בין השכמות בתינוקות",
      "חזור על הפעולה עד ליציאת הגוף הזר",
      "אם הגוף הזר לא יצא- והנפגע מחוסר הכרה- יש לבצע פעולות החייאה",
      "יש להמשיך בביצוע לחיצות ברום הבטן (היימליך)/ לחיצות חזה עד להגעת צוות מד׳׳א",
      "אם הגוף הזר נפלט והנפגע חזר לנשום יש להמשיך להשגיח עליו עד להגעת צוות"
    ],
    color: "#f57c00"
  },
  "עילפון": {
    steps: [
      "השכב את הנפגע על הגב",
      "הרם רגליים ב-30 מעלות",
      " שחרר בגדים לוחצים",
      "הטה ראש לצד אם יש חשש לקיא",
      "אם ההכרה אינה שבה מיד לאחר השכבתו, בדוק האם הנפגע נושם או מראה סימני חיים. אם לא, התחל לבצע פעולות החייאה!"
    ],
    color: "#1976d2"
  }
};

function App() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const resetAll = () => {
    window.speechSynthesis.cancel();
    setSelectedSymptom(null);
    setSelectedSubCategory(null);
  };

  const speak = (steps) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(steps.join(". "));
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  const renderContent = () => {
    if (!selectedSymptom) {
      return (
        <div>
          <p style={{ textAlign: 'center', color: '#666' }}>בחר את תרחיש החירום:</p>
          {Object.keys(SYMPTOMS).map((name) => (
            <button key={name} onClick={() => setSelectedSymptom(name)} style={menuButtonStyle}>
              {name}
            </button>
          ))}
        </div>
      );
    }

    const currentData = SYMPTOMS[selectedSymptom];

    if (currentData.isCategory && !selectedSubCategory) {
      return (
        <div style={{ textAlign: 'center' }}>
          <button onClick={resetAll} style={{ float: 'left', border:'none', background:'none', fontSize:'20px', cursor:'pointer' }}>✕</button>
          <h3 style={{marginTop:'40px'}}>בחר סוג מטופל:</h3>
          {Object.keys(currentData.subOptions).map((sub) => (
            <button key={sub} onClick={() => setSelectedSubCategory(sub)} style={subButtonStyle}>
              {sub}
            </button>
          ))}
        </div>
      );
    }

    const finalSteps = selectedSubCategory 
      ? currentData.subOptions[selectedSubCategory].steps 
      : currentData.steps;
    const finalColor = selectedSubCategory 
      ? currentData.subOptions[selectedSubCategory].color 
      : currentData.color;

    return (
      <div style={{ border: '3px solid ' + finalColor, padding: '20px', borderRadius: '16px', backgroundColor: '#fff' }}>
        <button onClick={resetAll} style={{ cursor: 'pointer', marginBottom: '10px' }}>← חזור לתפריט</button>
        <h2 style={{ color: finalColor, marginTop: '10px' }}>{selectedSubCategory || selectedSymptom}</h2>
        <button onClick={() => speak(finalSteps)} style={voiceButtonStyle}>🔊 השמע הנחיות</button>
        <ul style={{ paddingRight: '20px' }}>
          {finalSteps.map((s, i) => <li key={i} style={{ marginBottom: '15px', fontSize: '18px', lineHeight: '1.4' }}>{s}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ direction: 'rtl', padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif', paddingBottom: '120px' }}>
      <h1 style={{ textAlign: 'center', color: '#d32f2f' }}>🚑 עזרה ראשונה מהירה</h1>
      
      {renderContent()}

      {/* כפתורי חירום קבועים */}
      <div style={footerStyle}>
        <button onClick={() => window.open('tel:101')} style={mdaButtonStyle}>🚑 מד"א (101)</button>
        <button onClick={() => window.open('tel:100')} style={policeButtonStyle}>👮 משטרה (100)</button>
      </div>
    </div>
  );
}

// הגדרות עיצוב (Styles)
const menuButtonStyle = { display: 'block', width: '100%', padding: '15px', margin: '10px 0', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', border: '1px solid #ccc', backgroundColor: 'white', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
const subButtonStyle = { display: 'block', width: '100%', padding: '20px', margin: '15px 0', fontSize: '20px', backgroundColor: '#f0f0f0', border: '2px solid #ccc', borderRadius: '12px', cursor: 'pointer' };
const voiceButtonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold', cursor: 'pointer' };
const footerStyle = { position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: 'white', padding: '15px', display: 'flex', gap: '10px', borderTop: '1px solid #ddd', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '0 auto' };
const mdaButtonStyle = { flex: 1, padding: '15px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' };
const policeButtonStyle = { flex: 1, padding: '15px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' };

export default App;