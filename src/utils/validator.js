function validateBasic(tx, seenIds) {
  const { id, sender, receiver, amount } = tx;

  if (seenIds.has(id)) return "duplicate_id";
  seenIds.add(id);

  if (amount <= 0) return "invalid_amount";

  if (sender === receiver) return "same_sender_receiver";

  return null;
}

module.exports = { validateBasic };