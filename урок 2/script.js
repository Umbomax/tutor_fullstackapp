
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

