const DEFAULT_CODE = 'select * from stars';

const editorDomElement = document.getElementById('editor');

editorDomElement.textContent = localStorage.getItem('sql') || DEFAULT_CODE;


var editor = ace.edit(editorDomElement, {
  mode: "ace/mode/sql",
  selectionStyle: "text",
  showGutter: false,
  fontSize: "18px",
  tabSize: 2,
  useSoftTabs: true,
  // showInvisibles: true,
  enableLiveAutocompletion: true,
  textPositionDebugger: true,
});
