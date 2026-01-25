import React, { useState } from 'react';
import './App.css';


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
  "כוויות": {
    steps: [
      "הרחק את הנפגע ממקור החום",
      "שטוף את מקום הכוויה במים זורמים ופושרים (לא קרים מדי!)",
      "אין לפוצץ שלפוחיות",
      "אין למרוח משחות, גבינת לבן או שמן",
      "כסה את הכוויה בתחבושת סטרילית או בבד נקי",
      "בכוויות נרחבות או בכוויות בפנים/דרכי הנשימה - חייג 101"
    ],
    color: "#e67e22"
  },
  "הכשת נחש": {
    steps: [
      "השכב את הנפגע והרגע אותו - מנע תזוזה ככל הניתן",
      "קבע את האיבר המוכש",
      "הסר בגדים לוחצים או תכשיטים",
      "חייג מיד 101",
      "אין למצוץ את הארס, אין להניח חסם עורקים ואין לקרר את המקום",
      "נסה לצלם את הנחש מרחוק (אל תנסה לתפוס אותו!)"
    ],
    color: "#27ae60"
  },
  "דימום מהאף": {
    steps: [
      "השב את הנפגע והטה את ראשו מעט קדימה",
      "לחץ על כנפי האף (החלק הרך) למשך 10 דקות רצופות",
      "ניתן להניח רטייה קרה על גשר האף",
      "אם הדימום לא פוסק לאחר 20 דקות - פנה לעזרה רפואית"
    ],
    color: "#c0392b"
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
  const [searchTerm, setSearchTerm] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

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

  const getLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationInfo(`קו רוחב: ${pos.coords.latitude.toFixed(5)}, קו אורך: ${pos.coords.longitude.toFixed(5)}`);
        setLoadingLocation(false);
      },
      () => {
        setLocationInfo("שגיאה בזיהוי מיקום");
        setLoadingLocation(false);
      }
    );
  };

  const renderContent = () => {
    if (!selectedSymptom) {
      const filtered = Object.keys(SYMPTOMS).filter(n => n.includes(searchTerm));
      return (
        <div>
          <div className="location-container">
            <button onClick={getLocation} className="location-button">
              📍 {loadingLocation ? "מחפש..." : "איפה אני?"}
            </button>
            {locationInfo && <div className="location-text">{locationInfo}</div>}
          </div>

          <input 
            className="search-input"
            placeholder="חפש תרחיש..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {filtered.map(name => (
            <button key={name} className="menu-button" onClick={() => setSelectedSymptom(name)}>
              {name}
            </button>
          ))}
        </div>
      );
    }

    const currentData = SYMPTOMS[selectedSymptom];

    if (currentData.isCategory && !selectedSubCategory) {
      return (
        <div className="protocol-box">
          <button onClick={resetAll} className="close-btn">✕ סגור</button>
          <h3>בחר סוג מטופל:</h3>
          {Object.keys(currentData.subOptions).map(sub => (
            <button key={sub} className="sub-button" onClick={() => setSelectedSubCategory(sub)}>
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
      <div className="protocol-box">
        <button onClick={resetAll} className="back-link">← חזור לתפריט</button>
        <h2 >{selectedSubCategory || selectedSymptom}</h2>
        <button onClick={() => speak(finalSteps)} className="voice-button">🔊 השמע הנחיות</button>
        <ul>
          {finalSteps.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1 className="main-title">🚑 עזרה ראשונה </h1>
      {renderContent()}

      {/* כפתורי חירום קבועים */}
      <div className="footer">
        <button onClick={() => window.open('tel:101')} className="btn-mda">🚑 מד"א (101)</button>
        <button onClick={() => window.open('tel:100')} className="btn-police">👮 משטרה (100)</button>
      </div>
    </div>
  );
}


export default App;