const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray method returns copy of todo items', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
    
  });

  test('check that first method invocation returns first todo', () => {
    expect(list.first()).toBe(todo1);
  });

  test('Check that last method returns last todo', () => {
    expect(list.last()).toBe(todo3);
  })

  test('Does the shift method return and remove the first item', () => {
    expect(list.shift()).toBe(todo1);
    expect(list.shift()).not.toContain(todo1)
  });

  test('Does pop method return and remove the last item', () => {
    let todo = list.pop();
    expect(todo).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('Checks isDone method. true -> all complete, false otherwise', () => {
    list.markAllDone();
    expect(list.isDone()).toEqual(true);
    list.markUndoneAt(0);
    expect(list.isDone()).toEqual(false);
  });

  test('Checks to see if error is thrown when adding object of wrong type', () => {
    expect(() => list.add(new String("Test"))).toThrow(TypeError);
  })

  test('tests itemAt method', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(50)).toThrow(ReferenceError);
  })

  test('Tests markDoneAt method', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(() => list.markDoneAt(50)).toThrow(ReferenceError);
  })

  test("Test markUndoneAt method", () => {
    expect(() => list.markUndoneAt(50)).toThrow(ReferenceError);
    
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markUndoneAt(0)
    expect(todo1.isDone()).toEqual(false);
    expect(todo2.isDone()).toEqual(true);

  })

  test("Test to see if markAllDone method completes all todos", () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(true);
    expect(todo1.isDone()).toBe(true);
  });

  test('Test to see if removeAt removes an item', () => {
    let todo = list.removeAt(0);
    expect(todo).toBe(todo1);
    expect(() => list.removeAt(6)).toThrow(ReferenceError);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
    todo1.markDone();
    string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
    list.markAllDone();
    string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);

  });

  test('check to see if forEach runs for every todo', () => {
    let result = [];
    list.forEach((todo) => result.push(todo));
    expect(result).toEqual(list.toArray());
  });

  test('Check to see if filter returns new array with expected items', () => {
    todo1.markDone();
    let result = list.filter((todo) => todo.isDone());
    let todoList2 = new TodoList();
    result.forEach(todo => todoList2.add(todo));
    expect(result.toArray()).toEqual(todoList2.toArray());
  })

});