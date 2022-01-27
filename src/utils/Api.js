class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
  
    // Проверка ответа
    _checkAnswer(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(console.log(`Ошибка: ${res.status}`))
    }

    // Добавление карточек на страницу с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => {
                return this._checkAnswer(res)
            })
    }

    // Загрузка данных профиля с сервера
    getApiUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => {
            return this._checkAnswer(res)
        })
    }

    // Отправка новых данных профиля на сервер
    patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name_profile,
                about: data.type_of_profession
            })
        })
        .then((res) => {
            return this._checkAnswer(res)
        })
    }

    // Добавление новой карточки на сервер
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then((res) => {
            return this._checkAnswer(res)
        })
    }

    // Изменение аватара в профиле
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then((res) => {
            return this._checkAnswer(res)
        })
    }

    // Удалить карточку
    deleteCard(data) {
        return fetch(`${this._url}/cards/${data._id}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then((res) => {
            return this._checkAnswer(res)
        })
    }

    // Поставить лайк
    addLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        })
        .then((res) => {
            return this._checkAnswer(res)
        })
    }

    // Удалить лайк
    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then((res) => {
            return this._checkAnswer(res)
        }) 
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: 'a5452888-af25-48c3-855e-554e70da024c',
        'Content-Type': 'application/json'
    }
})

export default api