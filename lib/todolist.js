const Todo = require('./todo.js');



// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  getTitle() {
    return this.title;
  }

  add(todo) {
    if (!(todo instanceof Todo)) throw new TypeError("can only add Todo objects");

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  _validateIndex(idx) {
    if (!(idx in this.todos)) {
      throw new ReferenceError(`Invalid Index: ${idx}`)
    }
  }

  itemAt(idx) {
    this._validateIndex(idx);
    return this.todos[idx];
  }

  markDoneAt(idx) {
    
    this.itemAt(idx).markDone();
  }

  markUndoneAt(idx) {
    
    this.itemAt(idx).markUndone();
  }

  isDone() {
    return this.todos.every((todo) => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx, 1)[0];
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {

    let newTodoList = new TodoList(this.title);
    for (let idx = 0; idx < this.size(); idx += 1) {
      let todo = this.itemAt(idx);

      if (callback(todo)) {
        newTodoList.add(todo);
      }
    }
    return newTodoList;
  }

  findByTitle(title) {
    return this.filter((todo) => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter((todo) => todo.isDone());
  }

  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo) {
      todo.markDone();
    }

  }

  markAllDone() {
    this.forEach((todo) => todo.markDone());
  }

  markAllUndone() {
    this.forEach((todo) => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;

// let todo1 = new Todo("Buy Milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let list = new TodoList("Today's Todos");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// // todo1.markDone();
// // todo5.markDone();

// list.markDone("Buy Milk");
// list.markDone("Clean room");
// //list.markAllUndone();
// console.log(list);

// console.log(list.toArray());










