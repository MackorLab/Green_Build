// Получаем глобальные переменные
const w_url = window.w_url.replace(/\/+$/, '') + '/add_user_senler';
const lo_mess_url = window.w_url.replace(/\/+$/, '') + '/get_Lo_Mess_senler';
const stop_mess_url = window.w_url.replace(/\/+$/, '') + '/del_user_senler';

const vk_grup = Number(window.vk_grup);
const w_vk_grup = window.vk_grup;
const s_grup = window.s_grup;
const redirect_on = window.red_on;
const on_url = window.on_url;

// Переменные для хранения ссылок на изображения
const bgImageUrl = "https://atuin.ru/demo/i/xmas/bg.jpg";
const frontBgImageUrl = "https://atuin.ru/demo/i/xmas/front-bg.png";
const patternImageUrl = "https://atuin.ru/demo/i/xmas/pattern.png";
const textImageUrl = "https://atuin.ru/demo/i/xmas/text.png";


const clarity_on = window.clarity_on; 
const clarity_id = window.clarity_id;
const clarity_ses = window.clarity_ses;
const clarity_tar = window.clarity_tar;
const funnel = window.funnel;
const clarity_ev = window.clarity_ev;

const ups = window.ups;

// Переменные для UTM-меток
let gcpc;
let utm_source;
let utm_medium;
let utm_campaign;
let utm_content;
let utm_term;

let hashs;



var bdate_visibility; // Видимость даты рождения: 0 - скрыта, 1 - открыта целиком, 2 - открыты только день и месяц
var can_access_closed; // Может ли пользователь видеть закрытый профиль: true - да, false - нет
var city; // Информация о городе пользователя
var country; // Информация о стране пользователя
var uid; // Идентификатор пользователя
var is_closed; // Закрыт ли профиль пользователя: true - да, false - нет
var last_name; // Фамилия пользователя
var photo_100; // URL квадратной фотографии пользователя с шириной 100 пикселей
var photo_200; // URL квадратной фотографии пользователя с шириной 200 пикселей
var photo_base; // URL фотографии пользователя
var photo_max_orig; // URL фотографии максимального размера
var sex; // Пол пользователя: 1 - женский, 2 - мужской, 0 - не указан
var timezone; // Часовой пояс пользователя
var first_name; // Имя пользователя
// Получаем текущий URL
const url = new URL(window.location.href);
// Извлекаем значение параметра vk_user_id
const vk_user_id = url.searchParams.get('vk_user_id');
const apps_id = url.searchParams.get('vk_app_id');

// Получаем текущую строку запроса (все параметры после ?)
const fullUrl = window.location.href;

// Получаем текущий хеш из URL
hashs = window.location.hash.substring(1); // Убираем символ # в начале

// Парсим хэш как параметры запроса
const hashParams = new URLSearchParams(hashs);

// Извлекаем значение параметра utm_term из хэша
gcpc = hashParams.get('gcpc') || '';
utm_source = hashParams.get('utm_source') || '';
utm_medium = hashParams.get('utm_medium') || '';
utm_campaign = hashParams.get('utm_campaign') || '';
utm_content = hashParams.get('utm_content') || '';
utm_term = hashParams.get('utm_term') || '';

const vk_user_string = vk_user_id.toString(); // Конвертируем в строку

const vk_app_id = url.searchParams.get('vk_app_id');


let startfun_on = window.startfun_on;
let startFuncName = window.startfun_name;
    

vkBridge.send('VKWebAppInit');

        vkBridge.send('VKWebAppGetUserInfo')
        .then(data => {
            
            bdate_visibility = data.bdate_visibility;
            console.log('Видимость даты рождения:', bdate_visibility);
            
            can_access_closed = data.can_access_closed;
            console.log('Может ли пользователь видеть закрытый профиль:', can_access_closed);
            
            city = data.city;
            console.log('Информация о городе пользователя:', city);
            
            country = data.country;
            console.log('Информация о стране пользователя:', country);
            
            uid = data.id;
            console.log('Идентификатор пользователя:', uid);
            
            is_closed = data.is_closed;
            console.log('Закрыт ли профиль пользователя:', is_closed);
            
            last_name = data.last_name;
            console.log('Фамилия пользователя:', last_name);
            
            photo_100 = data.photo_100;
            console.log('URL квадратной фотографии пользователя с шириной 100 пикселей:', photo_100);
            
            photo_200 = data.photo_200;
            console.log('URL квадратной фотографии пользователя с шириной 200 пикселей:', photo_200);
            
            photo_base = data.photo_base;
            console.log('URL фотографии пользователя:', photo_base);
            
            photo_max_orig = data.photo_max_orig;
            console.log('URL фотографии максимального размера:', photo_max_orig);
            
            sex = data.sex;
            console.log('Пол пользователя:', sex);
            
            timezone = data.timezone;
            console.log('Часовой пояс пользователя:', timezone);
            
            first_name = data.first_name;
            console.log('Имя пользователя:', first_name);



           if (startfun_on) {
           // Пример использования
           startFunctionByName(startFuncName);
        }
       

        })
        .catch(error => {
            console.error('Ошибка при получении информации о пользователе:', error);
            not_loyalty();
        });

document.getElementById('formButton').addEventListener('click', function(event) {
    event.preventDefault(); 

    vkBridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": vk_grup, "key": "cc964fabb0e1d70924a92e4e8b513dbff7cc10a9"})
    .then(data => {
        if (data.result) {
                            
            document.getElementById('loaderBlock').style.display = 'flex';
             setTimeout(sendFormData, 1000); 

        } else {
            not_loyalty();
        }
    })
    .catch(error => {
        not_loyalty();
    });
});

function not_loyalty() {
    // Показываем отказ от лоялности
   document.getElementById('loyaltyBlock').style.display = 'block';
   document.getElementById('formBlock').style.display = 'none';
   if (clarity_on) {
       loyaltyYNot();
   }
}

function sendFormData() {
    
    const formData = new URLSearchParams();
    formData.append('vk_user_id', uid);
    formData.append('vk_group_id', w_vk_grup);
    formData.append('sub_id', s_grup);

    formData.append('utm_source', utm_source);
    formData.append('utm_medium', utm_medium);
    formData.append('utm_campaign', utm_campaign);
    formData.append('utm_content', utm_content);
    formData.append('utm_term', utm_term);
    fetch(w_url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) { 
            throw new Error('Ошибка HTTP: ' + response.status); 
        }
        return response.json(); 
    })
    .then(data => {
        // Проверка успешности добавления пользователя
        if (data && data.success) {
            document.getElementById('formBlock').style.display = 'none';
            document.getElementById('loyaltyBlock').style.display = 'none'; 
            document.getElementById('loaderBlock').style.display = 'none';  

            document.getElementById('thankBlock').style.display = 'block';
            document.getElementById('stopBlock').style.display = 'block';  

            if (redirect_on) {
                if (clarity_on) {
                    sendClarityEvent(clarity_ev);
                    loyaltyYes();
                }
               
                // Добавляем GET-параметр к URL
                let redirectUrl = new URL(on_url);
                redirectUrl.searchParams.append('ups', ups);           
                redirectUrl.searchParams.append('uid', uid);
                redirectUrl.searchParams.append('gcpc', gcpc);            
    
                redirectUrl.searchParams.append('utm_source', utm_source);
                redirectUrl.searchParams.append('utm_medium', utm_medium);
                redirectUrl.searchParams.append('utm_campaign', utm_campaign);
                redirectUrl.searchParams.append('utm_content', utm_content);
                redirectUrl.searchParams.append('utm_term', utm_term);
                
                window.open(redirectUrl.toString(), '_blank'); // Открываем новую вкладку с добавленным параметром
            } else {
                if (clarity_on) {
                    sendClarityEvent(clarity_ev);
                    loyaltyYes();
                    document.getElementById('loaderBlock').style.display = 'none';
                }
               
            }

        } else {
            not_loyalty();
            document.getElementById('loaderBlock').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error:', error); 
        not_loyalty();
    });
}

function initializeClarity() {
    (function(c, l, a, r, i, t, y) {
        c[a] = c[a] || function() {
            (c[a].q = c[a].q || []).push(arguments);
        };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarity_id);
}

function identifyUser(vk_user_string, clarity_ses, clarity_tar) {
    if (window.clarity) {
        window.clarity("identify", vk_user_string, clarity_ses, clarity_tar);
    } else {
        console.log('Clarity is not initialized');
    }
}

function sendClarityEvent(clarity_ev) {
    if (window.clarity) {
        window.clarity("event", clarity_ev);
    } else {
        console.log('Clarity is not initialized');
    }
}

function sendUserTags(utm_source, utm_medium, utm_campaign, utm_content, utm_term, funnel) {
    if (window.clarity) {
        // Передаем каждый тег отдельно
        window.clarity("set", "utm_source", utm_source);
        window.clarity("set", "utm_medium", utm_medium);
        window.clarity("set", "utm_campaign", utm_campaign);
        window.clarity("set", "utm_content", utm_content);
        window.clarity("set", "utm_term", utm_term);
        window.clarity("set", "funnel", funnel);
    } else {
        console.log('Clarity is not initialized');
    }
}

function loyaltyYes() {
    if (window.clarity) {
        // Передаем каждый тег отдельно
        window.clarity("set", "loyalty", "yes");
    } else {
        console.log('Clarity is not initialized');
    }
}

function loyaltyYNot() {
    if (window.clarity) {
        // Передаем каждый тег отдельно
        window.clarity("set", "loyalty", "not");
    } else {
        console.log('Clarity is not initialized');
    }
}

if (clarity_on) {
    initializeClarity();
    identifyUser(vk_user_string, clarity_ses, clarity_tar); 
    sendUserTags(utm_source, utm_medium, utm_campaign, utm_content, utm_term, funnel);
}

// Добавляем обработчик события после загрузки DOM
$(document).ready(function() {
    // Выбираем элемент с идентификатором linkThank
    $('#linkThank').on('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное действие ссылки

        if (redirect_on) {
            // Создаем новый URL с добавленными параметрами
            let redirectUrl = new URL($(this).attr('href'));
            redirectUrl.searchParams.append('ups', ups);           
            redirectUrl.searchParams.append('uid', uid);
            redirectUrl.searchParams.append('gcpc', gcpc);            

            redirectUrl.searchParams.append('utm_source', utm_source);
            redirectUrl.searchParams.append('utm_medium', utm_medium);
            redirectUrl.searchParams.append('utm_campaign', utm_campaign);
            redirectUrl.searchParams.append('utm_content', utm_content);
            redirectUrl.searchParams.append('utm_term', utm_term);
            
            // Открываем новую вкладку с добавленными параметрами
            window.open(redirectUrl.toString(), '_blank');
        } else {
            // Открываем ссылку без добавления параметров
            window.open($(this).attr('href'), '_blank');
        }
    });
    sendLoMess(); 
    // Добавляем обработчик события для кнопки отписки
    $('#linkStopBlock').on('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное действие ссылки
        sendStopMess(); // Вызываем функцию отписки
    });
});

function sendLoMess() {
    const formData = new URLSearchParams();
    formData.append('vk_user_id', vk_user_id);
    formData.append('vk_group_id', w_vk_grup);
    formData.append('sub_id', s_grup);
    document.getElementById('loaderBlock').style.display = 'flex';

    fetch(lo_mess_url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) { 
            throw new Error('Ошибка HTTP: ' + response.status); 
        }
        return response.json(); 
    })
    .then(data => {
        // Проверка разрешил ли пользователь рассылку от сообщества
        if (data && data.status === '1') {
            document.getElementById('formBlock').style.display = 'none';
            // Включаем блок, если пользователь разрешил рассылку
            document.getElementById('thankBlock').style.display = 'block';
            document.getElementById('stopBlock').style.display = 'block';
            document.getElementById('loaderBlock').style.display = 'none';
            console.log('Есть подписка');
        } else {
            // Игнорируем отрицательные ответы или ошибки
            
            document.getElementById('formBlock').style.display = 'block';
            document.getElementById('loaderBlock').style.display = 'none';
            console.log('Нет подписки');
        }
    })
    .catch(error => {
        console.error('Error:', error); 
        
    });
}


function sendStopMess() {
    const formData = new URLSearchParams();
    formData.append('vk_user_id', vk_user_id);
    formData.append('vk_group_id', w_vk_grup);
    formData.append('sub_id', s_grup);
    document.getElementById('loaderBlock').style.display = 'flex';

    fetch(stop_mess_url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) { 
            throw new Error('Ошибка HTTP: ' + response.status); 
        }
        return response.json(); 
    })
    .then(data => {
        // Выводим ответ от сервера в консоль браузера
        console.log('Ответ от сервера:', data);

        // Проверка успешности операции
        if (data && data.status === 'success') {
            document.getElementById('formBlock').style.display = 'block';
            // Прячем кнопку, если пользователь отписался от рассылки
            document.getElementById('stopBlock').style.display = 'none';
            document.getElementById('thankBlock').style.display = 'none';
            document.getElementById('loaderBlock').style.display = 'none';
            console.log('Подписка отменена');
        } else {
            // Игнорируем отрицательные ответы или ошибки
            console.log('Ошибка или подписка не отменена');
            document.getElementById('loaderBlock').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error:', error); 
    });
}


if (clarity_on) {
    // Отслеживание копирования текста
    document.addEventListener('copy', function(event) {
      console.log('Текст скопирован:', window.getSelection().toString());
      if (window.clarity) {
        window.clarity("set", "text_copy", "yes");
      }
    });
  
    // Отслеживание открытия контекстного меню на изображении
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('contextmenu', function(event) {
        console.log('Контекстное меню открыто на изображении:', event.target.src);
        event.preventDefault(); // Отменить стандартное поведение контекстного меню
        if (window.clarity) {
          window.clarity("set", "img_save", "yes");
        }
      });
    });
  }






// Функция высшего порядка, которая принимает имя функции и вызывает её
function startFunctionByName(startFuncName) {
    if (typeof window[startFuncName] === 'function') {
        window[startFuncName]();
    } else {
        console.error(`Функция ${startFuncName} не найдена`);
    }
}



