<?php
$patients = getPatients();
$alerts = getAlerts();
?>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Пациенты под наблюдением</h3>
        <div>
            <button class="btn btn-secondary" style="margin-right:10px;">Фильтр</button>
            <button class="btn btn-primary">Добавить пациента</button>
        </div>
    </div>
    <div class="grid">
        <?php foreach ($patients as $patient): ?>
        <div class="card">
            <h4 style="display:flex; align-items:center;">
                <span class="status-indicator <?php echo getStatusClass($patient['status']); ?>"></span>
                <?php echo $patient['name']; ?>
            </h4>
            <p style="color:#718096; margin:10px 0;"><?php echo $patient['age']; ?> лет, <?php echo $patient['diagnosis']; ?></p>
            <div style="margin-top:15px;">
                <div style="display:flex; justify-content:space-between;">
                    <span>ЧСС:</span> <?php echo formatVital($patient['hr'].' уд/мин', $patient['hr_color']); ?>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span>Давление:</span> <?php echo formatVital($patient['bp'], $patient['bp_color']); ?>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span>SpO2:</span> <?php echo formatVital($patient['spo2'].'%', $patient['spo2_color']); ?>
                </div>
            </div>
            <a href="index.php?page=patient-detail&id=<?php echo $patient['id']; ?>" class="btn btn-secondary" style="width:100%; margin-top:15px; text-align:center; display:block;">Открыть детали</a>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="card">
    <h3 class="card-title">Активные оповещения</h3>
    <table class="table">
        <thead>
            <tr><th>Пациент</th><th>Параметр</th><th>Значение</th><th>Время</th><th>Действия</th></tr>
        </thead>
        <tbody>
            <?php foreach ($alerts as $alert): ?>
            <?php if ($alert['status'] === 'active'): ?>
            <tr>
                <td><?php echo $alert['patient_name']; ?></td>
                <td><?php echo $alert['param']; ?></td>
                <td style="color:<?php echo $alert['color'] == 'warning' ? '#d69e2e' : ($alert['color'] == 'critical' ? '#e53e3e' : '#3182ce'); ?>;">
                    <?php echo $alert['value']; ?>
                </td>
                <td><?php echo $alert['time']; ?></td>
                <td><a href="index.php?page=patient-detail&id=<?php echo $alert['patient_id']; ?>" class="btn btn-secondary">Просмотр</a></td>
            </tr>
            <?php endif; ?>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>