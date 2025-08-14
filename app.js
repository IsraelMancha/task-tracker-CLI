import fs from "fs";

// guardar los datos de entrada en variables
const inputs = process.argv;
const execPath = inputs[0];
const filePath = inputs[1];
const command = inputs[2];
const aditionalArgs = inputs[3];

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

const id_task = getNextId(tasks);

function deleteTask(id) {
  // 1. Leer el archivo
  // 2. Filtrar todas las que no tengan ese id
  const updatedTasks = tasks.filter((t) => t.id !== id);
  // 3. Guardar el nuevo arreglo
  fs.writeFileSync("tasks.json", JSON.stringify(updatedTasks, null, 2));

  console.log(`Tarea con ID ${id} eliminada.`);
}

// function getStatus(id_task){
//     const status =
// }
//  obtenemos el siguiente ID task

switch (command) {
  case "add":
    const newTask = {
      id: id_task,
      description: aditionalArgs,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
    console.log(`Task added successfully (ID: ${id_task})`);
    break;

  case "list":
    console.log(`Listando tareas...`);
    break;

  case "update":
    console.log("update");
    break;

  case "delete":
    console.log("delete");
    break;

  default:
    console.log("Comando no reconocido");
}
