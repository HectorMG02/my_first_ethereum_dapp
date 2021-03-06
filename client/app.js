const App = {
  contracts: {},
  init: async () => {
    // funciones para interactuar con la blockchain, usando metamask (instalar en el navegador)
    await App.loadEthereum();
    await App.loadAccount();
    await App.loadContracts();
    await App.renderTasks();
  },
  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else if (window.web3) {
      // por si el navegador usa web3 en vez de metamask
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("La extensión de metamask no esta instalada");
    }
  },
  loadAccount: async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    App.account = accounts[0];
    App.renderAccount();
  },
  loadContracts: async () => {
    const res = await fetch("TasksContract.json");
    const tasksContractJSON = await res.json();

    App.contracts.tasksContract = TruffleContract(tasksContractJSON);

    App.contracts.tasksContract.setProvider(App.web3Provider);

    App.tasksContract = await App.contracts.tasksContract.deployed();
  },
  renderAccount: () => {
    document.getElementById("account").innerHTML = App.account;
  },
  renderTasks: async () => {
    let taskCount = await App.tasksContract.taskCount();
    taskCount = Number(taskCount);
    let html = "";

    for (let i = 0; i < taskCount; i++) {
      const task = await App.tasksContract.tasks(i);
      console.log(task);

      const id = task[0];
      const title = task[1];
      const description = task[2];
      const done = task[3];
      const createdAt = task[4];

      let taskElement = `
        <div class="card bg-dark rounded-0 px-3 pt-3 my-3">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span>${title}</span>
                <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" ${
                      done ? "checked" : null
                    } data-id="${id}" onchange="App.toggleDone(this)" />
                </div>
            </div>
            
            
            <div class="card-body">
            <span>${description}</span>
            <p class="text-muted mt-1">${new Date(
              createdAt * 1000
            ).toLocaleString()}</p>
            </div>
        </div>
      `;

      html += taskElement;
    }

    document.querySelector("#taskList").innerHTML = html;
  },
  createTask: async (name, description) => {
    await App.tasksContract.createTask(name, description, {
      from: App.account, // el from es para decir que cuenta esta cambiando los datos
    });

    location.reload();
  },
  toggleDone: async (element) => {
    const id = element.dataset.id;

    await App.tasksContract.toggleDone(id, {
      from: App.account,
    });
  },
};

App.init();
