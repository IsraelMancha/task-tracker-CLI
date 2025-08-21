````markdown
# Task CLI Manager

A simple **Command Line Interface (CLI)** task manager built with **Node.js**.  
You can add, list, update, and manage your tasks directly from the terminal.  
All tasks are stored in a `tasks.json` file.

---

## 🚀 Features

- Add new tasks
- List tasks by status (`todo`, `in-progress`, `done`)
- Mark tasks as done or in-progress
- Persist tasks in a JSON file
- Simple and lightweight

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/task-cli-manager.git
cd task-cli-manager
npm install
```
````

---

## 📝 Usage

Run the CLI using:

```bash
node app.js <command> [arguments]
```

### Available Commands

#### 1. Add a new task

```bash
node app.js add "Read a book"
```

Adds a new task with the description `"Read a book"`.

---

#### 2. List tasks

```bash
node app.js list
```

Lists **all tasks**.

```bash
node app.js list todo
```

Lists only **pending tasks**.

```bash
node app.js list in-progress
```

Lists only **tasks in progress**.

```bash
node app.js list done
```

Lists only **completed tasks**.

---

#### 3. Mark a task as done

```bash
node app.js mark-done <taskId>
```

Example:

```bash
node app.js mark-done 2
```

---

#### 4. Mark a task as in-progress

```bash
node app.js mark-in-progress <taskId>
```

Example:

```bash
node app.js mark-in-progress 3
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
