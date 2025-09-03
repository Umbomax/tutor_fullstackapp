// 1. Функция создания окна

function createWindow(ip, imageUrl) /* (айпи и ссылка это аргументы функции)*/ {
    // 2. Находим контейнер на странице, куда будем вставлять окно
    const container = document.getElementById("windows-container");

    // 3. Создаём div — это наш основной блок окна
    const windowDiv = document.createElement("div");
    windowDiv.className = "window"; //задаем элементу класс как в html

    // 4. Создаём тег img для картинки
    const img = document.createElement("img");
    img.src = imageUrl; //задаем элементу src как в html
    img.alt = "Preview";

    // 5. Создаём подпись с IP
    const ipDiv = document.createElement("div");
    ipDiv.className = "ip-address";
    ipDiv.textContent = ip;

    // 6. Вставляем картинку и IP в окно
    windowDiv.appendChild(img);
    windowDiv.appendChild(ipDiv);

    // 7. Вставляем окно в контейнер на странице
    container.appendChild(windowDiv);
}

createWindow("192.168.1.101", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAdFnK_V9xwtlATu3ncq30qmBTVBRcVRPNA&s");
createWindow("192.168.1.102", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnkXX1msb3FcwUKdveOb4VJ_8dlsezqUlqEQ&s");
createWindow("192.168.1.103", "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg");
