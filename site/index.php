<?php
require_once 'functions.php';

// Определяем, какую страницу показывать
$page = isset($_GET['page']) ? $_GET['page'] : 'dashboard';

// Белый список допустимых страниц
$allowed_pages = ['dashboard', 'patient-detail', 'history', 'alerts', 'settings', 'login'];
if (!in_array($page, $allowed_pages)) {
    $page = 'dashboard';
}

// Подключаем шапку
include 'header.php';
// Подключаем боковое меню
include 'sidebar.php';

// Основной контент
echo '<main class="main-content">';
echo '<header class="top-bar">';
echo '<h2 class="page-title" id="current-page-title">' . getPageTitle($page) . '</h2>';
echo '<div class="user-info">
        <div class="user-avatar">ИВ</div>
        <div>
            <div style="font-weight:500;">Иванов П.С.</div>
            <div style="font-size:0.9rem; color:#718096;">Врач-кардиолог</div>
        </div>
      </div>';
echo '</header>';

// Подключаем файл страницы
$page_file = 'pages/' . $page . '.php';
if (file_exists($page_file)) {
    include $page_file;
} else {
    echo '<div class="card">Страница не найдена</div>';
}

echo '</main>';

include 'footer.php';

// Вспомогательная функция для заголовка
function getPageTitle($page) {
    $titles = [
        'login' => 'Авторизация в системе',
        'dashboard' => 'Сводная панель',
        'patient-detail' => 'Детальная страница пациента',
        'history' => 'История показателей',
        'alerts' => 'Журнал оповещений',
        'settings' => 'Настройки системы'
    ];
    return isset($titles[$page]) ? $titles[$page] : 'Телемедицинский мониторинг';
}
?>