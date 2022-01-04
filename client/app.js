const App = {
  web3Provider: "",
  init: () => {
    // funciones para interactuar con la blockchain, usando metamask (instalar en el navegador)
    App.loadEthereum();
  },
  loadEthereum: async () => {
    if (!window.ethereum) {
      alert("La extensión de metamask no esta instalada");
    } else if (window.web3) {
      // por si el navegador usa web3 en vez de metamask
      const web3 = new Web3(window.web3.currentProvider);
    } else {
      App.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }
  },
};

App.init();
