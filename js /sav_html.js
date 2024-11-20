function exportHtml() {
  const htmlCode = editor.getHtml();
  const cssCode = editor.getCss();
  const jsCode = editor.getJs();

  // Собираем выбранные скрипты
  const selectedScripts = [];
  if (document.getElementById('script1-checkbox').checked) {
    selectedScripts.push(document.getElementById('script1-checkbox').value);
  }
  if (document.getElementById('script2-checkbox').checked) {
    selectedScripts.push(document.getElementById('script2-checkbox').value);
  }
  if (document.getElementById('script3-checkbox').checked) {
    selectedScripts.push(document.getElementById('script3-checkbox').value);
  }

  // Собираем дополнительные скрипты
  const additionalScripts = selectedScripts.map(script => `<script src="${script}"><\/script>`).join('');

  // Объединение всего в один HTML-файл
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script>${jsCode}<\/script>
      ${additionalScripts}
    </body>
    </html>
  `;

  // Сохранение HTML-файла
  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'page.html';
  a.click();
}
