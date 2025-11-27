CREATE TABLE IF NOT EXISTS schedule (
  id SERIAL PRIMARY KEY,
  day_of_week VARCHAR(20) NOT NULL,
  time_start VARCHAR(10) NOT NULL,
  time_end VARCHAR(10) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  format VARCHAR(10) NOT NULL CHECK (format IN ('online', 'offline')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  parent_name VARCHAR(255) NOT NULL,
  parent_phone VARCHAR(50) NOT NULL,
  child_name VARCHAR(255) NOT NULL,
  school VARCHAR(255) NOT NULL,
  grade INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schedule (day_of_week, time_start, time_end, grade, format) VALUES
('Понедельник', '16:00', '17:30', '1-2 класс', 'online'),
('Понедельник', '18:00', '19:30', '5-7 класс', 'online'),
('Вторник', '15:00', '16:30', '1-2 класс', 'offline'),
('Вторник', '17:00', '18:30', '5-7 класс', 'offline'),
('Среда', '17:00', '18:30', '3-4 класс', 'online'),
('Среда', '18:00', '19:30', '5-7 класс', 'online'),
('Четверг', '15:00', '16:30', '1-2 класс', 'offline'),
('Четверг', '16:00', '17:30', '3-4 класс', 'offline'),
('Пятница', '16:00', '17:30', '1-2 класс', 'online'),
('Пятница', '17:00', '18:30', '3-4 класс', 'online'),
('Суббота', '16:00', '17:30', '3-4 класс', 'offline'),
('Суббота', '17:00', '18:30', '5-7 класс', 'offline'),
('Воскресенье', '10:00', '11:30', '1-2 класс', 'online'),
('Воскресенье', '11:30', '13:00', '3-4 класс', 'online');
