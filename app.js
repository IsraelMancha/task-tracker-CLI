import fs from "fs";

const args = process.argv.slice(2);
const command = args[0];

// args[0] = command
// args[1] = id or description

// si no existe el archivo JSON lo creamos
if (!fs.existsSync("tasks.json")) {
  fs.writeFileSync("tasks.json", "[]");
}

// obtenemos las tareas
const tasks = JSON.parse(fs.readFileSync("tasks.json", "utf-8"));

function getNextId(tasks) {
  if (tasks.length === 0) return 1;
  const maxId = Math.max(...tasks.map((t) => t.id));
  return maxId + 1;
}

function deleteTask(id) {
  const updatedTasks = tasks.filter((t) => t.id !== id);

  if (updatedTasks.length === tasks.length) {
    console.log("⚠️ No se encontró ninguna tarea con ese ID");
    return;
  }

  fs.writeFileSync("tasks.json", JSON.stringify(updatedTasks, null, 2));
  console.log(`Tarea con el ID ${id} eliminada`);
}

function showAllTasks(tasks) {
  tasks.forEach((t) => {
    console.log(t.description);
  });
}

function updateTask(id, newDescription) {
  const taskToEdit = tasks.find((t) => t.id === id);
  if (!taskToEdit) return console.log("No existe una tarea con ese ID");

  taskToEdit.description = newDescription;
  taskToEdit.updatedAt = new Date().toISOString();

  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  console.log(`Tarea con ID ${id} actualizada`);
}

function markTask(id, newStatus) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return console.log(`No existe el ID ${id}`);

  if (task.status === newStatus) {
    return console.log(`La tarea ya está en estado "${newStatus}"`);
  }

  task.status = newStatus;
  task.updatedAt = new Date().toISOString();
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  console.log(`Tarea con ID ${id} marcada como "${newStatus}"`);
}

switch (command) {
  case "add":
    const descriptionTask = args.slice(1).join(" ");
    const id_task = getNextId(tasks);
    const newTask = {
      id: id_task,
      description: descriptionTask,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    console.log(`Task added successfully (ID: ${id_task})`);
    break;

  case "list":
    const statusFilter = args[1];
    if (!statusFilter) {
      showAllTasks(tasks);
    } else {
      const filtered = tasks.filter((t) => t.status === statusFilter);

      if (!filtered.length) {
        console.log(`No hay tareas en estado ${statusFilter}`);
        break;
      } else {
        filtered.forEach((task) => {
          console.log(task.description);
        });
      }
    }
    break;

  case "update":
    const idNumberUpdate = Number(args[1]);
    if (isNaN(idNumberUpdate)) {
      console.log("Ingresa un ID válido");
      break;
    }
    const newDescription = args.slice(2).join(" ");
    updateTask(idNumberUpdate, newDescription);

    break;

  case "delete":
    const idNumber = Number(args[1]);
    if (isNaN(idNumber)) {
      console.log("Ingresa un ID válido");
      break;
    }
    deleteTask(idNumber);

    break;

  case "mark-in-progress":
    markTask(Number(args[1]), "in-progress");
    break;
  case "mark-done":
    markTask(Number(args[1]), "done");
    break;

  default:
    console.log("Comando no reconocido");
}
