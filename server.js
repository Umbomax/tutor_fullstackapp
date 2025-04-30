// Загружаем библиотеки
const express = require('express');   // Сам сервер
const multer = require('multer');     // Для загрузки файлов
const cors = require('cors');         // Чтобы разрешить запросы с других адресов
const path = require('path');         // Работа с путями

const app = express(); // Создаём приложение express
const PORT = 3000;     // На каком порту будет работать сервер
const fs = require('fs');
// Включаем CORS (разрешаем фронту обращаться к серверу)
app.use(cors());

// Папка, куда будут сохраняться картинки
const uploadDir = path.join(__dirname, 'uploads');

// Настройки multer: куда и как сохранять изображения

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // путь к папке
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // уникальное имя
  }
});
const upload = multer({ storage: storage });

// ----------- 📤 API: загрузка изображения -----------

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не был загружен' });
  }
  res.json({ message: 'Файл загружен успешно', filename: req.file.filename });
});

// ----------- 📥 API: получить одно изображение -----------

app.get('/image', (req, res) => {
  
  const files = fs.readdirSync(uploadDir);
  if (files.length === 0) {
    return res.status(404).send('Нет изображений');
  }

  const firstImage = files[0];
  const imagePath = path.join(uploadDir, firstImage);
  res.sendFile(imagePath);
});
app.get('/images', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка чтения папки' });
      }
  
      const imageUrls = files.map(filename => `http://${req.hostname}:3000/image/${filename}`);
      res.json(imageUrls);
    });
  });
  app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Файл не найден');
    }
    res.sendFile(filePath);
  });
// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
