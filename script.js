function createWindow(ip, imageUrl){

    const container = document.getElementById("windows-container");

    const windowDiv = document.createElement("div");
    windowDiv.className = "window"; //задаем элементу класс как в html

    const img = document.createElement("img");
    img.src = imageUrl; //задаем элементу src как в html
    img.alt = "Preview";


    const ipDiv = document.createElement("div");
    ipDiv.className = "ip-address";
    ipDiv.textContent = ip;

    windowDiv.appendChild(img);
    windowDiv.appendChild(ipDiv);
    windowDiv.addEventListener('click', () => {
        showGallery(ip);
      });
    // Drag’n’drop загрузка
    windowDiv.addEventListener("dragover", (e) => {
        e.preventDefault(); // обязательно!
        windowDiv.style.backgroundColor = "#e0e0ff";
    });

    windowDiv.addEventListener("dragleave", () => {
        e.preventDefault(); // обязательно!
        windowDiv.style.backgroundColor = "#f8f8f8";
    });

    windowDiv.addEventListener("drop", (e) => {
        e.preventDefault();
        windowDiv.style.backgroundColor = "#f8f8f8";

        const file = e.dataTransfer.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        fetch(`http://${ip}:3000/upload`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                alert(`Изображение загружено на ${ip}`);
                windowDiv.querySelector("img").src = `http://${ip}:3000/image?${Date.now()}`;
            })
            .catch((err) => {
                console.log(err);
                alert(`Ошибка при загрузке на ${ip}`);
            });
    });

    container.appendChild(windowDiv);
}

const ipList = ["192.168.1.101", "192.168.1.102", "192.168.100.45"];

// Перебираем IP-адреса
ipList.forEach((ip) => {
    // Пингуем каждый IP через fetch
    fetch(`http://${ip}:3000/image`)
        .then((response) => {
            if (response.ok) {
                createWindow(ip, `http://${ip}:3000/image`);
            }
        })
        .catch((err) => {
            console.log(`Компьютер ${ip} недоступен`);
        });
});

// Показать галерею
function showGallery(ip) {
    fetch(`http://${ip}:3000/images`)
      .then(res => res.json())
      .then(urls => {
        gallery.innerHTML = '';
        urls.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          gallery.appendChild(img);
        });
        gallery.classList.remove('hidden');
      })
      .catch(() => {
        alert('Ошибка загрузки галереи с IP: ' + ip);
      });
  }