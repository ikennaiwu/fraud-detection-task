#  Fraud Detection System (Real-Time Simulation)

A lightweight real-time fraud detection system built with Node.js that identifies fraudulent transactions using **basic validation rules, velocity limits, and chain fraud propagation**, while streaming results to a live dashboard using WebSockets.

#  Problem Statement

Given a list of financial transactions, the system must detect invalid transactions based on:

### 1. Basic Rules
- Transaction amount must be greater than 0
- Sender must not equal receiver
- Transaction ID must be unique

### 2. Velocity Rule
- If a sender sends more than **1000 units within any rolling 60-second window**, the latest transaction is flagged as invalid.

### 3. Chain Fraud Rule
- Once a sender violates the velocity rule, all their transactions within the next **120 seconds** are automatically marked invalid.


#  My Approach (How I Solved It)

## Step 1: Understanding the Problem
I broke the problem into 3 layers:
- Data validation (basic checks)
- Time-window computation (velocity rule)
- State propagation (chain fraud)


## Step 2: Designing the System

Instead of solving it as a simple algorithm, I designed it as a **real-time fraud detection system**:


## Step 3: Architecture Thinking

Even though the system is implemented in Node.js, I simulated real-world components:

###  Kafka (Streaming Simulation)
- Transactions are generated continuously using a timer
- Mimics real-time event ingestion

###  Redis (State Simulation)
- In-memory Map stores:
  - sender transaction window
  - running sum
  - chain fraud timer

###  WebSockets (Live Updates)
- Socket.io is used to push results instantly to the frontend dashboard

---

# Tech Stack

- Node.js
- Express.js
- Socket.io (WebSockets)
- Vanilla JavaScript (Frontend)


#  Project Structure
fraud-detection-system/
│
├── src/
│ ├── engine/ # Fraud detection logic
│ ├── state/ # In-memory state (Redis simulation)
│ ├── stream/ # Transaction generator (Kafka simulation)
│ └── utils/ # Validation rules
│
├── public/
│ ├── index.html # Dashboard UI
│ └── script.js # Frontend logic
│
├── server.js # Express + WebSocket server
├── test.js # Manual test cases
└── README.md


#  Core Logic Explanation

## 1. Basic Validation
Each transaction is checked for:
- duplicate ID
- invalid amount
- same sender and receiver


## 2. Velocity Rule (Sliding Window)

For each sender:
- Maintain a 60-second rolling window
- Keep track of total transaction sum
- If sum > 1000 → mark transaction as invalid


## 3. Chain Fraud Rule

If velocity rule is triggered:
- Mark sender as “blocked”
- Block all transactions from that sender for the next 120 seconds

# 4. Live Dashboard

The system includes a real-time dashboard that displays:

- Transaction ID
- Sender → Receiver
- Amount
- Timestamp
- Fraud status (valid / invalid)
- Reason for invalidation

### Example Output:
\
t4mgxt4 | B → X | 254 | 4/18/2026  (chain_fraud)
tae9k2p | A → Z | 120 | 4/18/2026

-  Green = valid transaction  
-  Red = fraud detected  



# How I Tested It

I created a `test.js` file to:
- simulate transactions
- validate fraud rules
- verify velocity and chain fraud logic



#  How to Run the Project

### 1. Install dependencies
-npm install -y
-npm install express socket.io

### 2. Start server
-npm start

### 3. Open dashboard
http://localhost:3000

 ### . Output Screenshot

The dashboard shows real-time fraud detection with color-coded transactions:

 Valid transactions
 Fraudulent transactions
 Reason for failure displayed

(Insert screenshot here: assets/dashboard.png)

### . Key Learnings

Through this project, I learned:

How sliding window algorithms work in real systems
How to manage time-based state efficiently
How cascading fraud (chain reactions) propagate
How real-time systems use WebSockets for live updates
How systems like Kafka, Redis, and streaming pipelines work conceptually


### . Final Thoughts

This project is not just an algorithm solution — it simulates a real-world fraud detection architecture used in payment systems.

It demonstrates:

System design thinking
Real-time data processing
Scalable architecture concepts

### . Author

Built as part of a backend/system design exercise focused on real-time fraud detection systems.

