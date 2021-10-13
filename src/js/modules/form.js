import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');


 /** Вызываем функцию, которая все символы в инпутах, кроме цифр */
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка....',
        success: 'Спасибо! Скоро с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    /** Функция, которая отвечает за отправку запроса */
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    /** Функция очистки инпутов */
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); /** этот объект находит 
            все инпуты, собирает данные в специальную структуру и 
            передаёт в переменную */

            /** Здесь добавляем в formdata информацию из формы калькулятора,
             * если юзер отправил именно её
             */
            if (item.getAttribute('data-calc') == 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            /** отправляем запрос на сервер */
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 7000);
                });            
        });
    });
};

export default forms;