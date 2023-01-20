// get fields
const description = document.getElementById("descritpion");
const amount = document.getElementById("amount");
const balance = document.getElementById("balance");
const icon = document.getElementById("icon");
const userDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logout");

const API_URL = "https://api.npoint.io/38edf0c5f3eb9ac768bd";
userDisplay.innerHTML = localStorage.getItem("username");

// fetch data from API and display on app
const fetchData = () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const transacationTypes = data.transacationTypes;
      const el = data.transactions.map(
        ({ type, balance, description, amount, date }) => {
          return `
              <div class="transactions__single">
                  <img
                  src="../assets/${type}.svg"
                  alt="icon"
                  id="icon"
                  class="transactions__icon icon"
                  />
                  <p id="description" class="transactions__description">${description}</p>
                  <p id="amount" class="transactions__amount">${amount}</p>
                  <span class="transactions__type">${
                    transacationTypes[`${type}`]
                  }</span>

                  <span class="transactions__hidden">
                    <p id="date" class="transactions__date">
                      Data: <span>${date}</span>
                    </p>
                    <p id="balance" class="transactions__balance">
                      Saldo: <span>${balance}</span>
                    </p>
                  </span>
                  </div>
              `;
        }
      );
      document.getElementById("transactions").innerHTML = el.join("");
    });
};
fetchData();

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    const transactionCount = data.transactions.length;
    const transacationTypes = data.transacationTypes;
    const typeCounts = {};

    const dates = [];
    const balances = [];
    data.transactions.forEach((transaction) => {
      dates.push(transaction.date);
      balances.push(transaction.balance);
    });
    data.transactions.forEach((transaction) => {
      if (typeCounts[transaction.type]) {
        typeCounts[transaction.type]++;
      } else {
        typeCounts[transaction.type] = 1;
      }
    });

    const chartData = Object.keys(typeCounts).map((type) => {
      const percentage = (typeCounts[type] / transactionCount) * 100;
      return {
        label: transacationTypes[type],
        value: percentage,
      };
    });

    // create charts
    const ctx = document.getElementById("chart").getContext("2d");
    const ctx2 = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartData.map((item) => item.label),
        datasets: [
          {
            data: chartData.map((item) => item.value),
          },
        ],
      },
    });
    new Chart(ctx2, {
      type: "bar",
      data: {
        labels: dates,

        datasets: [
          {
            label: "Saldo",
            data: balances,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  });

// logout button
logoutBtn.addEventListener("click", () => {
  window.location.href = "/";
  localStorage.removeItem("username");
});

// show just one element (details) on mobile
let transactionsArrayElement = document.getElementsByClassName(
  "transactions__single"
);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("transactions__single")) {
    let hiddenElement = e.target.querySelector(".transactions__hidden");
    if (hiddenElement) {
      hiddenElement.classList.toggle("active");
    }
  }
});
