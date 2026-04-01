<?php
$current_page = isset($_GET['page']) ? $_GET['page'] : 'dashboard';
?>
<nav class="sidebar">
    <div class="sidebar-header">
        <h1>ТМониторинг</h1>
        <p style="font-size:0.9rem; color:#a0aec0;">Версия 1.0</p>
    </div>
    <ul class="sidebar-nav">
        <li><a href="index.php?page=dashboard" class="nav-link <?php echo isActive('dashboard'); ?>"><span class="icon">📊</span> Сводная панель</a></li>
        <li><a href="index.php?page=patient-detail&id=2" class="nav-link <?php echo isActive('patient-detail'); ?>"><span class="icon">👨‍⚕️</span> Пациент</a></li>
        <li><a href="index.php?page=history" class="nav-link <?php echo isActive('history'); ?>"><span class="icon">📈</span> История</a></li>
        <li><a href="index.php?page=alerts" class="nav-link <?php echo isActive('alerts'); ?>"><span class="icon">⚠️</span> Оповещения</a></li>
        <li><a href="index.php?page=settings" class="nav-link <?php echo isActive('settings'); ?>"><span class="icon">⚙️</span> Настройки</a></li>
        <li style="margin-top:30px;"><a href="index.php?page=login" class="nav-link <?php echo isActive('login'); ?>"><span class="icon">🚪</span> Выход</a></li>
    </ul>
</nav>