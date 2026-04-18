const { processTransaction } = require("./src/engine/fraudEngine");

const seenIds = new Set();

const transactions = [
  { id: "t1", sender: "A", receiver: "B", amount: 400, timestamp: 10 },
  { id: "t2", sender: "A", receiver: "C", amount: 700, timestamp: 50 },
  { id: "t3", sender: "A", receiver: "D", amount: 200, timestamp: 70 },
];

transactions.forEach(tx => {
  const result = processTransaction(tx, seenIds);
  console.log(tx.id, result);
});