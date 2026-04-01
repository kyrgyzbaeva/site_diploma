<?php
$patients = getPatients();
$selected_patient = isset($_GET['patient_id']) ? (int)$_GET['patient_id'] : 2;
$events = $history_events; // из data.php
?>
<div class="card">
    <div class="card-header">
        <h3 class="card-title">История показателей пациента</h3>
        <div>
            <form method="get" action="index.php" style="display:inline;">
                <input type="hidden" name="page" value="history">
                <select name="patient_id" class="form-control" style="width:200px; display:inline-block;" onchange="this.form.submit()">
                    <?php foreach ($patients as $p): ?>
                    <option value="<?php echo $p['id']; ?>" <?php echo $p['id'] == $selected_patient ? 'selected' : ''; ?>>
                        <?php echo $p['fullname']; ?>
                    </option>
                    <?php endforeach; ?>
                </select>
            </form>
            <button class="btn btn-primary" style="margin-left:10px;">Экспорт данных</button>
        </div>
    </div>
    <div style="margin-bottom:20px;">
        <label class="form-label">Выберите период для анализа</label>
        <div style="display:flex; gap:10px;">
            <input type="date" class="form-control" value="2023-10-20">
            <span style="align-self:center;">—</span>
            <input type="date" class="form-control" value="2023-10-27">
            <button class="btn btn-secondary">Применить</button>
        </div>
    </div>
    <div class="chart-placeholder" style="height:400px;">Область для детального исторического графика с инструментами масштабирования и сравнения</div>
    <div style="margin-top:20px;">
        <h4>События и комментарии</h4>
        <table class="table">
            <thead><tr><th>Дата и время</th><th>Событие</th><th>Значение</th><th>Комментарий врача</th></tr></thead>
            <tbody>
                <?php foreach ($events as $event): ?>
                <tr>
                    <td><?php echo $event['datetime']; ?></td>
                    <td><?php echo $event['event']; ?></td>
                    <td><?php echo $event['value']; ?></td>
                    <td><?php echo $event['comment']; ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>