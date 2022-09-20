console.clear();

import React, { useState, useRef } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

function TodoListItem({ todosState, todo, index }) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.content);
  const editedContentInputRef = useRef(null);

  const removeTodo = () => {
    todosState.removeTodo(index);
  };

  const showEdit = () => {
    setEditMode(true);
  };

  const commitEdit = () => {
    if (editedContent.trim().length == 0) {
      alert("할일을 입력해주세요.");
      editedContentInputRef.current.focus();
      return;
    }

    todosState.modifyTodo(index, editedContent.trim());

    setEditMode(false);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditedContent(todo.content);
  };

  return /*#__PURE__*/(
    React.createElement("li", null,
    todo.id, "\xA0",

    todo.regDate, "\xA0",

    editMode || /*#__PURE__*/
    React.createElement(React.Fragment, null,
    todo.content, "\xA0", /*#__PURE__*/

    React.createElement("button", { onClick: showEdit }, "\uC218\uC815")),


    editMode && /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("input", {
      ref: editedContentInputRef,
      type: "text",
      placeholder: "\uD560\uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
      value: editedContent,
      onChange: e => setEditedContent(e.target.value) }), "\xA0", /*#__PURE__*/


    React.createElement("button", { onClick: commitEdit }, "\uC218\uC815\uC644\uB8CC"), "\xA0", /*#__PURE__*/

    React.createElement("button", { onClick: cancelEdit }, "\uC218\uC815\uCDE8\uC18C")), "\xA0", /*#__PURE__*/



    React.createElement("button", { onClick: removeTodo }, "\uC0AD\uC81C")));


}

function TodoList({ todosState }) {
  return /*#__PURE__*/(
    React.createElement("ul", null,
    todosState.todos.map((todo, index) => /*#__PURE__*/
    React.createElement(TodoListItem, {
      todosState: todosState,
      key: todo.id,
      todo: todo,
      index: index }))));




}

function NewTodoForm({ todosState }) {
  const onSubmit = e => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };

  return /*#__PURE__*/(
    React.createElement("form", { onSubmit: onSubmit }, /*#__PURE__*/
    React.createElement("input", {
      autoComplete: "off",
      name: "content",
      type: "text",
      placeholder: "\uD560\uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." }), /*#__PURE__*/

    React.createElement("input", { type: "submit", value: "\uCD94\uAC00" }), /*#__PURE__*/
    React.createElement("input", { type: "reset", value: "\uCDE8\uC18C" })));


}

function TodoApp({ todosState }) {
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(NewTodoForm, { todosState: todosState }), /*#__PURE__*/
    React.createElement("hr", null), /*#__PURE__*/
    React.createElement(TodoList, { todosState: todosState })));


}

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = newContent => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()) };


    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
    _index != index ? todo : { ...todo, content: newContent });

    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo };

}

function App() {
  const todosState = useTodosState();

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(TodoApp, { todosState: todosState })));


}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = n => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds()));

}