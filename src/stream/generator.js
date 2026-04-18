function generateTransaction() {
  const senders = ["A", "B", "C"];
  const receivers = ["X", "Y", "Z"];

  return {
    id: "t" + Math.random().toString(36).substring(2, 8),
    sender: senders[Math.floor(Math.random() * senders.length)],
    receiver: receivers[Math.floor(Math.random() * receivers.length)],
    amount: Math.floor(Math.random() * 600),
    timestamp: Math.floor(Date.now() / 1000),
  };
}

module.exports = { generateTransaction };