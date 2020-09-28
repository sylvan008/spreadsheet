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

function toCell(row) {
  return function(content = '', index) {
    return `
      <div
        class="cell"
        tabindex="0"
        role="textbox"
        aria-multiline="true"
        contenteditable
        data-type="cell"
        data-col-index="${index}"
        data-id="${row}:${index}">
        ${content}
      </div>`;
  };
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
