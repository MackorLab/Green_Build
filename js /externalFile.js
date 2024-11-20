export function loadVKBridge() {
    console.log('Загрузка VK Bridge...');
    return import('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js')
        .then(() => {
            console.log('VK Bridge загружен');
        })
        .catch(error => {
            console.error('Ошибка при загрузке VK Bridge:', error);
        });
}

export function loadOpenAPI() {
    console.log('Загрузка OpenAPI...');
    return import('https://vk.com/js/api/openapi.js?169')
        .then(() => {
            console.log('OpenAPI загружен');
        })
        .catch(error => {
            console.error('Ошибка при загрузке OpenAPI:', error);
        });
}
