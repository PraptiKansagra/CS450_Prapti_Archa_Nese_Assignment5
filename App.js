import React, { useState } from 'react';
import './App.css'; // You can create and import your CSS file for styling
import BarChart from './BarChart';
import CorrelationMatrix from './CorrelationMatrix';
import Scatterplot from './Scatterplot';

const App = () => {
  // Sample data (you can replace it with your actual dataset)
  const data = [
    { day: 'Monday', total_bill: 10, tip: 2, size: 3 },
    { day: 'Tuesday', total_bill: 20, tip: 4, size: 2 },
    { day: 'Wednesday', total_bill: 30, tip: 6, size: 4 },
    // Add more data here...
  ];

  const variables = ['total_bill', 'tip', 'size']; // List of numerical variables

  const [selectedXVariable, setSelectedXVariable] = useState(variables[0]);
  const [selectedYVariable, setSelectedYVariable] = useState(variables[1]);

  const handleXVariableChange = event => {
    setSelectedXVariable(event.target.value);
  };

  const handleYVariableChange = event => {
    setSelectedYVariable(event.target.value);
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>

      {/* Dropdown for selecting X variable */}
      <div>
        <label>Select X Variable:</label>
        <select value={selectedXVariable} onChange={handleXVariableChange}>
          {variables.map(variable => (
            <option key={variable} value={variable}>{variable}</option>
          ))}
        </select>
      </div>

      {/* Dropdown for selecting Y variable */}
      <div>
        <label>Select Y Variable:</label>
        <select value={selectedYVariable} onChange={handleYVariableChange}>
          {variables.map(variable => (
            <option key={variable} value={variable}>{variable}</option>
          ))}
        </select>
      </div>

      {/* Bar Chart */}
      <div>
        <h2>Bar Chart</h2>
        <BarChart data={data} xVariable="day" yVariable={selectedXVariable} />
      </div>

      {/* Correlation Matrix */}
      <div>
        <h2>Correlation Matrix</h2>
        <CorrelationMatrix data={data} variables={variables} />
      </div>

      {/* Scatterplot */}
      <div>
        <h2>Scatterplot</h2>
        <Scatterplot data={data} xVariable={selectedXVariable} yVariable={selectedYVariable} />
      </div>
    </div>
  );
};

export default App;
