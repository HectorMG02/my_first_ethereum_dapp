const App = {
  contracts: {},
  init: () => {
    // funciones para interactuar con la blockchain, usando metamask (instalar en el navegador)
    App.loadEthereum();
    App.loadAccount();
    App.loadContracts();
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
  },
  loadContracts: async () => {
    const res = await fetch("TasksContract.json");
    const tasksContractJSON = await res.json();

    App.contracts.tasksContract = TruffleContract(tasksContractJSON);

    App.contracts.tasksContract.setProvider(App.web3Provider);

    App.tasksContract = await App.contracts.tasksContract.deployed();
  },
  createTask: async (name, description) => {
    const result = await App.tasksContract.createTask(name, description, {
      from: App.account,
    });

    console.log(result.logs[0].args);
  },
};

App.init();
