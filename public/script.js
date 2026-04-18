const socket = io();

const tbody = document.getElementById("tbody");

let total = 0;
let validCount = 0;
let invalidCount = 0;
const sendersSet = new Set();

socket.on("update", (data) => {
  const { transaction, invalid, reasons } = data;

  total++;
  sendersSet.add(transaction.sender);

  if (invalid) {
    invalidCount++;
  } else {
    validCount++;
  }

  // update summary
  document.getElementById("total").textContent = total;
  document.getElementById("valid").textContent = validCount;
  document.getElementById("invalid").textContent = invalidCount;
  document.getElementById("senders").textContent = sendersSet.size;

  // create row
  const row = document.createElement("tr");

  const date = new Date(transaction.timestamp * 1000);
  const seconds = date.getSeconds() + "s";

  row.innerHTML = `
    <td>${transaction.id}</td>
    <td>${transaction.sender}</td>
    <td>${transaction.receiver}</td>
    <td>${transaction.amount}</td>
    <td>${seconds}</td>
    <td class="${invalid ? "invalid" : "valid"}">
      ${invalid ? "Invalid - " + reasons.join(", ") : "Valid"}
    </td>
  `;

  tbody.prepend(row);
});