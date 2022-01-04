// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6; // hay que modificar la version en el truffle-config.js para cuando hacemos el deploy, modificamos el compilsers > solc.version: 0.8.6

// modificamos tambien en el truffle-config, el port y ponemos 7545, en este caso es el del servidor ganache, tenemos que descomentar la parte de development dentro de este config
// creamos la carpeta build con truffle build
// hacemos el deploy con truffle deploy

contract TasksContract {
    uint256 public taskCount = 0; // para poder acceder desde truffle console, tenemos que poner el public

    constructor() {
        createTask("Default task", "Default description");
    }

    // los eventos hacen alusion a algo que ya paso
    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    event TaskToggleDone(uint256 id, bool done);

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt; // la fecha es un timestamp, por lo que podemos poner uint256
    }

    // Array de tareas mapeado a una estructura Task
    mapping(uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description)
        public
    {
        taskCount++;
        tasks[1] = Task(
            taskCount,
            _title,
            _description,
            false,
            block.timestamp
        ); // con block, hacemos referencia al bloque donde se esta ejecutando el script

        // tras crear la tarea retorno la tarea creada
        emit TaskCreated(
            taskCount,
            _title,
            _description,
            false,
            block.timestamp
        );
    }

    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;

        emit TaskToggleDone(_id, _task.done);
    }
}
