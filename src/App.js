import { useState } from "react";
import "./styles.css";

export default function App() {
  const [billAmt, setBillAmt] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);

  const [baMet, setBaMet] = useState(false);
  const [cgMet, setCgMet] = useState(false);
  const [msg, setMsg] = useState("");

  const [bankNotes, setBankNotes] = useState([
    {
      denomination: 2000,
      notes: 0
    },
    {
      denomination: 500,
      notes: 0
    },
    {
      denomination: 100,
      notes: 0
    },
    {
      denomination: 20,
      notes: 0
    },
    {
      denomination: 10,
      notes: 0
    },
    {
      denomination: 5,
      notes: 0
    },
    {
      denomination: 1,
      notes: 0
    }
  ]);

  function handleNext() {
    if (Number(billAmt) > 0) {
      setBaMet(true);
      setMsg("");
    } else {
      setMsg("Invalid Bill Amount");
      setBaMet(false);
    }
  }

  function handleCheck() {
    if (Number(cashGiven) >= Number(billAmt)) {
      setCgMet(true);
      setMsg("");
      const amtToBeReturned = cashGiven - billAmt;
      calculateAmt(amtToBeReturned);
    } else {
      setMsg("Cash Given should be >= Bill Amount");
      setCgMet(false);
    }
  }

  function calculateAmt(amtToBeReturned) {
    if (amtToBeReturned === 0) {
      setMsg("No cash to be returned");
      setCgMet(false);
    } else {
      for (let i = 0; i < bankNotes.length; i++) {
        const noteToReturn = Math.trunc(
          amtToBeReturned / bankNotes[i].denomination
        );
        amtToBeReturned %= bankNotes[i].denomination;
        setBankNotes((prev) =>
          prev.map((note) => {
            if (note.denomination === bankNotes[i].denomination) {
              return { ...note, notes: noteToReturn };
            }
            return note;
          })
        );
      }
    }
  }

  return (
    <div className="App">
      <h1>Cash Register Manager</h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <div>
        <label htmlFor="bill-amt">Bill Amount:</label>
        <br />
        <input
          type="number"
          id="bill-amt"
          onChange={(e) => setBillAmt(e.target.value)}
        />
        <br />
        <button onClick={handleNext}>Next</button>
      </div>
      <div style={{ display: baMet ? "block" : "none" }}>
        <label htmlFor="cash-given">Cash Given:</label>
        <br />
        <input
          type="number"
          id="cash-given"
          onChange={(e) => setCashGiven(e.target.value)}
        />
        <br />
        <button onClick={handleCheck}>Check</button>
      </div>
      {msg}
      <h2 style={{ display: cgMet ? "block" : "none" }}>Return Change:</h2>
      <table style={{ display: cgMet ? "flex" : "none" }}>
        <tbody>
          <tr>
            <th>No. of Notes</th>
            <td>{bankNotes[0].notes}</td>
            <td>{bankNotes[1].notes}</td>
            <td>{bankNotes[2].notes}</td>
            <td>{bankNotes[3].notes}</td>
            <td>{bankNotes[4].notes}</td>
            <td>{bankNotes[5].notes}</td>
            <td>{bankNotes[6].notes}</td>
          </tr>
          <tr>
            <th>No. of Notes</th>
            <td>2000</td>
            <td>500</td>
            <td>100</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
