const senderState = new Map();

function getSenderState(sender) {
  if (!senderState.has(sender)) {
    senderState.set(sender, {
      window: [],
      sum: 0,
      chainBlockUntil: -1,
    });
  }

  return senderState.get(sender);
}

module.exports = { getSenderState };