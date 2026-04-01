<?php
$alerts = getAlerts();
?>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Журнал системных оповещений</h3>
        <button class="btn btn-primary">Настройка правил</button>
    </div>
    <div style="margin-bottom:20px;">
        <label class="form-label">Фильтры</label>
        <div style="display:flex; gap:10px;">
            <select class="form-control"><option>Все пациенты</option></select>
            <select class="form-control"><option>Все типы оповещений</option></select>
            <select class="form-control"><option>За последние 7 дней</option></select>
            <button class="btn btn-secondary">Сбросить</button>
        </div>
    </div>
    <table class="table">
        <thead><tr><th>Время</th><th>Пациент</th><th>Тип</th><th>Описание</th><th>Статус</th><th></th></tr></thead>
        <tbody>
            <?php foreach ($alerts as $alert): ?>
            <tr>
                <td><?php echo $alert['time']; ?></td>
                <td><?php echo $alert['patient_name']; ?></td>
                <td><?php echo $alert['param']; ?></td>
                <td><?php echo $alert['value']; ?></td>
                <td>
                    <?php
                    $status_text = '';
                    $color = '';
                    if ($alert['status'] == 'active') {
                        $status_text = 'Активно';
                        $color = '#d69e2e';
                    } elseif ($alert['status'] == 'confirmed') {
                        $status_text = 'Подтверждено';
                        $color = '#38a169';
                    } else {
                        $status_text = 'Не подтверждено';
                        $color = '#e53e3e';
                    }
                    ?>
                    <span style="color:<?php echo $color; ?>;"><?php echo $status_text; ?></span>
                </td>
                <td><a href="index.php?page=patient-detail&id=<?php echo $alert['patient_id']; ?>" class="btn btn-secondary">Просмотр</a></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>