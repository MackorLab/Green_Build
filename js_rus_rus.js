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
        
        if (typeof VK === 'undefined') {
          loadScript('https://vk.com/js/api/openapi.js?169', () => {
            console.log('VK Open API loaded!');
          });
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
  category: 'Автопилот - ВК', // Добавляем категорию "Автопилот - ВК"
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
  category: 'Автопилот - ВК', // Добавляем категорию "Автопилот - ВК"
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
  category: 'Автопилот - ВК', // Добавляем категорию "Автопилот - ВК"
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
  category: 'Автопилот - ВК', // Добавляем категорию "Автопилот - ВК"
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
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_look_v1.js?', () => {
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
  category: 'Автопилот - ВК', // Добавляем категорию "Автопилот - ВК"
});


















// Создаем новый тип компонента для настройки 
editor.Components.addType('avp-look_vk-settings-block', {
  model: {
    defaults: {
      // HTML-код пустого блока с постоянным идентификатором
      content: '<div id="set_avp-look_vk"></div>',
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
        
        loadScript('https://huggingface.co/spaces/DMTuit/psy_vk/resolve/main/js/avp_look_v1.js?', () => {
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
editor.Blocks.add('avp-look_vk-settings-block-block', {
  label: `
   <!-- icon666.com - MILLIONS vector ICONS FREE --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="36" height="36"><g><g><path d="M437.333,192h-32v-42.667C405.333,66.99,338.344,0,256,0S106.667,66.99,106.667,149.333V160 c0,5.896,4.771,10.667,10.667,10.667H160c5.896,0,10.667-4.771,10.667-10.667v-10.667C170.667,102.281,208.948,64,256,64 s85.333,38.281,85.333,85.333V192H74.667C68.771,192,64,196.771,64,202.667v266.667C64,492.865,83.135,512,106.667,512h298.667 C428.865,512,448,492.865,448,469.333V202.667C448,196.771,443.229,192,437.333,192z M287.938,414.823 c0.333,3.01-0.635,6.031-2.656,8.292c-2.021,2.26-4.917,3.552-7.948,3.552h-42.667c-3.031,0-5.927-1.292-7.948-3.552 c-2.021-2.26-2.99-5.281-2.656-8.292l6.729-60.51c-10.927-7.948-17.458-20.521-17.458-34.313 c0-23.531,19.135-42.667,42.667-42.667s42.667,19.135,42.667,42.667c0,13.792-6.531,26.365-17.458,34.313L287.938,414.823z" fill="#000000" style="fill: rgb(250, 250, 250);"></path></g></g></svg>
   avp_lock_vk`,
  content: { type: 'avp-look_vk-settings-block' },
  category: 'Автопилот - ВК', // Добавляем категорию "Автопилот - ВК"
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
      content: '<div id="player"></div>',
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
  content: `<iframe id="custom-iframe" frameborder="0" width="480" height="405" src="https://rutube.ru/play/embed/538dc9cc0b952dd52f47e28df7df5e81/" allow="clipboard-write; autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: relative; top: 0; margin: 0 auto; display: block;"></iframe>`,
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









