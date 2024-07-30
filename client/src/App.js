import React, { useState } from 'react';
import TransactionsTable from './components/Transaction.js';
import Statistics from './components/statics.js';
import BarChartComponent from './components/Barchart.js';
import PieChartComponent from './components/Piechart.js';
import './App.css';

function App() {
  const [month, setMonth] = useState('03'); // Default to March

  return (
    <div className="App">
      <h1>MERN Stack Project</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChartComponent month={month} />
      <PieChartComponent month={month} />
    </div>
  );
}

export default App;
