<div class="grid">
    <div class="card">
        <h3 class="card-title">Профиль пользователя</h3>
        <form>
            <div class="form-group"><label class="form-label">ФИО</label><input type="text" class="form-control" value="Иванов Петр Сергеевич"></div>
            <div class="form-group"><label class="form-label">Должность</label><input type="text" class="form-control" value="Врач-кардиолог"></div>
            <div class="form-group"><label class="form-label">Электронная почта</label><input type="email" class="form-control" value="p.ivanov@clinic.ru"></div>
            <button class="btn btn-primary">Сохранить изменения</button>
        </form>
    </div>
    <div class="card">
        <h3 class="card-title">Настройки интерфейса</h3>
        <div class="form-group">
            <label class="form-label">Тема оформления</label>
            <select class="form-control"><option>Светлая</option><option>Темная</option></select>
        </div>
        <div class="form-group">
            <label class="form-label">Частота обновления данных</label>
            <select class="form-control"><option>Реальное время (1 сек)</option><option>Быстрая (5 сек)</option></select>
        </div>
        <div class="form-group">
            <label><input type="checkbox"> Включить звуковые оповещения</label>
        </div>
        <button class="btn btn-secondary">Применить</button>
    </div>
</div>
<div class="card" style="margin-top:20px;">
    <h3 class="card-title">Безопасность</h3>
    <p style="margin-bottom:15px;">Изменить пароль для входа в систему</p>
    <form style="max-width:500px;">
        <div class="form-group"><label class="form-label">Текущий пароль</label><input type="password" class="form-control"></div>
        <div class="form-group"><label class="form-label">Новый пароль</label><input type="password" class="form-control"></div>
        <div class="form-group"><label class="form-label">Подтверждение пароля</label><input type="password" class="form-control"></div>
        <button class="btn btn-primary">Обновить пароль</button>
    </form>
</div>