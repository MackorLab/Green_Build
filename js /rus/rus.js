editor.I18n.addMessages({
  ru: {
    styleManager: {
      sectors: {
        'general': 'Общие',            
        'dimension': 'Размер',
        'typography': 'Типографика',
        'decorations': 'Оформление',
        'extra': 'Ещё больше',
        'flex': 'Гибкий контейнер',
      },
      properties: {
        'background-repeat': 'Повторение',
        'background-position': 'Позиция',
        'width': 'Ширина',
        'height': 'Высота',
        'max-width': 'Макс. ширина',
        'min-height': 'Мин. высота',
        'margin': 'Отступ',
        'padding': 'Внутр.отступ',
        'font-family': 'Шрифт',
        'font-size': 'Размер шрифта',
        'font-weight': 'Толщина шрифта',
        'color': 'Цвет текста',
        'text-align': 'Вырав. текста',
        'text-decoration': 'Оформ. текста',
        'text-shadow': 'Текст. тень',
        'opacity': 'Прозрачность',
        'border-radius': 'Радиус скруг.',
        'border': 'Граница',
        'box-shadow': 'Тень блока',
        'background': 'Фон',
      }
    },
    blockManager: {
      labels: {
        'responsive-image': 'Адаптивное изображение',
        'centered-text': 'Центрированный текст',
        'basic': 'Основные'
      }
    },
    panels: {
      buttons: {
        'open-code': 'Открыть код',
        'gjs-open-import-webpage': 'Импортировать',
      }
    },
    commands: {
      'gjs-open-import-webpage': {
        title: 'Импортировать шаблон',
        label: '<div style="margin-bottom: 10px; font-size: 13px;">Вставьте здесь ваш HTML/CSS и нажмите Импортировать</div>',
      }
    },
    deviceManager: {
      devices: {
        'desktop': 'ПК',
        'tablet': 'Планшет',
        'mobileLandscape': 'Тел. альбом',
        'mobilePortrait': 'Тел. книга'
      }
    }
  }
});

// Установка русского языка по умолчанию
editor.I18n.setLocale('ru');







// Удаление ненужных блоков
const unwantedBlocks = ['row', 'link', 'blogs'];
unwantedBlocks.forEach(blockId => {
  editor.BlockManager.remove(blockId);
});
    // Добавление блока адаптивной картинки
    editor.BlockManager.add('responsive-image', {
      label: editor.I18n.t('blockManager.labels.responsive-image'),
      content: {
        type: 'image',
        style: {
          display: 'block',
          margin: 'auto',
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover'
        },
        attributes: {
          alt: 'Responsive Image'
        }
      },
      attributes: {
        class: 'fa fa-image'
      }
    });
    // Добавление блока центрированного текста
    editor.BlockManager.add('centered-text', {
      label: editor.I18n.t('blockManager.labels.centered-text'),
      content: {
        type: 'text',
        style: {
          textAlign: 'center'
        },
        content: 'Centered Text'
      },
      attributes: {
        class: 'fa fa-align-center'
      }
    });
























// Создаем новый тип компонента для настройки подписной - 1
editor.Components.addType('avp_grup_v1-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="set_avp_1"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        window.avp = props.avp;
        window.grup = props.grup;
        window.red_url = props.red_url;
        window.hook = props.hook; // Теперь это будет булево значение (true/false)
        const initBlock = () => {
          console.log('Menu settings block initialized with props:', { avp, grup, red_url, hook });
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        // Загружаем необходимые скрипты динамически
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }

        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_grup_v1.js', () => {
          console.log('Custom script loaded!');
        });
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': ['avp', 'grup', 'red_url', 'hook'],
      // Настройки для изменения URL отправки
      traits: [
        {
          type: 'text',
          name: 'avp',
          label: 'AVP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'grup',
          label: 'GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'red_url',
          label: 'RED_URL',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'hook',
          label: 'HOOK',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('avp_grup_v1-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 152 152" viewBox="0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path id="Icon" clip-rule="evenodd" d="m74.5 112.8h7.8c1.3-.2 2.6-.8 3.6-1.6.6-1 1.1-2.1 1.1-3.4 0 0-.2-10.4 4.7-12s10.9 10.1 17.4 14.6c4.9 3.4 8.6 2.6 8.6 2.6l17.4-.3s9.1-.5 4.7-7.6c-.3-.6-2.6-5.2-13-14.9-10.9-10.1-9.4-8.4 3.7-26 8-10.6 11.2-17.1 10.2-20s-6.8-1.9-6.8-1.9l-19.5.2c-.8-.2-1.8 0-2.6.5s-1.3 1.3-1.8 2.1c-1.9 5.2-4.4 10.4-7.1 15.3-8.8 14.8-12.2 15.6-13.6 14.6-3.2-2.1-2.4-8.6-2.4-13.2 0-14.3 2.1-20.3-4.2-21.8-2.9-.6-6-1-9.1-1-7 0-12.8 0-16.2 1.6-2.4 1-4 3.4-3 3.4 2.3.2 4.2 1.3 5.8 2.9 1.9 2.8 1.9 8.8 1.9 8.8s1.1 16.9-2.8 19c-2.6 1.5-6.2-1.5-14-14.9-2.6-4.7-5-9.4-7-14.5-.3-.8-1-1.6-1.6-2.1-.3-.2-.6-.5-1-.5-1-.5-2.1-.6-3.2-.6l-17.4.2s-2.8 0-3.7 1.3c-1 1.3 0 3.2 0 3.2s14.6 34.1 31 51.2c15.1 15.9 32.1 14.8 32.1 14.8z" fill-rule="evenodd" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>
    avp_grup_v1`,
  content: { type: 'avp_grup_v1-settings-block' },
  category: 'ВК - Автопилот', // Добавляем категорию "Автопилот - ВК"
});
























editor.Components.addType('avp_form_v1-settings-block', {
  model: {
    defaults: {
      content: '<div id="set_avp1"></div>',
      script: function(props) {
        window.avp = props.avp;
        window.grup = props.grup;
        window.red_url = props.red_url;
        window.pol_a = props.pol_a;
        window.pol_b = props.pol_b;
        window.new_w = props.new_w;
        const initBlock = () => {
          console.log('Empty block initialized with props:', { avp, grup, red_url, pol_a, pol_b, new_w });
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }
        
        if (typeof VK === 'undefined') {
          loadScript('https://vk.com/js/api/openapi.js?169', () => {
            console.log('VK Open API loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_form.js', () => {
          console.log('Custom script loaded!');
        });
      },
      'script-props': ['avp', 'grup', 'red_url', 'pol_a', 'pol_b', 'new_w'],
      traits: [
        {
          type: 'text',
          name: 'avp',
          label: 'AVP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'grup',
          label: 'GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'red_url',
          label: 'RED_URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'pol_a',
          label: 'POL_A',
          changeProp: true
        },
        {
          type: 'text',
          name: 'pol_b',
          label: 'POL_B',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'new_w',
          label: 'NEW_W', // Обновлен лейбл
          changeProp: true
        }
      ]
    }
  }
});

editor.Blocks.add('avp_form_v1-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 152 152" viewBox="0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path id="Icon" clip-rule="evenodd" d="m74.5 112.8h7.8c1.3-.2 2.6-.8 3.6-1.6.6-1 1.1-2.1 1.1-3.4 0 0-.2-10.4 4.7-12s10.9 10.1 17.4 14.6c4.9 3.4 8.6 2.6 8.6 2.6l17.4-.3s9.1-.5 4.7-7.6c-.3-.6-2.6-5.2-13-14.9-10.9-10.1-9.4-8.4 3.7-26 8-10.6 11.2-17.1 10.2-20s-6.8-1.9-6.8-1.9l-19.5.2c-.8-.2-1.8 0-2.6.5s-1.3 1.3-1.8 2.1c-1.9 5.2-4.4 10.4-7.1 15.3-8.8 14.8-12.2 15.6-13.6 14.6-3.2-2.1-2.4-8.6-2.4-13.2 0-14.3 2.1-20.3-4.2-21.8-2.9-.6-6-1-9.1-1-7 0-12.8 0-16.2 1.6-2.4 1-4 3.4-3 3.4 2.3.2 4.2 1.3 5.8 2.9 1.9 2.8 1.9 8.8 1.9 8.8s1.1 16.9-2.8 19c-2.6 1.5-6.2-1.5-14-14.9-2.6-4.7-5-9.4-7-14.5-.3-.8-1-1.6-1.6-2.1-.3-.2-.6-.5-1-.5-1-.5-2.1-.6-3.2-.6l-17.4.2s-2.8 0-3.7 1.3c-1 1.3 0 3.2 0 3.2s14.6 34.1 31 51.2c15.1 15.9 32.1 14.8 32.1 14.8z" fill-rule="evenodd" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>
    avp_form_v1`,
  content: { type: 'avp_form_v1-settings-block' },
  category: 'ВК - Автопилот', // Добавляем категорию "Автопилот - ВК"
});










editor.Components.addType('avp_kol-settings-block', {
  model: {
    defaults: {
      content: '<div id="set_kol"></div>',
      script: function(props) {
        window.idSpun = props.idSpun;  
        window.but_text = props.but_text;  
        window.color_but = props.color_but;
        window.sector = JSON.parse(props.sector); // Парсим JSON строку сектора
        window.delay = parseInt(props.delay, 10); // Парсим числовое значение delay
        window.avp = props.avp;
        window.grup = props.grup;
        window.red_url = props.red_url;
        window.new_w = props.new_w;
        window.hook = props.hook;         
        const initBlock = () => {
          console.log('Empty block initialized with props:', { idSpun, but_text, color_but, sector, delay, avp, grup, red_url, new_w, hook });
          console.log('Parsed sector:', sector); // Выводим сектор в консоль
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }
        
        if (typeof VK === 'undefined') {
          loadScript('https://vk.com/js/api/openapi.js?169', () => {
            console.log('VK Open API loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_koleso_v1.js', () => {
          console.log('Custom script loaded!');
        });
      },
      'script-props': ['idSpun', 'but_text', 'color_but', 'sector', 'delay', 'avp', 'grup', 'red_url', 'pol_a', 'pol_b', 'new_w'],
      traits: [
        {
          type: 'text',
          name: 'idSpun',
          label: 'IDSPUN',
          changeProp: true
        },
        {
          type: 'text',
          name: 'but_text',
          label: 'BUT_TEXT',
          changeProp: true
        },
        {
          type: 'color',
          name: 'color_but',
          label: 'COLOR_BUT',
          changeProp: true
        },
        {
          type: 'text',
          name: 'sector',
          label: 'SECTORS',
          changeProp: true
        },
        {
          type: 'number', // Изменено на number
          name: 'delay',
          label: 'DELAY',
          changeProp: true,
          min: 100, // Минимальное значение
          max: 10000, // Минимальное значение          
          step: 100, // Шаг изменения
          default: 500 // Значение по умолчанию
        },
        {
          type: 'text',
          name: 'avp',
          label: 'AVP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'grup',
          label: 'GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'red_url',
          label: 'RED_URL',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'new_w',
          label: 'NEW_W', // Обновлен лейбл
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'hook',
          label: 'HOOK',
          changeProp: true
        }
      ]
    }
  }
});

editor.Blocks.add('avp_kol-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 152 152" viewBox="0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path id="Icon" clip-rule="evenodd" d="m74.5 112.8h7.8c1.3-.2 2.6-.8 3.6-1.6.6-1 1.1-2.1 1.1-3.4 0 0-.2-10.4 4.7-12s10.9 10.1 17.4 14.6c4.9 3.4 8.6 2.6 8.6 2.6l17.4-.3s9.1-.5 4.7-7.6c-.3-.6-2.6-5.2-13-14.9-10.9-10.1-9.4-8.4 3.7-26 8-10.6 11.2-17.1 10.2-20s-6.8-1.9-6.8-1.9l-19.5.2c-.8-.2-1.8 0-2.6.5s-1.3 1.3-1.8 2.1c-1.9 5.2-4.4 10.4-7.1 15.3-8.8 14.8-12.2 15.6-13.6 14.6-3.2-2.1-2.4-8.6-2.4-13.2 0-14.3 2.1-20.3-4.2-21.8-2.9-.6-6-1-9.1-1-7 0-12.8 0-16.2 1.6-2.4 1-4 3.4-3 3.4 2.3.2 4.2 1.3 5.8 2.9 1.9 2.8 1.9 8.8 1.9 8.8s1.1 16.9-2.8 19c-2.6 1.5-6.2-1.5-14-14.9-2.6-4.7-5-9.4-7-14.5-.3-.8-1-1.6-1.6-2.1-.3-.2-.6-.5-1-.5-1-.5-2.1-.6-3.2-.6l-17.4.2s-2.8 0-3.7 1.3c-1 1.3 0 3.2 0 3.2s14.6 34.1 31 51.2c15.1 15.9 32.1 14.8 32.1 14.8z" fill-rule="evenodd" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>
    avp_kol`,
  content: { type: 'avp_kol-settings-block' },
  category: 'ВК - Автопилот', // Добавляем категорию "Автопилот - ВК"
});









editor.Components.addType('avp_kol_s-settings-block', {
  model: {
    defaults: {
      content: '<div id="set_kol_s"></div>',
      script: function(props) {
        window.idSpun = props.idSpun;  
        window.but_text = props.but_text;  
        window.color_but = props.color_but;
        window.sector = JSON.parse(props.sector); // Парсим JSON строку сектора
        window.delay = parseInt(props.delay, 10); // Парсим числовое значение delay
        window.sound_r = props.sound_r;
        window.sound_s = props.sound_s;        
        window.avp = props.avp;
        window.grup = props.grup;
        window.red_url = props.red_url;
        window.new_w = props.new_w;
        window.hook = props.hook;         
        const initBlock = () => {
          console.log('Empty block initialized with props:', { idSpun, but_text, color_but, sector, delay, sound_r, sound_s, avp, grup, red_url, new_w, hook });
          console.log('Parsed sector:', sector); // Выводим сектор в консоль
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }
        
        if (typeof VK === 'undefined') {
          loadScript('https://vk.com/js/api/openapi.js?169', () => {
            console.log('VK Open API loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_kol_vk_sav.js', () => {
          console.log('Custom script loaded!');
        });
      },
      'script-props': ['idSpun', 'but_text', 'color_but', 'sector', 'delay', 'sound_r', 'sound_s', 'avp', 'grup', 'red_url', 'pol_a', 'pol_b', 'new_w'],
      traits: [
        {
          type: 'text',
          name: 'idSpun',
          label: 'IDSPUN',
          changeProp: true
        },
        {
          type: 'text',
          name: 'but_text',
          label: 'BUT_TEXT',
          changeProp: true
        },
        {
          type: 'color',
          name: 'color_but',
          label: 'COLOR_BUT',
          changeProp: true
        },
        {
          type: 'text',
          name: 'sector',
          label: 'SECTORS',
          changeProp: true
        },
        {
          type: 'number', // Изменено на number
          name: 'delay',
          label: 'DELAY',
          changeProp: true,
          min: 100, // Минимальное значение
          max: 10000, // Минимальное значение          
          step: 100, // Шаг изменения
          default: 500 // Значение по умолчанию
        },
        {
          type: 'text',
          name: 'sound_r',
          label: 'SAUND_R',
          changeProp: true
        },
        {
          type: 'text',
          name: 'sound_s',
          label: 'SAUND_S',
          changeProp: true
        },
        {
          type: 'text',
          name: 'avp',
          label: 'AVP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'grup',
          label: 'GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'red_url',
          label: 'RED_URL',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'new_w',
          label: 'NEW_W', // Обновлен лейбл
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'hook',
          label: 'HOOK',
          changeProp: true
        }
      ]
    }
  }
});

editor.Blocks.add('avp_kol_s-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 152 152" viewBox="0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path id="Icon" clip-rule="evenodd" d="m74.5 112.8h7.8c1.3-.2 2.6-.8 3.6-1.6.6-1 1.1-2.1 1.1-3.4 0 0-.2-10.4 4.7-12s10.9 10.1 17.4 14.6c4.9 3.4 8.6 2.6 8.6 2.6l17.4-.3s9.1-.5 4.7-7.6c-.3-.6-2.6-5.2-13-14.9-10.9-10.1-9.4-8.4 3.7-26 8-10.6 11.2-17.1 10.2-20s-6.8-1.9-6.8-1.9l-19.5.2c-.8-.2-1.8 0-2.6.5s-1.3 1.3-1.8 2.1c-1.9 5.2-4.4 10.4-7.1 15.3-8.8 14.8-12.2 15.6-13.6 14.6-3.2-2.1-2.4-8.6-2.4-13.2 0-14.3 2.1-20.3-4.2-21.8-2.9-.6-6-1-9.1-1-7 0-12.8 0-16.2 1.6-2.4 1-4 3.4-3 3.4 2.3.2 4.2 1.3 5.8 2.9 1.9 2.8 1.9 8.8 1.9 8.8s1.1 16.9-2.8 19c-2.6 1.5-6.2-1.5-14-14.9-2.6-4.7-5-9.4-7-14.5-.3-.8-1-1.6-1.6-2.1-.3-.2-.6-.5-1-.5-1-.5-2.1-.6-3.2-.6l-17.4.2s-2.8 0-3.7 1.3c-1 1.3 0 3.2 0 3.2s14.6 34.1 31 51.2c15.1 15.9 32.1 14.8 32.1 14.8z" fill-rule="evenodd" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>
    avp_kol_s`,
  content: { type: 'avp_kol_s-settings-block' },
  category: 'ВК - Автопилот', // Добавляем категорию "Автопилот - ВК"
});





// Создаем новый тип компонента для настройки Регистрации с сайта через АП
editor.Components.addType('avp-reg_site-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="set_avp_reg_site"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        window.avp = props.avp;
        window.app_id = props.app_id;        
        const initBlock = () => {
          console.log('Menu settings block initialized with props:', { avp, app_id});
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        // Загружаем необходимые скрипты динамически
        if (typeof VK === 'undefined') {
          loadScript('https://vk.com/js/api/openapi.js?169', () => {
            console.log('VK Open API loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }

        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('VK Open API loaded!');
          });
        }
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_site_grup.js', () => {
          console.log('Custom script loaded!');
        });
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': ['avp', 'app_id'],
      // Настройки для изменения URL отправки
      traits: [
        {
          type: 'text',
          name: 'avp',
          label: 'AVP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'app_id',
          label: 'APP_ID',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('avp-reg_site-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 152 152" viewBox="0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path id="Icon" clip-rule="evenodd" d="m74.5 112.8h7.8c1.3-.2 2.6-.8 3.6-1.6.6-1 1.1-2.1 1.1-3.4 0 0-.2-10.4 4.7-12s10.9 10.1 17.4 14.6c4.9 3.4 8.6 2.6 8.6 2.6l17.4-.3s9.1-.5 4.7-7.6c-.3-.6-2.6-5.2-13-14.9-10.9-10.1-9.4-8.4 3.7-26 8-10.6 11.2-17.1 10.2-20s-6.8-1.9-6.8-1.9l-19.5.2c-.8-.2-1.8 0-2.6.5s-1.3 1.3-1.8 2.1c-1.9 5.2-4.4 10.4-7.1 15.3-8.8 14.8-12.2 15.6-13.6 14.6-3.2-2.1-2.4-8.6-2.4-13.2 0-14.3 2.1-20.3-4.2-21.8-2.9-.6-6-1-9.1-1-7 0-12.8 0-16.2 1.6-2.4 1-4 3.4-3 3.4 2.3.2 4.2 1.3 5.8 2.9 1.9 2.8 1.9 8.8 1.9 8.8s1.1 16.9-2.8 19c-2.6 1.5-6.2-1.5-14-14.9-2.6-4.7-5-9.4-7-14.5-.3-.8-1-1.6-1.6-2.1-.3-.2-.6-.5-1-.5-1-.5-2.1-.6-3.2-.6l-17.4.2s-2.8 0-3.7 1.3c-1 1.3 0 3.2 0 3.2s14.6 34.1 31 51.2c15.1 15.9 32.1 14.8 32.1 14.8z" fill-rule="evenodd" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>
    avp_reg_site`,
  content: { type: 'avp-reg_site-settings-block' },
  category: 'ВК - Автопилот', // Добавляем категорию "Автопилот - ВК"
});



































// Создаем новый тип компонента для настройки 
editor.Components.addType('avp-look_1-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="set_avp-look_v1"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        window.avp = props.avp;
        window.grup = props.grup;
        window.hook = props.hook; // Теперь это будет булево значение (true/false)
        const initBlock = () => {
          console.log('Menu settings block initialized with props:', { avp, grup, hook });
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        // Загружаем необходимые скрипты динамически
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }
        
        if (typeof VK === 'undefined') {
          loadScript('https://vk.com/js/api/openapi.js?169', () => {
            console.log('VK Open API loaded!');
          });
        }

        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('VK Open API loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_look_v1.js', () => {
          console.log('Custom script loaded!');
        });
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': ['avp', 'grup', 'hook'],
      // Настройки для изменения URL отправки
      traits: [
        {
          type: 'text',
          name: 'avp',
          label: 'AVP',
          changeProp: true
        },
        {
          type: 'text',
          name: 'grup',
          label: 'GRUP',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'hook',
          label: 'HOOK',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('avp-look_1-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="36" height="36"><g><g><path d="M437.333,192h-32v-42.667C405.333,66.99,338.344,0,256,0S106.667,66.99,106.667,149.333V160 c0,5.896,4.771,10.667,10.667,10.667H160c5.896,0,10.667-4.771,10.667-10.667v-10.667C170.667,102.281,208.948,64,256,64 s85.333,38.281,85.333,85.333V192H74.667C68.771,192,64,196.771,64,202.667v266.667C64,492.865,83.135,512,106.667,512h298.667 C428.865,512,448,492.865,448,469.333V202.667C448,196.771,443.229,192,437.333,192z M287.938,414.823 c0.333,3.01-0.635,6.031-2.656,8.292c-2.021,2.26-4.917,3.552-7.948,3.552h-42.667c-3.031,0-5.927-1.292-7.948-3.552 c-2.021-2.26-2.99-5.281-2.656-8.292l6.729-60.51c-10.927-7.948-17.458-20.521-17.458-34.313 c0-23.531,19.135-42.667,42.667-42.667s42.667,19.135,42.667,42.667c0,13.792-6.531,26.365-17.458,34.313L287.938,414.823z" fill="#000000" style="fill: rgb(250, 250, 250);"></path></g></g></svg>
    avp_lock_v1`,
  content: { type: 'avp-look_1-settings-block' },
  category: 'ВК - Автопилот', // Добавляем категорию "Автопилот - ВК"
});





//  МЕНЮ
editor.Components.addType('menu-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="contents"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        // Функция для загрузки скрипта
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        window.home_url = props.home_url; // Добавляем home_url
        window.but_url = JSON.parse(props.but_url); // Парсим JSON строку сектора
        const initBlock = () => {
          console.log('Menu settings block initialized with props:', { home_url, but_url });
        };
        // Проверяем, загружен ли уже jQuery
        if (typeof $ === 'undefined') {
          // Загружаем библиотеку jQuery
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('jQuery loaded!');
            // Загружаем необходимый скрипт динамически
            loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/menu_vk.js', () => {
              console.log('Custom script loaded!');
              initBlock();
            });
          });
        } else {
          console.log('jQuery is already loaded!');
          // Загружаем необходимый скрипт динамически
          loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/menu_vk.js', () => {
            console.log('Custom script loaded!');
            initBlock();
          });
        }
      },
      // Добавляем traits
      traits: [
        {
          type: 'text',
          name: 'home_url',
          label: 'home_url',
          changeProp: true
        },
        {
          type: 'text',
          name: 'but_url',
          label: 'but_url',
          changeProp: true
        }
      ],
      // Добавляем свойство 'script-props'
      'script-props': ['home_url', 'but_url']
    }
  }
});
// Создаем блок для компонента настройки меню
editor.Blocks.add('menu-settings-block-block', {
  label: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <!-- icon666.com - MILLIONS vector ICONS FREE --><svg enable-background="new 0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><g id="Layer_2" data-name="Layer 2"><path d="m28 3h-16a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m4 3a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m28 13h-16a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m4 13a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m28 23h-16a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m4 23a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" fill="#000000" style="fill: rgb(250, 250, 250);"></path></g></svg>
      <span style="margin-top: 8px;">menu-set</span>
    </div>`,
  content: { type: 'menu-settings-block' },
});










//  APPS С ДОСТУПОМ
editor.Components.addType('apps-look-settings-block', {
  model: {
    defaults: {
      content: '<div id="apps_look_vk"></div>',
      script: function(props) {
        window.w_a_url = props.w_a_url;    
        window.vk_a_group = props.vk_a_group;
        window.order_a = props.order_a;           
        window.not_a_g_url = props.not_a_g_url;
        window.not_a_o_url = props.not_a_o_url;       
        const initBlock = () => {
           console.log('18CoastCustoms');
           console.log('GB_page_look');          
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        // Загружаем необходимые скрипты динамически
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('Библиотеки VK загружены!');
          });
        }
        if (typeof CryptoJS === 'undefined') {
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js', () => {
            console.log('Библиотеки CryptoJS загружены!');
          });
        }
        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('Библиотеки jQuery загружены!');
          });
        }

        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/apps_look_v1', () => {
          console.log('Кастомные скрипты загружены!');
          initBlock(); // Вызываем initBlock после загрузки всех скриптов
          
        });
      },
      'script-props': ['w_a_url', 'vk_a_group', 'order_a', 'not_a_g_url', 'not_a_o_url'],
      traits: [
        {
          type: 'text',
          name: 'w_a_url',
          label: 'W-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'vk_a_group',
          label: 'VK-Group',
          changeProp: true
        },
        {
          type: 'text',
          name: 'order_a',
          label: 'Order',
          changeProp: true
        },
        {
          type: 'text',
          name: 'not_a_g_url',
          label: 'Not-Group-URL',
          changeProp: true
        },
        {
          type: 'text', 
          name: 'not_a_o_url',
          label: 'Not-Order-URL',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('apps-look-settings-block-block', {
    label: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <svg viewBox="-26 0 437 437.33333" xmlns="http://www.w3.org/2000/svg" style="width: 36px; height: 36px;">
        <path d="m384.167969 437.332031h-384v-437.332031h384zm-362.667969-21.332031h341.332031v-394.667969h-341.332031zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 192h106.664062v21.332031h-106.664062zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 128h106.664062v21.332031h-106.664062zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 256h256v21.332031h-256zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 320h256v21.332031h-256zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 64h106.664062v21.332031h-106.664062zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m320.167969 213.332031h-106.667969v-149.332031h106.667969zm-85.335938-21.332031h64v-106.667969h-64zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
      </svg>
      <span style="margin-top: 8px;">Apps-look-set</span>
    </div>`,
    content: { type: 'apps-look-settings-block' },
    category: 'ВК - Доступы',
});



//  СТРАНИЦА С ДОСТУПОМ
editor.Components.addType('page-look-settings-block', {
  model: {
    defaults: {
      content: '<div id="page_look_vk"></div>',
      script: function(props) {
        window.w_p_url = props.w_p_url;     
        window.apps_p_id = props.apps_p_id;     
        window.vk_p_group = props.vk_p_group;
        window.order_p = props.order_p;           
        window.not_p_g_url = props.not_p_g_url;
        window.not_p_o_url = props.not_p_o_url;       
        const initBlock = () => {
           console.log('18CoastCustoms');
           console.log('GB_page_look');          
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        // Загружаем необходимые скрипты динамически
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('Библиотеки VK загружены!');
          });
        }
        if (typeof CryptoJS === 'undefined') {
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js', () => {
            console.log('Библиотеки CryptoJS загружены!');
          });
        }
        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('Библиотеки jQuery загружены!');
          });
        }

        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/page_look_v1.js', () => {
          console.log('Кастомные скрипты загружены!');
          initBlock(); // Вызываем initBlock после загрузки всех скриптов
          
        });
      },
      'script-props': ['w_p_url', 'apps_p_id', 'vk_p_group', 'order_p', 'not_p_g_url', 'not_p_o_url'],
      traits: [
        {
          type: 'text',
          name: 'w_p_url',
          label: 'W-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'apps_p_id',
          label: 'Apps_ID',
          changeProp: true
        },
        {
          type: 'text',
          name: 'vk_p_group',
          label: 'VK-Group',
          changeProp: true
        },
        {
          type: 'text',
          name: 'order_p',
          label: 'Order',
          changeProp: true
        },
        {
          type: 'text',
          name: 'not_p_g_url',
          label: 'Not-Group-URL',
          changeProp: true
        },
        {
          type: 'text', 
          name: 'not_p_o_url',
          label: 'Not-Order-URL',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('page-look-settings-block-block', {
    label: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <svg viewBox="-26 0 437 437.33333" xmlns="http://www.w3.org/2000/svg" style="width: 36px; height: 36px;">
        <path d="m384.167969 437.332031h-384v-437.332031h384zm-362.667969-21.332031h341.332031v-394.667969h-341.332031zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 192h106.664062v21.332031h-106.664062zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 128h106.664062v21.332031h-106.664062zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 256h256v21.332031h-256zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 320h256v21.332031h-256zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m64.167969 64h106.664062v21.332031h-106.664062zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
        <path d="m320.167969 213.332031h-106.667969v-149.332031h106.667969zm-85.335938-21.332031h64v-106.667969h-64zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path>
      </svg>
      <span style="margin-top: 8px;">page-look-set</span>
    </div>`,
    content: { type: 'page-look-settings-block' },
    category: 'ВК - Доступы',
});















//МЕНЮ С ДОСТУПОМ
editor.Components.addType('menu-look-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="menu_look_vk"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        window.w_url = props.w_url; 
        window.key_auth = props.key_auth;          
        window.vk_group = props.vk_group;
        window.order_m = props.order_m;           
        window.not_g_url = props.not_g_url;
        window.not_o_url = props.not_o_url; 
        window.home_url = props.home_url;
        window.list_url = JSON.parse(props.list_url); // Парсим JSON строку сектора         
        const initBlock = () => {
           console.log('18CoastCustoms');
           console.log('GB_menu_look_v2_14');          
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        // Загружаем необходимые скрипты динамически
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('Библиотеки VK загружены');
          });
        }
        if (typeof CryptoJS === 'undefined') {
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js', () => {
            console.log('CryptoJS loaded!');
          });
        }
        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            
          });
        }
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/menu_look_v1.js', () => {
          initBlock();
          console.log('Кастомные скрипты загружены');
        });
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': ['w_url', 'key_auth', 'vk_group', 'order_m', 'not_g_url', 'not_o_url', 'home_url', 'list_url'],
      // Настройки для изменения URL отправки
      traits: [
        {
          type: 'text',
          name: 'w_url',
          label: 'W-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'key_auth',
          label: 'Key-Auth-Crypto',
          changeProp: true
        },
        {
          type: 'text',
          name: 'vk_group',
          label: 'VK-Group',
          changeProp: true
        },
        {
          type: 'text',
          name: 'order_m',
          label: 'Order',
          changeProp: true
        },
        {
          type: 'text',
          name: 'not_g_url',
          label: 'Not-Group-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'not_o_url',
          label: 'Not-Order-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'home_url',
          label: 'Home-URL-Crypto',
          changeProp: true
        },
        {
          type: 'text',
          name: 'list_url',
          label: 'Menu-URL-Crypto',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('menu-look-settings-block-block', {
    label: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <!-- icon666.com - MILLIONS vector ICONS FREE --><svg enable-background="new 0 0 152 152" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><g id="Layer_2" data-name="Layer 2"><path d="m28 3h-16a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m4 3a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m28 13h-16a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m4 13a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m28 23h-16a3 3 0 0 0 0 6h16a3 3 0 0 0 0-6zm0 4h-16a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z" fill="#000000" style="fill: rgb(250, 250, 250);"></path><path d="m4 23a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" fill="#000000" style="fill: rgb(250, 250, 250);"></path></g></svg>
      <span style="margin-top: 8px;">menu-look-set</span>
    </div>`,
    content: { type: 'menu-look-settings-block' },
  category: 'ВК - Доступы', // Добавляем категорию "Автопилот - ВК"
});










// Сенлера КНОПКА с ВК-ИД
editor.Components.addType('senler_btn_v1-settings-block', {
  model: {
    defaults: {
      content: '<div id="set_senler_btn_1"></div>',
      script: function(props) {
        window.w_url = props.w_url;
        window.vk_grup = props.vk_grup;
        window.s_grup = props.s_grup;
        window.red_on = props.red_on;        
        window.on_url = props.on_url;
        window.ups = props.ups;        
        window.clarity_on = props.clarity_on; 
        window.clarity_id = props.clarity_id;         
        window.clarity_ses = props.clarity_ses;
        window.clarity_tar = props.clarity_tar;
        window.funnel = props.funnel; 
        window.clarity_ev = props.clarity_ev;          
        const initBlock = () => {
           console.log('18CoastCustoms');
           console.log('GB_page_look'); 
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
          });
        }
        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('jquery loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/senler_btn_v1.js', () => {
          initBlock();
          console.log('Custom script loaded!');
        });
      },
      'script-props': ['w_url', 'vk_grup', 's_grup', 'red_on', 'on_url', 'ups', 'clarity_on', 'clarity_id', 'clarity_ses', 'clarity_tar', 'funnel', 'clarity_ev'],
      traits: [
        {
          type: 'text',
          name: 'w_url',
          label: 'W_URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'vk_grup',
          label: 'VK_GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 's_grup',
          label: 'S_GRUP',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'red_on',
          label: 'Redirect + User_ID',
          changeProp: true
        },
        {
          type: 'text',
          name: 'on_url',
          label: 'Redirect-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'ups',
          label: 'Parameter UPS',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'clarity_on',
          label: 'Clarity Analytics',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_id',
          label: 'Script Key',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_ses',
          label: 'Session Name',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_tar',
          label: 'Page Name',
          changeProp: true
        },
        {
          type: 'text',
          name: 'funnel',
          label: 'Funnel Stage',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_ev',
          label: 'Button Event',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('senler_form_btn_v1-settings-block-block', {
  label: `
    <img src="https://senler.ru/web/images/marketing-1.png" width="64" height="36" alt="senler_form_v">
    Button_v1`,
  content: { type: 'senler_btn_v1-settings-block' },
  category: 'ВК - Сенлер', // Добавляем категорию "Сенлер - ВК"
});










// Сенлера КНОПКА с ВК-ИД и параметрами пользователя
editor.Components.addType('senler_btn_ud_v1-settings-block', {
  model: {
    defaults: {
      content: '<div id="set_senler_btn_1"></div>',
      script: function(props) {
        window.w_url = props.w_url;
        window.vk_grup = props.vk_grup;
        window.s_grup = props.s_grup;
        window.red_on = props.red_on;        
        window.on_url = props.on_url;
        window.ups = props.ups;        
        window.clarity_on = props.clarity_on; 
        window.clarity_id = props.clarity_id;         
        window.clarity_ses = props.clarity_ses;
        window.clarity_tar = props.clarity_tar;
        window.funnel = props.funnel; 
        window.clarity_ev = props.clarity_ev;          
        const initBlock = () => {
           console.log('18CoastCustoms');
           console.log('GB_page_look'); 
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
          });
        }
        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('jquery loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/senler_btn_ud_v1.js', () => {
          initBlock();
          console.log('Custom script loaded!');
        });
      },
      'script-props': ['w_url', 'vk_grup', 's_grup', 'red_on', 'on_url', 'ups', 'clarity_on', 'clarity_id', 'clarity_ses', 'clarity_tar', 'funnel', 'clarity_ev'],
      traits: [
        {
          type: 'text',
          name: 'w_url',
          label: 'W_URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'vk_grup',
          label: 'VK_GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 's_grup',
          label: 'S_GRUP',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'red_on',
          label: 'Redirect + User_ID',
          changeProp: true
        },
        {
          type: 'text',
          name: 'on_url',
          label: 'Redirect-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'ups',
          label: 'Parameter UPS',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'clarity_on',
          label: 'Clarity Analytics',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_id',
          label: 'Script Key',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_ses',
          label: 'Session Name',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_tar',
          label: 'Page Name',
          changeProp: true
        },
        {
          type: 'text',
          name: 'funnel',
          label: 'Funnel Stage',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_ev',
          label: 'Button Event',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('senler_form_btn_ud_v1-settings-block-block', {
  label: `
    <img src="https://senler.ru/web/images/marketing-1.png" width="64" height="36" alt="senler_form_v">
    Button #user dats_v1`,
  content: { type: 'senler_btn_ud_v1-settings-block' },
  category: 'ВК - Сенлер', // Добавляем категорию "Сенлер - ВК"
});




// Создаем новый тип компонента для настройки формы для Сенлера
editor.Components.addType('senler_form_v1-settings-block', {
  model: {
    defaults: {
      content: '<div id="set_senler_1"></div>',
      script: function(props) {
        window.w_url = props.w_url;
        window.vk_grup = props.vk_grup;
        window.s_grup = props.s_grup;
        window.red_on = props.red_on;
        window.on_url = props.on_url;
        window.ups = props.ups;        
        window.clarity_on = props.clarity_on; 
        window.clarity_id = props.clarity_id;         
        window.clarity_ses = props.clarity_ses;
        window.clarity_tar = props.clarity_tar;
        window.funnel = props.funnel;        
        window.clarity_ev = props.clarity_ev; 

        const initBlock = () => {
         //  console.log('Empty block initialized with props:', { w_url, vk_grup, s_grup, on_url, off_url });
        };
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        if (typeof vkBridge === 'undefined') {
          loadScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js', () => {
            console.log('VK Bridge loaded!');
          });
        }
        if (typeof $ === 'undefined') {
          loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
            console.log('jquery loaded!');
          });
        }
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/senler_form_v1.js', () => {
          initBlock();
          console.log('Custom script loaded!');
        });
      },
      'script-props': ['w_url', 'vk_grup', 's_grup', 'red_on', 'on_url', 'ups', 'clarity_on', 'clarity_id', 'clarity_ses', 'clarity_tar', 'funnel', 'clarity_ev'],
      traits: [
        {
          type: 'text',
          name: 'w_url',
          label: 'W_URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'vk_grup',
          label: 'VK_GRUP',
          changeProp: true
        },
        {
          type: 'text',
          name: 's_grup',
          label: 'S_GRUP',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'red_on',
          label: 'Redirect + User_ID',
          changeProp: true
        },
        {
          type: 'text',
          name: 'on_url',
          label: 'Redirect-URL',
          changeProp: true
        },
        {
          type: 'text',
          name: 'ups',
          label: 'Parameter UPS',
          changeProp: true
        },
        {
          type: 'checkbox', // Изменено на checkbox
          name: 'clarity_on',
          label: 'Clarity Analytics',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_id',
          label: 'Script Key',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_ses',
          label: 'Session Name',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_tar',
          label: 'Page Name',
          changeProp: true
        },
        {
          type: 'text',
          name: 'funnel',
          label: 'Funnel Stage',
          changeProp: true
        },
        {
          type: 'text',
          name: 'clarity_ev',
          label: 'Button Event',
          changeProp: true
        }
      ]
    }
  }
});
editor.Blocks.add('senler_form_v1-settings-block-block', {
  label: `
    <img src="https://senler.ru/web/images/marketing-1.png" width="64" height="36" alt="senler_form_v">
    Form_v1`,
  content: { type: 'senler_form_v1-settings-block' },
  category: 'ВК - Сенлер', // Добавляем категорию "Сенлер - ВК"
});












// Создаем новый тип компонента для настройки подписной - Анти-копир
editor.Components.addType('anti_copy-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="set_anti_copy"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        const initBlock = () => {
          console.log('Menu settings block initialized');
          // Здесь можно добавить логику инициализации блока
        };

        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };

        // Загружаем необходимые скрипты динамически
        if (typeof anti_copy === 'undefined') {
          loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/anti_copy.js', () => {
            console.log('avp_grup_v1 loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': [],
      // Настройки для изменения URL отправки
      traits: []
    }
  }
});

editor.Blocks.add('anti_copy-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg viewBox="0 0 512.00028 512" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path d="m502.613281 317.441406c-5.761719-2.917968-12.675781-2.3125-17.84375 1.558594l-23.96875 17.84375v-63.84375c-.039062-14.085938-11.449219-25.496094-25.53125-25.53125h-5.8125l-58.605469-42.847656c-14.554687-11.132813-34.753906-11.179688-49.359374-.109375l-59.730469 42.957031h-5.855469c-14.074219.050781-25.46875 11.453125-25.507812 25.53125v63.75l-23.96875-17.773438c-5.179688-3.839843-12.078126-4.433593-17.835938-1.535156-5.757812 2.898438-9.390625 8.792969-9.394531 15.238282v109.347656l-43.519531-38.042969 5.386718-5.382813c3.230469-3.347656 3.1875-8.671874-.105468-11.964843-3.292969-3.289063-8.613282-3.335938-11.960938-.101563l-6 6-23.039062-23.042968c-20.359376-20.257813-31.769532-47.816407-31.695313-76.535157v-79.625c0-18.851562-15.28125-34.132812-34.132813-34.132812-18.851562 0-34.132812 15.28125-34.132812 34.132812v42.667969c0 4.714844 3.820312 8.535156 8.535156 8.535156 4.710938 0 8.53125-3.820312 8.53125-8.535156v-42.667969c0-9.425781 7.640625-17.066406 17.066406-17.066406 9.425782 0 17.066407 7.640625 17.066407 17.066406v79.625c-.089844 33.253907 13.121093 65.164063 36.695312 88.621094l23.039063 23.039063-6.035156 6.03125c-2.214844 2.144531-3.105469 5.316406-2.324219 8.300781s3.109375 5.3125 6.09375 6.09375 6.15625-.109375 8.296875-2.328125l6.246094-6.238282c.679687.503907 1.429687.902344 2.230468 1.179688l53.757813 47.019531v30.257813c0 9.425781 7.640625 17.066406 17.066406 17.066406h298.667969c9.425781 0 17.066406-7.640625 17.066406-17.066406v-162.21875c.035156-6.464844-3.601562-12.386719-9.386719-15.273438zm-171-99.191406c8.59375-6.546875 20.507813-6.515625 29.066407.074219l39.859374 29.144531h-109.550781zm-84.148437 54.75c.007812-4.675781 3.792968-8.460938 8.46875-8.464844h179.335937c4.671875.003906 8.460938 3.789063 8.464844 8.464844v75.773438c0 .238281.117187.4375.136719.667968l-83.628906 62.207032c-8.558594 6.414062-20.324219 6.414062-28.882813 0l-83.894531-62.242188zm247.46875 221.933594h-298.667969v-18.773438c5.445313 2.097656 11.230469 3.175782 17.066406 3.175782 11.777344.152343 23.144531-4.339844 31.632813-12.503907 12.179687-13.105469 15.804687-32.019531 9.328125-48.699219h1.707031c4.710938 0 8.535156-3.820312 8.535156-8.53125 0-4.714843-3.824218-8.535156-8.535156-8.535156h-34.132812c-4.714844 0-8.535157 3.820313-8.535157 8.535156 0 4.710938 3.820313 8.53125 8.535157 8.53125h13.011718c8.03125 11.160157 7.207032 26.40625-1.980468 36.632813-5.285157 4.972656-12.3125 7.667969-19.566407 7.503906-6.132812.054688-12.121093-1.878906-17.066406-5.503906v-124.078125l124.964844 92.664062c14.589843 10.921876 34.632812 10.921876 49.226562 0l124.476563-92.636718zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m281.601562 307.199219h128c4.710938 0 8.53125-3.820313 8.53125-8.53125 0-4.714844-3.820312-8.535157-8.53125-8.535157h-128c-4.714843 0-8.535156 3.820313-8.535156 8.535157 0 4.710937 3.820313 8.53125 8.535156 8.53125zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m418.132812 332.800781c0-4.714843-3.820312-8.535156-8.53125-8.535156h-128c-4.714843 0-8.535156 3.820313-8.535156 8.535156 0 4.710938 3.820313 8.53125 8.535156 8.53125h128c4.710938 0 8.53125-3.820312 8.53125-8.53125zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m27.578125 150.535156c3.019531 3.621094 8.398437 4.109375 12.015625 1.09375l20.140625-16.800781 20.136719 16.785156c2.34375 1.949219 5.550781 2.5 8.414062 1.445313 2.863282-1.054688 4.945313-3.554688 5.460938-6.558594.519531-3.007812-.605469-6.0625-2.953125-8.011719l-17.730469-14.753906 17.730469-14.773437c2.347656-1.949219 3.472656-5.003907 2.953125-8.007813-.515625-3.007813-2.597656-5.507813-5.460938-6.5625-2.863281-1.054687-6.070312-.503906-8.414062 1.449219l-11.605469 9.675781v-96.980469c0-4.714844-3.820313-8.535156-8.53125-8.535156-4.714844 0-8.535156 3.820312-8.535156 8.535156v96.980469l-11.605469-9.675781c-3.625-3.019532-9.007812-2.523438-12.023438 1.097656-3.015624 3.625-2.523437 9.007812 1.101563 12.023438l17.730469 14.773437-17.730469 14.769531c-1.742187 1.449219-2.835937 3.53125-3.042969 5.789063-.203125 2.257812.496094 4.503906 1.949219 6.242187zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m256 25.601562c-18.851562 0-34.132812 15.28125-34.132812 34.132813.03125 8.167969 3.019531 16.050781 8.414062 22.1875l-16.949219 16.945313-26.023437-26.035157c-24.730469-24.859375-58.378906-38.792969-93.441406-38.699219-1.019532.019532-2.03125.222657-2.980469.597657-.289063.113281-.574219.242187-.851563.382812-.640625.324219-1.238281.730469-1.773437 1.203125-.230469.183594-.453125.378906-.660157.589844-.625.664062-1.136718 1.425781-1.515624 2.253906 0 .078125-.09375.136719-.128907.210938-.367187.945312-.566406 1.945312-.589843 2.953125 0 .113281-.058594.207031-.058594.316406 0 .113281.09375.34375.101562.53125.050782.765625.207032 1.523437.460938 2.25.078125.273437.171875.542969.28125.804687.402344.894532.953125 1.710938 1.628906 2.421876l70.820312 70.820312-70.769531 70.765625c-2.4375 2.441406-3.167969 6.109375-1.847656 9.296875s4.429687 5.269531 7.882813 5.269531c35.0625.09375 68.710937-13.839843 93.441406-38.699219l26.023437-26.035156 16.949219 16.945313c-5.394531 6.136719-8.382812 14.019531-8.414062 22.1875-.207032 15.15625 9.46875 28.683593 23.875 33.382812 14.410156 4.699219 30.199218-.523437 38.964843-12.886719 8.769531-12.363281 8.46875-28.992187-.730469-41.035156-9.203124-12.042968-25.171874-16.695312-39.402343-11.484375l-22.707031-22.707031v-10.003906l22.707031-22.707032c12.789062 4.574219 27.074219 1.113282 36.351562-8.808593 9.28125-9.917969 11.78125-24.402344 6.367188-36.859375-5.414063-12.457032-17.710938-20.507813-31.292969-20.488282zm-139.273438 159.871094 53.941407-53.941406 13.53125 13.535156-8.957031 8.96875c-15.964844 16.039063-36.328126 26.980469-58.515626 31.4375zm79.539063-52.472656-79.53125-79.53125c3.246094.648438 6.445313 1.476562 9.601563 2.398438.964843.28125 1.921874.613281 2.882812.921874 2.339844.75 4.644531 1.570313 6.929688 2.476563.957031.375 1.914062.742187 2.859374 1.152344 2.945313 1.253906 5.835938 2.558593 8.671876 4.09375.132812.078125.28125.136719.417968.207031 2.949219 1.585938 5.816406 3.335938 8.632813 5.1875.855469.535156 1.632812 1.117188 2.449219 1.707031 2.066406 1.433594 4.089843 2.933594 6.078124 4.503907.785157.632812 1.578126 1.246093 2.355469 1.894531 2.617188 2.191406 5.179688 4.472656 7.628907 6.914062l23.523437 23.53125 6.035156 6.035157v10zm76.800781 46.199219c0 9.425781-7.640625 17.066406-17.066406 17.066406s-17.066406-7.640625-17.066406-17.066406 7.640625-17.066407 17.066406-17.066407 17.066406 7.640626 17.066406 17.066407zm-17.066406-102.398438c-9.425781 0-17.066406-7.640625-17.066406-17.066406s7.640625-17.066406 17.066406-17.066406 17.066406 7.640625 17.066406 17.066406c0 4.527344-1.796875 8.867187-5 12.066406-3.199218 3.203125-7.539062 5-12.066406 5zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m264.535156 110.933594c-4.714844 0-8.535156 3.820312-8.535156 8.535156 0 4.710938 3.820312 8.53125 8.535156 8.53125h17.066406c4.710938 0 8.53125-3.820312 8.53125-8.53125 0-4.714844-3.820312-8.535156-8.53125-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m315.734375 110.933594c-4.714844 0-8.535156 3.820312-8.535156 8.535156 0 4.710938 3.820312 8.53125 8.535156 8.53125h17.066406c4.710938 0 8.53125-3.820312 8.53125-8.53125 0-4.714844-3.820312-8.535156-8.53125-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m384 110.933594h-17.066406c-4.714844 0-8.535156 3.820312-8.535156 8.535156 0 4.710938 3.820312 8.53125 8.535156 8.53125h17.066406c4.710938 0 8.535156-3.820312 8.535156-8.53125 0-4.714844-3.824218-8.535156-8.535156-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m435.199219 110.933594h-17.066407c-4.710937 0-8.53125 3.820312-8.53125 8.535156 0 4.710938 3.820313 8.53125 8.53125 8.53125h17.066407c4.714843 0 8.535156-3.820312 8.535156-8.53125 0-4.714844-3.820313-8.535156-8.535156-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m469.332031 128h17.066407c4.714843 0 8.535156-3.820312 8.535156-8.53125 0-4.714844-3.820313-8.535156-8.535156-8.535156h-17.066407c-4.710937 0-8.53125 3.820312-8.53125 8.535156 0 4.710938 3.820313 8.53125 8.53125 8.53125zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path></svg>
    anti_copy`,
  content: { type: 'anti_copy-settings-block' },
  category: 'Разное', // Добавляем категорию "Разное"
});






















editor.Components.addType('clarity-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="set_clarity"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        window.clarity_id = props.clarity_id;

        const initBlock = () => {
          console.log('clarity initialized');
          // Здесь можно добавить логику инициализации блока
        };

        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };

        // Загружаем необходимые скрипты динамически
        if (typeof clarity === 'undefined') {
          loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/clarity.js', () => {
            console.log('clarity loaded!');
            initBlock();
          });
        } else {
          initBlock();
        }
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': ['clarity_id'],
      // Настройки для изменения URL отправки
      traits: [
        {
          type: 'text',
          name: 'clarity_id',
          label: 'Clarity ID',
          changeProp: true
        }
      ]
    }
  }
});

editor.Blocks.add('clarity-settings-block-block', {
  label: `
    <!-- icon666.com - MILLIONS vector ICONS FREE --><svg viewBox="0 0 512.00028 512" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path d="m502.613281 317.441406c-5.761719-2.917968-12.675781-2.3125-17.84375 1.558594l-23.96875 17.84375v-63.84375c-.039062-14.085938-11.449219-25.496094-25.53125-25.53125h-5.8125l-58.605469-42.847656c-14.554687-11.132813-34.753906-11.179688-49.359374-.109375l-59.730469 42.957031h-5.855469c-14.074219.050781-25.46875 11.453125-25.507812 25.53125v63.75l-23.96875-17.773438c-5.179688-3.839843-12.078126-4.433593-17.835938-1.535156-5.757812 2.898438-9.390625 8.792969-9.394531 15.238282v109.347656l-43.519531-38.042969 5.386718-5.382813c3.230469-3.347656 3.1875-8.671874-.105468-11.964843-3.292969-3.289063-8.613282-3.335938-11.960938-.101563l-6 6-23.039062-23.042968c-20.359376-20.257813-31.769532-47.816407-31.695313-76.535157v-79.625c0-18.851562-15.28125-34.132812-34.132813-34.132812-18.851562 0-34.132812 15.28125-34.132812 34.132812v42.667969c0 4.714844 3.820312 8.535156 8.535156 8.535156 4.710938 0 8.53125-3.820312 8.53125-8.535156v-42.667969c0-9.425781 7.640625-17.066406 17.066406-17.066406 9.425782 0 17.066407 7.640625 17.066407 17.066406v79.625c-.089844 33.253907 13.121093 65.164063 36.695312 88.621094l23.039063 23.039063-6.035156 6.03125c-2.214844 2.144531-3.105469 5.316406-2.324219 8.300781s3.109375 5.3125 6.09375 6.09375 6.15625-.109375 8.296875-2.328125l6.246094-6.238282c.679687.503907 1.429687.902344 2.230468 1.179688l53.757813 47.019531v30.257813c0 9.425781 7.640625 17.066406 17.066406 17.066406h298.667969c9.425781 0 17.066406-7.640625 17.066406-17.066406v-162.21875c.035156-6.464844-3.601562-12.386719-9.386719-15.273438zm-171-99.191406c8.59375-6.546875 20.507813-6.515625 29.066407.074219l39.859374 29.144531h-109.550781zm-84.148437 54.75c.007812-4.675781 3.792968-8.460938 8.46875-8.464844h179.335937c4.671875.003906 8.460938 3.789063 8.464844 8.464844v75.773438c0 .238281.117187.4375.136719.667968l-83.628906 62.207032c-8.558594 6.414062-20.324219 6.414062-28.882813 0l-83.894531-62.242188zm247.46875 221.933594h-298.667969v-18.773438c5.445313 2.097656 11.230469 3.175782 17.066406 3.175782 11.777344.152343 23.144531-4.339844 31.632813-12.503907 12.179687-13.105469 15.804687-32.019531 9.328125-48.699219h1.707031c4.710938 0 8.535156-3.820312 8.535156-8.53125 0-4.714843-3.824218-8.535156-8.535156-8.535156h-34.132812c-4.714844 0-8.535157 3.820313-8.535157 8.535156 0 4.710938 3.820313 8.53125 8.535157 8.53125h13.011718c8.03125 11.160157 7.207032 26.40625-1.980468 36.632813-5.285157 4.972656-12.3125 7.667969-19.566407 7.503906-6.132812.054688-12.121093-1.878906-17.066406-5.503906v-124.078125l124.964844 92.664062c14.589843 10.921876 34.632812 10.921876 49.226562 0l124.476563-92.636718zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m281.601562 307.199219h128c4.710938 0 8.53125-3.820313 8.53125-8.53125 0-4.714844-3.820312-8.535157-8.53125-8.535157h-128c-4.714843 0-8.535156 3.820313-8.535156 8.535157 0 4.710937 3.820313 8.53125 8.535156 8.53125zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m418.132812 332.800781c0-4.714843-3.820312-8.535156-8.53125-8.535156h-128c-4.714843 0-8.535156 3.820313-8.535156 8.535156 0 4.710938 3.820313 8.53125 8.535156 8.53125h128c4.710938 0 8.53125-3.820312 8.53125-8.53125zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m27.578125 150.535156c3.019531 3.621094 8.398437 4.109375 12.015625 1.09375l20.140625-16.800781 20.136719 16.785156c2.34375 1.949219 5.550781 2.5 8.414062 1.445313 2.863282-1.054688 4.945313-3.554688 5.460938-6.558594.519531-3.007812-.605469-6.0625-2.953125-8.011719l-17.730469-14.753906 17.730469-14.773437c2.347656-1.949219 3.472656-5.003907 2.953125-8.007813-.515625-3.007813-2.597656-5.507813-5.460938-6.5625-2.863281-1.054687-6.070312-.503906-8.414062 1.449219l-11.605469 9.675781v-96.980469c0-4.714844-3.820313-8.535156-8.53125-8.535156-4.714844 0-8.535156 3.820312-8.535156 8.535156v96.980469l-11.605469-9.675781c-3.625-3.019532-9.007812-2.523438-12.023438 1.097656-3.015624 3.625-2.523437 9.007812 1.101563 12.023438l17.730469 14.773437-17.730469 14.769531c-1.742187 1.449219-2.835937 3.53125-3.042969 5.789063-.203125 2.257812.496094 4.503906 1.949219 6.242187zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m256 25.601562c-18.851562 0-34.132812 15.28125-34.132812 34.132813.03125 8.167969 3.019531 16.050781 8.414062 22.1875l-16.949219 16.945313-26.023437-26.035157c-24.730469-24.859375-58.378906-38.792969-93.441406-38.699219-1.019532.019532-2.03125.222657-2.980469.597657-.289063.113281-.574219.242187-.851563.382812-.640625.324219-1.238281.730469-1.773437 1.203125-.230469.183594-.453125.378906-.660157.589844-.625.664062-1.136718 1.425781-1.515624 2.253906 0 .078125-.09375.136719-.128907.210938-.367187.945312-.566406 1.945312-.589843 2.953125 0 .113281-.058594.207031-.058594.316406 0 .113281.09375.34375.101562.53125.050782.765625.207032 1.523437.460938 2.25.078125.273437.171875.542969.28125.804687.402344.894532.953125 1.710938 1.628906 2.421876l70.820312 70.820312-70.769531 70.765625c-2.4375 2.441406-3.167969 6.109375-1.847656 9.296875s4.429687 5.269531 7.882813 5.269531c35.0625.09375 68.710937-13.839843 93.441406-38.699219l26.023437-26.035156 16.949219 16.945313c-5.394531 6.136719-8.382812 14.019531-8.414062 22.1875-.207032 15.15625 9.46875 28.683593 23.875 33.382812 14.410156 4.699219 30.199218-.523437 38.964843-12.886719 8.769531-12.363281 8.46875-28.992187-.730469-41.035156-9.203124-12.042968-25.171874-16.695312-39.402343-11.484375l-22.707031-22.707031v-10.003906l22.707031-22.707032c12.789062 4.574219 27.074219 1.113282 36.351562-8.808593 9.28125-9.917969 11.78125-24.402344 6.367188-36.859375-5.414063-12.457032-17.710938-20.507813-31.292969-20.488282zm-139.273438 159.871094 53.941407-53.941406 13.53125 13.535156-8.957031 8.96875c-15.964844 16.039063-36.328126 26.980469-58.515626 31.4375zm79.539063-52.472656-79.53125-79.53125c3.246094.648438 6.445313 1.476562 9.601563 2.398438.964843.28125 1.921874.613281 2.882812.921874 2.339844.75 4.644531 1.570313 6.929688 2.476563.957031.375 1.914062.742187 2.859374 1.152344 2.945313 1.253906 5.835938 2.558593 8.671876 4.09375.132812.078125.28125.136719.417968.207031 2.949219 1.585938 5.816406 3.335938 8.632813 5.1875.855469.535156 1.632812 1.117188 2.449219 1.707031 2.066406 1.433594 4.089843 2.933594 6.078124 4.503907.785157.632812 1.578126 1.246093 2.355469 1.894531 2.617188 2.191406 5.179688 4.472656 7.628907 6.914062l23.523437 23.53125 6.035156 6.035157v10zm76.800781 46.199219c0 9.425781-7.640625 17.066406-17.066406 17.066406s-17.066406-7.640625-17.066406-17.066406 7.640625-17.066407 17.066406-17.066407 17.066406 7.640626 17.066406 17.066407zm-17.066406-102.398438c-9.425781 0-17.066406-7.640625-17.066406-17.066406s7.640625-17.066406 17.066406-17.066406 17.066406 7.640625 17.066406 17.066406c0 4.527344-1.796875 8.867187-5 12.066406-3.199218 3.203125-7.539062 5-12.066406 5zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m264.535156 110.933594c-4.714844 0-8.535156 3.820312-8.535156 8.535156 0 4.710938 3.820312 8.53125 8.535156 8.53125h17.066406c4.710938 0 8.53125-3.820312 8.53125-8.53125 0-4.714844-3.820312-8.535156-8.53125-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m315.734375 110.933594c-4.714844 0-8.535156 3.820312-8.535156 8.535156 0 4.710938 3.820312 8.53125 8.535156 8.53125h17.066406c4.710938 0 8.53125-3.820312 8.53125-8.53125 0-4.714844-3.820312-8.535156-8.53125-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m384 110.933594h-17.066406c-4.714844 0-8.535156 3.820312-8.535156 8.535156 0 4.710938 3.820312 8.53125 8.535156 8.53125h17.066406c4.710938 0 8.535156-3.820312 8.535156-8.53125 0-4.714844-3.824218-8.535156-8.535156-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m435.199219 110.933594h-17.066407c-4.710937 0-8.53125 3.820312-8.53125 8.535156 0 4.710938 3.820313 8.53125 8.53125 8.53125h17.066407c4.714843 0 8.535156-3.820312 8.535156-8.53125 0-4.714844-3.820313-8.535156-8.535156-8.535156zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path><path d="m469.332031 128h17.066407c4.714843 0 8.535156-3.820312 8.535156-8.53125 0-4.714844-3.820313-8.535156-8.535156-8.535156h-17.066407c-4.710937 0-8.53125 3.820312-8.53125 8.535156 0 4.710938 3.820313 8.53125 8.53125 8.53125zm0 0" fill="#000000" style="fill: rgb(245, 245, 245);"></path></svg>
    clarity`,
  content: { type: 'clarity-settings-block' },
  category: 'Аналитика', // Добавляем категорию "Разное"
});















// Создаем блок настроек видеоплеера
editor.Blocks.add('video-player-settings-block', {
  label: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 490 490" viewBox="0 0 490 490" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><g><g><g><path d="m380 70h-270c-60.654 0-110 49.346-110 110v130c0 60.654 49.346 110 110 110h270c60.654 0 110-49.346 110-110v-130c0-60.654-49.346-110-110-110zm90 240c0 49.626-40.374 90-90 90h-270c-49.626 0-90-40.374-90-90v-130c0-49.626 40.374-90 90-90h270c49.626 0 90 40.374 90 90z" fill="#000000" style="fill: rgb(237, 237, 237);"></path><path d="m323.846 235.769-120-50c-3.085-1.286-6.611-.945-9.393.911-2.782 1.854-4.453 4.977-4.453 8.32v100c0 3.344 1.671 6.466 4.453 8.32 1.667 1.112 3.601 1.68 5.548 1.68 1.301 0 2.608-.254 3.845-.769l120-50c3.727-1.553 6.154-5.194 6.154-9.231s-2.428-7.678-6.154-9.231zm-113.846 44.231v-70l84 35z" fill="#000000" style="fill: rgb(237, 237, 237);"></path></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      <span style="margin-top: 8px;">player-set</span>
    </div>`,
  content: {
    type: 'video-player-settings',
    resizable: {
      // Устанавливаем ресайз по всем направлениям
      tl: 1, // Top left
      tc: 1, // Top center
      tr: 1, // Top right
      cl: 1, // Center left
      cr: 1, // Center right
      bl: 1, // Bottom left
      bc: 1, // Bottom center
      br: 1  // Bottom right
    },
    attributes: {
      id: 'player'
    },
    style: {
      width: '480px',
      height: '270px',
      margin: '0 auto',
      position: 'relative',
      top: '0',
      display: 'block'
    }
  }
});











// Создаем новый тип компонента для настроек видеоплеера
editor.Components.addType('video-player-settings', {
  model: {
    defaults: {
      // HTML-код блока настроек видеоплеера
      content: '<div id="player" class="players"></div>',
      // Скрипт для обработки блока (если нужно)
      script: function(props) {
        window.vid_list = props.vid_list;
        console.log('Video player settings initialized with vid_list:', vid_list);
        // Подключение указанных скриптов
        const loadScriptToHead = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.head.appendChild(script);
        };
        const loadScriptToBody = (src, callback) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = callback;
          document.body.appendChild(script);
        };
        const library = props.library;
        let playerjsSrc;
        if (library === '1') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p1/playerjs.js';
        } else if (library === '2') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p2/playerjs.js';
        } else if (library === '3') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p3/playerjs.js';
        } else if (library === '4') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p4/playerjs.js';
        } else if (library === '5') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p5/playerjs.js';
        } else if (library === '6') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p6/playerjs.js';
        } else if (library === '7') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p7/playerjs.js';
        } else if (library === '8') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p8/playerjs.js';
        } else if (library === '9') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p9/playerjs.js';
        } else if (library === '10') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p10/playerjs.js';
        } else if (library === '11') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p11/playerjs.js';
        } else if (library === '12') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p12/playerjs.js';
        } else if (library === '13') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p13/playerjs.js';
        } else if (library === '14') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p14/playerjs.js';
        } else if (library === '15') {
          playerjsSrc = 'https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/p15/playerjs.js';
        }
        if (playerjsSrc) {
          loadScriptToHead(playerjsSrc, () => {
            console.log('PlayerJS script loaded!');
            loadScriptToBody('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/playerst.js', () => {
              console.log('PlayerST script loaded!');
            });
          });
        }
      },
      // Свойства, которые будут передаваться в скрипт
      'script-props': ['vid_list', 'library'],
      // Настройки для ввода JSON-строки с данными о видео
      traits: [
        {
          type: 'select',
          name: 'library',
          label: 'Library',
          options: [
            { value: '1', name: 'Плеер - 1' },
            { value: '2', name: 'Плеер - 2' },
            { value: '3', name: 'Плеер - 3' },
            { value: '4', name: 'Плеер - 4' },
            { value: '5', name: 'Плеер - 5' },
            { value: '6', name: 'Плеер - 6' },
            { value: '7', name: 'Плеер - 7' },
            { value: '8', name: 'Плеер - 8' },
            { value: '9', name: 'Плеер - 9' },
            { value: '10', name: 'Плеер - 10' },
            { value: '11', name: 'Плеер - 11' },
            { value: '12', name: 'Плеер - 12' },
            { value: '13', name: 'Плеер - 13' },
            { value: '14', name: 'Плеер - 14' },
            { value: '15', name: 'Плеер - 15' }
          ],
          changeProp: true
        },
        {
          type: 'text',
          name: 'vid_list',
          label: 'Video List',
          changeProp: true,
          placeholder: '[{"title":"Название","file":"URL"},...]',
          style: { width: '100%', height: '200px' } // Широкое поле ввода
        }
      ]
    }
  }
});





















// Создаем блок для компонента Iframe
editor.BlockManager.add('custom-iframe', {
  label: `
    <div style="display: flex; flex-direction: column; align-items: center;">
      <!-- icon666.com - MILLIONS vector ICONS FREE --><svg id="Layer_1" enable-background="new 0 0 48 48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="36" height="36"><path d="m38 8h-28c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h8v-4h-8v-20h28v20h-8v4h8c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zm-14 12-8 8h6v12h4v-12h6z" fill="#000000" style="fill: rgb(237, 237, 237);"></path></svg>
      <span style="margin-top: 8px;">Iframe</span>
    </div>`,
  content: `<iframe id="custom-iframe" frameborder="0" width="480" height="405" src="" allow="clipboard-write; autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: relative; top: 0; margin: 0 auto; display: block;"></iframe>`,
  attributes: {
    class: ''
  }
});
editor.CssComposer.addRules(`
  #custom-iframe {
    width: 720px;
    height: 480px;
    border: none;
    margin: 0 auto;
    position: relative;
    top: 0;
    display: block;
  }
`);



