async function loadLanguageFiles(callback) {
  const langUrls = {
    'ru-RU': 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/rus/ru-RU.lang',
    // Добавьте другие языковые файлы по аналогии
  };

  const langFiles = {};

  for (const [langCode, url] of Object.entries(langUrls)) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      langFiles[langCode] = data;
    } catch (e) {
      console.error(`Ошибка загрузки языкового файла ${url}:`, e);
    }
  }

  callback(null, langFiles);
}

module.exports = loadLanguageFiles;
