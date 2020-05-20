const CODES = {
  A: 65,
  Z: 90,
};

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(content, index) {
  return `
    <div class="row">
      <div class="row-num">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn(col) {
  return `<div class="column">${col}</div>`;
}

function toCell(content = '') {
  return `<div class="cell" tabindex="0" contenteditable>${content}</div>`;
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
