const CODES = {
  A: 65,
  Z: 90,
};

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(content, index = 0) {
  const resize = index
    ? `<div class="row-resize" data-resize-direction="row"></div>`
    : '';
  const resizable = index ? `data-type="resizable"` : '';
  return `
    <div class="row" ${resizable} data-row-index="${index}">
      <div class="row-num">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col-index="${index}">
      ${col}
      <div class="col-resize" data-resize-direction="col"></div>
    </div>
  `;
}

function toCell(content = '', index) {
  return `
    <div class="cell" tabindex="0" contenteditable data-col-index="${index}">
      ${content}
    </div>`;
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
