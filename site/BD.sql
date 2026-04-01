-- Создание базы данных (если не существует)
CREATE DATABASE IF NOT EXISTS telemed_dashboard
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE telemed_dashboard;

-- Таблица пользователей (врачи, администраторы)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role ENUM('doctor', 'admin') DEFAULT 'doctor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица пациентов
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50),
    birth_date DATE,
    diagnosis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Связь врачей и пациентов (многие ко многим)
CREATE TABLE doctor_patient (
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (doctor_id, patient_id),
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Показатели жизнедеятельности (временные ряды)
CREATE TABLE vital_signs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    timestamp DATETIME NOT NULL,
    heart_rate SMALLINT UNSIGNED,                -- ЧСС (уд/мин)
    systolic_bp SMALLINT UNSIGNED,                -- Систолическое давление
    diastolic_bp SMALLINT UNSIGNED,               -- Диастолическое давление
    spo2 TINYINT UNSIGNED,                         -- Сатурация (%)
    respiratory_rate TINYINT UNSIGNED,             -- Частота дыхания (вдохов/мин)
    temperature DECIMAL(3,1),                      -- Температура (°C)
    INDEX idx_patient_time (patient_id, timestamp),
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Типы оповещений (справочник)
CREATE TABLE alert_types (
    id TINYINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,              -- например 'tachycardia'
    name VARCHAR(100) NOT NULL,                     -- 'Тахикардия'
    description TEXT,
    default_threshold_value VARCHAR(50)             -- например '>110' (не строго, для информации)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Оповещения (события)
CREATE TABLE alerts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    alert_type_id TINYINT NOT NULL,
    value VARCHAR(50) NOT NULL,                     -- зафиксированное значение (например "112 уд/мин")
    threshold VARCHAR(50),                           -- порог, который был превышен
    status ENUM('active', 'acknowledged', 'resolved') DEFAULT 'active',
    created_at DATETIME NOT NULL,
    acknowledged_at DATETIME NULL,
    resolved_at DATETIME NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_type_id) REFERENCES alert_types(id),
    INDEX idx_patient_status (patient_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Комментарии к оповещениям (врачебные заметки)
CREATE TABLE alert_comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    alert_id BIGINT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alert_id) REFERENCES alerts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Настройки порогов для конкретного пациента (индивидуальные)
CREATE TABLE patient_thresholds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    alert_type_id TINYINT NOT NULL,
    min_value VARCHAR(50),                           -- например "60" для ЧСС (нижний порог)
    max_value VARCHAR(50),                           -- например "100" для ЧСС (верхний порог)
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_type_id) REFERENCES alert_types(id),
    UNIQUE KEY unique_patient_alert (patient_id, alert_type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица для истории событий/комментариев (общая, если нужна помимо оповещений)
CREATE TABLE event_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    user_id INT NULL,                                 -- кто создал запись (может быть NULL для системных)
    event_type VARCHAR(50),                           -- например 'medication', 'note'
    description TEXT,
    event_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Заполнение тестовыми данными
-- =====================================================

-- Пользователи (пароль в хеше: для демо используем простой хеш 'password' (MD5 или любой)
-- В реальном проекте использовать password_hash()!
INSERT INTO users (username, password_hash, full_name, email, role) VALUES
('ivanov', MD5('doctor123'), 'Иванов Петр Сергеевич', 'ivanov@clinic.ru', 'doctor'),
('petrova', MD5('doctor123'), 'Петрова Анна Ивановна', 'petrova@clinic.ru', 'doctor'),
('admin', MD5('admin123'), 'Администратор Системы', 'admin@clinic.ru', 'admin');

-- Пациенты
INSERT INTO patients (first_name, last_name, patronymic, birth_date, diagnosis) VALUES
('Алексей', 'Петров', 'Константинович', '1958-05-12', 'ИБС, гипертензия'),
('Елена', 'Сидорова', 'Васильевна', '1965-08-23', 'аритмия'),
('Григорий', 'Николаев', 'Дмитриевич', '1952-11-03', 'ХСН');

-- Связь врачей с пациентами (пусть доктор Иванов ведет всех)
INSERT INTO doctor_patient (doctor_id, patient_id) VALUES
(1, 1), (1, 2), (1, 3);

-- Типы оповещений
INSERT INTO alert_types (code, name, description, default_threshold_value) VALUES
('tachycardia', 'Тахикардия', 'ЧСС превышает верхний порог', '>110 уд/мин'),
('bradycardia', 'Брадикардия', 'ЧСС ниже нижнего порога', '<60 уд/мин'),
('hypertension', 'Гипертензия', 'Систолическое давление выше порога', '>140 мм рт.ст.'),
('hypotension', 'Гипотензия', 'Систолическое давление ниже порога', '<90 мм рт.ст.'),
('hypoxemia', 'Гипоксемия', 'Низкое насыщение крови кислородом', '<92%'),
('tachypnea', 'Тахипноэ', 'Частота дыхания выше нормы', '>20 вдохов/мин'),
('fever', 'Лихорадка', 'Температура выше нормы', '>38.0°C');

-- Показатели жизнедеятельности (создадим несколько записей для каждого пациента за последние дни)
-- Для простоты используем CURRENT_DATE и вычитаем дни.
INSERT INTO vital_signs (patient_id, timestamp, heart_rate, systolic_bp, diastolic_bp, spo2, respiratory_rate, temperature) VALUES
-- Пациент 1 (Петров) — норма
(1, DATE_SUB(NOW(), INTERVAL 2 DAY), 72, 128, 84, 97, 16, 36.6),
(1, DATE_SUB(NOW(), INTERVAL 1 DAY), 74, 130, 85, 98, 17, 36.7),
(1, NOW(), 72, 128, 84, 97, 16, 36.6),
-- Пациент 2 (Сидорова) — тахикардия, повышенное давление
(2, DATE_SUB(NOW(), INTERVAL 2 DAY), 108, 142, 90, 96, 18, 36.8),
(2, DATE_SUB(NOW(), INTERVAL 1 DAY), 112, 145, 92, 95, 18, 36.9),
(2, NOW(), 112, 145, 92, 95, 18, 36.9),
-- Пациент 3 (Николаев) — брадикардия, гипотония, низкая сатурация
(3, DATE_SUB(NOW(), INTERVAL 2 DAY), 60, 100, 62, 90, 20, 36.5),
(3, DATE_SUB(NOW(), INTERVAL 1 DAY), 58, 98, 60, 89, 21, 36.4),
(3, NOW(), 58, 98, 60, 89, 21, 36.4);

-- Оповещения (активные и подтверждённые)
INSERT INTO alerts (patient_id, alert_type_id, value, threshold, status, created_at, acknowledged_at) VALUES
-- Для Сидоровой: тахикардия (активно)
(2, (SELECT id FROM alert_types WHERE code='tachycardia'), '112 уд/мин', '>110', 'active', DATE_SUB(NOW(), INTERVAL 30 MINUTE), NULL),
-- Для Николаева: гипоксемия (активно)
(3, (SELECT id FROM alert_types WHERE code='hypoxemia'), '89%', '<92%', 'active', DATE_SUB(NOW(), INTERVAL 1 HOUR), NULL),
-- Для Петрова: гипертензия (подтверждено)
(1, (SELECT id FROM alert_types WHERE code='hypertension'), '145/92', '>140', 'resolved', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Комментарии к оповещениям (врачебные заметки)
INSERT INTO alert_comments (alert_id, user_id, comment) VALUES
(3, 1, 'Пациент жаловался на головную боль. Назначен контроль давления.');

-- События в логе (история)
INSERT INTO event_log (patient_id, user_id, event_type, description, event_time) VALUES
(2, 1, 'medication', 'Назначен бета-блокатор', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, 1, 'note', 'Рекомендовано исследование сна', DATE_SUB(NOW(), INTERVAL 12 HOUR));

-- Индивидуальные пороги для пациентов (пример: для Николаева установим нижний порог SpO2 90%)
INSERT INTO patient_thresholds (patient_id, alert_type_id, min_value, max_value) VALUES
(3, (SELECT id FROM alert_types WHERE code='hypoxemia'), NULL, '90');

-- Можно добавить ещё данных для истории показателей (например, за последние 7 дней)
-- Для простоты ограничимся вышеуказанными.
