<div class="card" style="max-width: 400px; margin: 40px auto;">
    <h3 class="card-title" style="text-align:center; margin-bottom:30px;">Авторизация в системе</h3>
    <form id="login-form" method="post" action="index.php?page=dashboard">
        <div class="form-group">
            <label class="form-label">Логин</label>
            <input type="text" class="form-control" placeholder="Введите ваш логин" required>
        </div>
        <div class="form-group">
            <label class="form-label">Пароль</label>
            <input type="password" class="form-control" placeholder="Введите пароль" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;">Войти в систему</button>
    </form>
    <p style="text-align:center; margin-top:20px; color:#718096; font-size:0.9rem;">Доступ только для авторизованного медицинского персонала</p>
</div>