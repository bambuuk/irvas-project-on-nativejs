const images = () => {
    const imgPopup = document.createElement('div'), // модалка
    workSection = document.querySelector('.works'), // переменная, которая отвечает за все картинки
    bigImage = document.createElement('img'); // картинка, которую добавляем

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    bigImage.style.overflow = 'hidden';
    bigImage.style.width = '400px';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault(); // отменяем стандартное поведение ссылки

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow = 'hidden';
        }

        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none'; /** Если пользователь кликнул на подложку модалки,
            то скрываем картинку */
            document.body.style.overflow = '';
        }
    });
};

export default images;