<?php
$id = isset($_GET['id']) ? (int)$_GET['id'] : 2;
$patient = getPatientById($id);
if (!$patient) {
    echo '<div class="card">Пациент не найден</div>';
    return;
}
// Для демо используем данные второго пациента как текущие показатели
// (можно сделать отдельный массив показателей)
?>
<div class="card">
    <div class="card-header">
        <div>
            <h3 class="card-title">Пациент: <?php echo $patient['fullname']; ?></h3>
            <p style="color:#718096;"><?php echo $patient['age']; ?> лет, <?php echo $patient['diagnosis']; ?>, ID: P-<?php echo $patient['id']; ?></p>
        </div>
        <div>
            <a href="index.php?page=history&patient_id=<?php echo $patient['id']; ?>" class="btn btn-secondary" style="margin-right:10px;">История</a>
            <button class="btn btn-primary">Назначить лечение</button>
        </div>
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <div>
            <h4 style="margin-bottom:15px;">Электрокардиограмма (режим реального времени)</h4>
            <div class="chart-placeholder">График ЭКГ обновляется в реальном времени</div>
            <h4 style="margin:25px 0 15px;">Тренды показателей за 24 часа</h4>
            <div class="chart-placeholder">Совмещенный график ЧСС, давления и SpO2</div>
        </div>
        <div>
            <h4 style="margin-bottom:15px;">Текущие показатели</h4>
            <div class="card" style="margin-bottom:15px;">
                <strong>ЧСС:</strong> <span style="color:<?php echo $patient['hr_color']=='warning'?'#d69e2e':($patient['hr_color']=='critical'?'#e53e3e':'#3182ce'); ?>; float:right;"><?php echo $patient['hr']; ?> уд/мин</span>
            </div>
            <div class="card" style="margin-bottom:15px;">
                <strong>Артериальное давление:</strong> <span style="color:<?php echo $patient['bp_color']=='warning'?'#d69e2e':($patient['bp_color']=='critical'?'#e53e3e':'#3182ce'); ?>; float:right;"><?php echo $patient['bp']; ?> мм рт.ст.</span>
            </div>
            <div class="card" style="margin-bottom:15px;">
                <strong>SpO2:</strong> <span style="color:<?php echo $patient['spo2_color']=='warning'?'#d69e2e':($patient['spo2_color']=='critical'?'#e53e3e':'#3182ce'); ?>; float:right;"><?php echo $patient['spo2']; ?>%</span>
            </div>
            <div class="card" style="margin-bottom:15px;">
                <strong>Частота дыхания:</strong> <span style="color:#3182ce; float:right;">18 вдохов/мин</span>
            </div>
            <div class="card">
                <strong>Температура:</strong> <span style="color:#3182ce; float:right;">36.7°C</span>
            </div>
            <?php if ($patient['id'] == 2): ?>
            <div class="card" style="margin-top:25px; background:#fff5f5;">
                <h4 style="color:#c53030;">Активное оповещение</h4>
                <p>Тахикардия. ЧСС превышает порог в 110 уд/мин более 10 минут.</p>
                <button class="btn btn-secondary" style="width:100%; margin-top:10px;">Подтвердить</button>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>