// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6; // hay que modificar la version en el truffle-config.js para cuando hacemos el deploy, modificamos el compilsers > solc.version: 0.8.6

// modificamos tambien en el truffle-config, el port y ponemos 7545, en este caso es el del servidor ganache, tenemos que descomentar la parte de development dentro de este config
// creamos la carpeta build con truffle build
// hacemos el deploy con truffle deploy truffle migrate, ambos hacen lo mismo

contract TasksContract {
    uint256 taskCount = 0; // para poder acceder desde truffle console, tenemos que poner el public

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt; // la fecha es un timestamp, por lo que ponemos el uint256
    }

    mapping(uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description)
        public
    {
        tasks[1] = Task(
            taskCount,
            _title,
            _description,
            false,
            block.timestamp
        ); // con block, hacemos referencia al bloque donde se esta ejecutando el script
        taskCount++;
    }

    function toggleDone() public {}
}
