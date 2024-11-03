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

app.post('/update-username', async (req, res) => {
  const { username } = req.body;
  try {
    // Збереження нового імені
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
