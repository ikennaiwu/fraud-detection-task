const socket = io();
const feed = document.getElementById("feed");

socket.on("update", (data) => {
  const { transaction, invalid, reasons } = data;

  // create list item
  const li = document.createElement("li");

  // convert timestamp to readable date
  const date = new Date(transaction.timestamp * 1000);
  const readable = date.toLocaleString();

  // build text
  li.textContent =
    `${transaction.id} | ${transaction.sender} → ${transaction.receiver} | ${transaction.amount} | ${readable}`;

  // style based on fraud status
  if (invalid) {
    li.textContent += ` (${reasons.join(", ")})`;
    li.style.color = "red";
  } else {
    li.style.color = "green";
  }

  feed.prepend(li);
});