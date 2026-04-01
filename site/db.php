<?php
require_once 'config.php';

/**
 * Заглушка подключения к БД
 * В реальном проекте здесь будет PDO или mysqli
 */
function getDB() {
    // return new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    return null;
}

// Пример функции получения списка пациентов (заглушка)
function getPatients() {
    // В реальности запрос к БД, пока возвращаем статику из data.php
    global $patients;
    return $patients;
}

function getPatientById($id) {
    global $patients;
    foreach ($patients as $p) {
        if ($p['id'] == $id) return $p;
    }
    return null;
}

function getAlerts() {
    global $alerts;
    return $alerts;
}
?>