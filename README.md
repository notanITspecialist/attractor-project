# attractor-project
В приложении реализованы 3 модели с которыми можно взаимодействовать

# User
Это модель пользователя
Зарегистрироваться можно c помощью запроса POST "/user"
Залогиниться POST "/user/sessions"
Разлогиниться DELETE "/user/sessions"
Получить список GET "/user"
Получить одного GET "/user/:id"
Редактировать PUT "/user/:id"

# Category
Это модель категорий статей
Создать категорию можно с помощью запроса POST "/category"
Удалить DELETE "/category/:id"
Редактировать PUT "/category/:id"
Получить список GET "/category"
Получить одну GET "/category"
Получить список неавториированному пользователю GET "/category/unregistered"

# Article
Это модель статей
Создать статью можно с помощью запроса POST "/article"
Удалить DELETE "/article/:id"
Редактировать PUT "/article/:id"
Получить список GET "/article"
Получить одну GET "/article/:id"
Получить список неавториированному пользователю GET "/article/unregistered"
