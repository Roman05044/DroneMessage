const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = 8082;

mongoose.connect('mongodb://localhost:27017/droneMessageDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Підключено до MongoDB'))
  .catch(err => console.error('Помилка підключення до MongoDB:', err));

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePic: { type: String }
});
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Всі поля обов’язкові' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Користувача зареєстровано' });
  } catch (err) {
    if (err.code === 11000) {
      console.error('Користувач з таким ім\'ям вже існує:', err);
      res.status(409).json({ message: 'Користувач з таким ім\'ям вже існує' });
    } else {
      console.error('Помилка при реєстрації:', err);
      res.status(500).json({ message: 'Сталась помилка, спробуйте ще раз' });
    }
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Всі поля обов’язкові' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    res.status(200).json({ message: 'Вхід успішний' });
  } catch (err) {
    console.error('Помилка при вході:', err);
    res.status(500).json({ message: 'Сталась помилка, спробуйте ще раз' });
  }
});

app.post('/change-password', async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword) {
    return res.status(400).json({ message: 'Всі поля обов’язкові' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.status(200).json({ message: 'Пароль успішно змінено' });
  } catch (err) {
    console.error('Помилка при зміні паролю:', err);
    res.status(500).json({ message: 'Сталась помилка, спробуйте ще раз' });
  }
});

app.post('/update-username', async (req, res) => {
  const { username } = req.body;
  try {
    await User.findOneAndUpdate({ username }, { username }, { new: true, upsert: true });
    res.status(200).json({ message: 'Ім\'я успішно оновлено' });
  } catch (err) {
    console.error('Помилка оновлення імені:', err);
    res.status(500).json({ message: 'Помилка при оновленні' });
  }
});

app.post('/update-profile-pic', async (req, res) => {
  const { username, image } = req.body;
  try {
    await User.findOneAndUpdate({ username }, { profilePic: image }, { new: true, upsert: true });
    res.status(200).json({ message: 'Фото профілю оновлено' });
  } catch (err) {
    console.error('Помилка оновлення фото профілю:', err);
    res.status(500).json({ message: 'Помилка при оновленні фото' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
