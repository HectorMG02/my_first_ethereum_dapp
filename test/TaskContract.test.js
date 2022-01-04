// ejecutamos el script con truffle test
const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
  before(async () => {
    this.tc = await TasksContract.deployed();
  });

  it("contract is deployed", async () => {
    const address = this.tc.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0); // si no es un hexadecimal o no es un binario vacio
    assert.notEqual(address, "");
  });

  it("get task list", async () => {
    const count = await this.tc.taskCount();
    const task = await this.tc.tasks(count.toNumber());

    assert.equal(task.id.toNumber(), count.toNumber());
    assert.equal(task.title, "Default task");
    assert.equal(task.description, "Default description");
    assert.equal(task.done, false);
    assert.equal(count, 1);
  });

  it("task created successfully", async () => {
    const result = await this.tc.createTask("test name", "test description");
    const taskEvent = result.logs[0].args; // args es la respuesta del evento

    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "test name");
    assert.equal(taskEvent.description, "test description");
    assert.equal(taskEvent.done, false);
  });

  it("task toggle done", async () => {
    const result = await this.tc.toggleDone(1);
    const taskEvent = result.logs[0].args;

    const task = await this.tc.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id, 1);
  });
});
