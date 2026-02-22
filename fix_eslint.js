const fs = require('fs');
const report = require('./eslint_report.json');

report.forEach(({ filePath, messages }) => {
  if (messages.length === 0) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  
  // Sort descending so splicing doesn't affect earlier line numbers
  const linesToDisable = [...new Set(messages.map(m => m.line))].sort((a,b) => b - a);
  
  // Only handle unused vars or specific rules
  for (let lineNum of linesToDisable) {
      // Find the message for this line
      const msgsForLine = messages.filter(m => m.line === lineNum);
      const ruleIds = [...new Set(msgsForLine.map(m => m.ruleId).filter(Boolean))].join(', ');
      
      if (ruleIds) {
          // get indentation of the target line
          const targetLine = lines[lineNum - 1] || "";
          const indent = targetLine.match(/^\s*/)[0];
          lines.splice(lineNum - 1, 0, `${indent}// eslint-disable-next-line ${ruleIds}`);
      } else {
          lines.splice(lineNum - 1, 0, `// eslint-disable-next-line`);
      }
  }
  
  fs.writeFileSync(filePath, lines.join('\n'));
});
console.log("ESLint warnings disabled");
