const { validateBasic } = require("../utils/validator");
const { getSenderState } = require("../state/store");

function processTransaction(tx, seenIds) {
  const reasons = [];

  // BASIC RULES
  const basicError = validateBasic(tx, seenIds);
  if (basicError) reasons.push(basicError);

  const state = getSenderState(tx.sender);

  // CHAIN FRAUD CHECK
  if (tx.timestamp <= state.chainBlockUntil) {
    reasons.push("chain_fraud");
    return { invalid: true, reasons };
  }

  // REMOVE OLD TRANSACTIONS (>60s)
  while (
    state.window.length &&
    tx.timestamp - state.window[0].timestamp > 60
  ) {
    const old = state.window.shift();
    state.sum -= old.amount;
  }

  // ADD CURRENT TX
  state.window.push(tx);
  state.sum += tx.amount;

  // VELOCITY RULE
  if (state.sum > 1000) {
    reasons.push("velocity_limit_exceeded");
    state.chainBlockUntil = tx.timestamp + 120;
  }

  return {
    invalid: reasons.length > 0,
    reasons,
  };
}

module.exports = { processTransaction };