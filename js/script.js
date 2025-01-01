function updateBalance() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach((entry) => {
    if (entry.type === "income") {
      totalIncome += parseFloat(entry.amount);
    } else {
      totalExpense += parseFloat(entry.amount);
    }
  });

  document.getElementById("totalIncome").innerText = totalIncome.toFixed(2);
  document.getElementById("totalExpense").innerText = totalExpense.toFixed(2);
  document.getElementById("netBalance").innerText = (
    totalIncome - totalExpense
  ).toFixed(2);
}

function renderEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const filter = document.querySelector('input[name="filter"]:checked').value;
  const filteredEntries =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.type === filter);

  const entryList = document.getElementById("entryList");
  entryList.innerHTML = "";

  filteredEntries.forEach((entry) => {
    const entryItem = document.createElement("div");
    entryItem.classList.add("entry-item");

    entryItem.innerHTML = `
            <span class="${entry.type}">${entry.description} - $${entry.amount}</span>
            <button class="edit" onclick="editEntry('${entry.id}')">Edit</button>
            <button class="delete" onclick="deleteEntry('${entry.id}')">Delete</button>
        `;

    entryList.appendChild(entryItem);
  });
}

document.getElementById("addEntry").addEventListener("click", function () {
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (description && amount) {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    const newEntry = {
      id: Date.now().toString(),
      description,
      amount,
      type,
    };
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    renderEntries();
    updateBalance();
  } else {
    alert("Please fill out both fields.");
  }
});

function editEntry(id) {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const entry = entries.find((entry) => entry.id === id);

  document.getElementById("description").value = entry.description;
  document.getElementById("amount").value = entry.amount;
  document.getElementById("type").value = entry.type;

  deleteEntry(id);
}

function deleteEntry(id) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries = entries.filter((entry) => entry.id !== id);
  localStorage.setItem("entries", JSON.stringify(entries));

  renderEntries();
  updateBalance();
}

document.querySelectorAll('input[name="filter"]').forEach((filter) => {
  filter.addEventListener("change", function () {
    renderEntries();
  });
});

document.getElementById("resetBtn").addEventListener("click", function () {
  localStorage.removeItem("entries");
  renderEntries();
  updateBalance();
});

renderEntries();
updateBalance();
