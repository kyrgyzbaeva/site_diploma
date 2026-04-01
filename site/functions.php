<?php
require_once 'data.php';
require_once 'db.php';

// Получить класс статуса для индикатора
function getStatusClass($status) {
    $map = [
        'normal' => 'status-normal',
        'warning' => 'status-warning',
        'critical' => 'status-critical'
    ];
    return isset($map[$status]) ? $map[$status] : 'status-normal';
}

// Форматирование показателя с цветом
function formatVital($value, $color) {
    $colorMap = [
        'normal' => '#3182ce',
        'warning' => '#d69e2e',
        'critical' => '#e53e3e'
    ];
    $col = isset($colorMap[$color]) ? $colorMap[$color] : '#3182ce';
    return "<strong style=\"color:$col;\">$value</strong>";
}

// Активный пункт меню
function isActive($page) {
    $current = isset($_GET['page']) ? $_GET['page'] : 'dashboard';
    return $current === $page ? 'active' : '';
}
?>