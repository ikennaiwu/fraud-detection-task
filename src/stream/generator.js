function generateTransaction() {
  return {
    id: "t" + Math.random().toString(36).substring(2, 8),
    sender: ["A", "B", "C"][Math.floor(Math.random() * 3)],
    receiver: ["X", "Y", "Z"][Math.floor(Math.random() * 3)],
    amount: Math.floor(Math.random() * 600),
    timestamp: Math.floor(Date.now() / 1000)
  };
}

module.exports = generateTransaction;