let level = 1;
const chatBox = document.getElementById('chat-box');
const bot = document.getElementById('bot');

function botReply(message) {
  chatBox.innerHTML += `<p><b>Bot:</b> ${message}</p>`;
  speak(message);
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}

function handleUserInput() {
  const input = document.getElementById('user-input').value.toLowerCase();
  chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;
  document.getElementById('user-input').value = '';

  let handled = false;

  // Check if level keyword exists (level 1, level 2, etc.)
  if (input.match(/level\s*[1-7]/)) {
    const lvl = input.match(/\d+/)[0];
    showLevelInfo(parseInt(lvl));
    handled = true;
  }

  // Check if topic keyword exists in keywordMap
  for (let keyword in keywordMap) {
    if (input.includes(keyword)) {
      const { level, topic } = keywordMap[keyword];
      botReply(`At Level ${level}, you'll learn about: ${topic}`);
      handled = true;
      break;
    }
  }

  // If no keywords match, provide a general response
  if (!handled) {
    botReply("I'm here to guide you step-by-step. Say 'done' when you're ready to level up or type 'level 1', 'level 2', etc. to see the learning path.");
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}


function showLevelInfo(levelNum) {
  const levels = {
    1: `
      <table>
        <tr><th>1. Foundation Level</th></tr>
        <tr><td>- Learn Excel / Google Sheets</td></tr>
        <tr><td>- Basic statistics & math</td></tr>
        <tr><td>- Understanding data types</td></tr>
        <tr><td>- Data cleaning basics</td></tr>
        <tr><td>- Learn how to interpret charts</td></tr>
      </table>
    `,
    2: `
      <table>
        <tr><th>2. Programming Basics</th></tr>
        <tr><td>- Learn Python or R</td></tr>
        <tr><td>- Pandas & NumPy (Data wrangling)</td></tr>
        <tr><td>- Basic coding (Loops, Lists, Dicts)</td></tr>
        <tr><td>- Google Colab / Jupyter Notebook</td></tr>
      </table>
    `,
    3: `
      <table>
        <tr><th>3. Data Visualization</th></tr>
        <tr><td>- Matplotlib / Seaborn (Python)</td></tr>
        <tr><td>- Power BI or Tableau (Optional)</td></tr>
        <tr><td>- Dashboard creation</td></tr>
        <tr><td>- Telling a story with data</td></tr>
      </table>
    `,
    4: `
      <table>
        <tr><th>4. Databases & SQL</th></tr>
        <tr><td>- Basics of Relational Databases</td></tr>
        <tr><td>- SELECT, JOIN, GROUP BY, etc.</td></tr>
        <tr><td>- MySQL / PostgreSQL hands-on</td></tr>
        <tr><td>- Build sample queries</td></tr>
      </table>
    `,
    5: `
      <table>
        <tr><th>5. Real Projects & Case Studies</th></tr>
        <tr><td>- Analyze public datasets (Kaggle)</td></tr>
        <tr><td>- Create dashboards or insights</td></tr>
        <tr><td>- Present findings in slides</td></tr>
        <tr><td>- Portfolio website (optional)</td></tr>
      </table>
    `,
    6: `
      <table>
        <tr><th>6. Advanced Topics</th></tr>
        <tr><td>- Statistical tests (t-test, chi-square)</td></tr>
        <tr><td>- A/B Testing</td></tr>
        <tr><td>- Regression basics (Linear, Logistic)</td></tr>
        <tr><td>- Intro to Machine Learning (Optional)</td></tr>
      </table>
    `,
    7: `
      <table>
        <tr><th>7. Job Preparation</th></tr>
        <tr><td>- Resume & LinkedIn optimization</td></tr>
        <tr><td>- Mock interviews</td></tr>
        <tr><td>- Learn to read job descriptions</td></tr>
        <tr><td>- Apply + Network on LinkedIn</td></tr>
      </table>
    `,
  };

  if (levels[levelNum]) {
    chatBox.innerHTML += `<p><b>Bot:</b> Here's what you'll learn in Level ${levelNum}:</p>${levels[levelNum]}`;
    speak(`Here is the content for Level ${levelNum}`);
  } else {
    botReply("Sorry, I only have info for levels 1 to 7.");
  }
}
const keywordMap = {
  "excel": { level: 1, topic: "Learn Excel / Google Sheets" },
  "statistics": { level: 1, topic: "Basic statistics & math" },
  "data types": { level: 1, topic: "Understanding data types" },
  "data cleaning": { level: 1, topic: "Data cleaning basics" },
  "charts": { level: 1, topic: "Learn how to interpret charts" },

  "python": { level: 2, topic: "Learn Python or R" },
  "pandas": { level: 2, topic: "Pandas & NumPy (Data wrangling)" },
  "coding": { level: 2, topic: "Basic coding (Loops, Lists, Dicts)" },
  "colab": { level: 2, topic: "Google Colab / Jupyter Notebook" },

  "matplotlib": { level: 3, topic: "Matplotlib / Seaborn (Python)" },
  "seaborn": { level: 3, topic: "Matplotlib / Seaborn (Python)" },
  "power bi": { level: 3, topic: "Power BI or Tableau (Optional)" },
  "dashboard": { level: 3, topic: "Dashboard creation" },
  "story": { level: 3, topic: "Telling a story with data" },

  "sql": { level: 4, topic: "Basics of Relational Databases" },
  "select": { level: 4, topic: "SELECT, JOIN, GROUP BY, etc." },
  "join": { level: 4, topic: "SELECT, JOIN, GROUP BY, etc." },
  "mysql": { level: 4, topic: "Hands-on with MySQL / PostgreSQL" },
  "query": { level: 4, topic: "Build sample queries" },

  "kaggle": { level: 5, topic: "Analyze public datasets (Kaggle)" },
  "insights": { level: 5, topic: "Create dashboards or insights" },
  "reports": { level: 5, topic: "Present findings in slides" },
  "portfolio": { level: 5, topic: "Portfolio website (optional)" },

  "t-test": { level: 6, topic: "Statistical tests (t-test, chi-square)" },
  "regression": { level: 6, topic: "Regression basics (Linear, Logistic)" },
  "ab testing": { level: 6, topic: "A/B Testing" },
  "machine learning": { level: 6, topic: "Intro to Machine Learning (Optional)" },

  "resume": { level: 7, topic: "Resume & LinkedIn optimization" },
  "mock": { level: 7, topic: "Mock interviews" },
  "job descriptions": { level: 7, topic: "Learn to read job descriptions" },
  "linkedin": { level: 7, topic: "Apply + Network on LinkedIn" }
};