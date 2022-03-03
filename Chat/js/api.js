import { UI } from "./view.js"
import { STORAGE } from './storage.js';
import { getCookie, setCookie, deleteCookie } from './cookies.js';

export const API = {
    URL: 'https://chat1-341409.oa.r.appspot.com/api',
    TOKEN: getCookie('emailToken') ? getCookie('emailToken') : '',

    saveToken() {
        this.TOKEN = UI.CONFIRM_INPUT.value

    },

    async getCode() {
        const response = await fetch(this.URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(STORAGE.email)

        })
        const content = await response.json()
        console.log(content);

    },

    async changeName() {
        const response = await fetch(`${this.URL}/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${this.TOKEN}`
            },
            body: JSON.stringify(STORAGE.name)
        })
    },

    async getUserData() {
        const response = await fetch(`${this.URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${API.TOKEN}`
            }
        })
        return await response.json()
    },

    async getMsgHistory() {
        const response = await fetch(`${this.URL}/messages/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${API.TOKEN}`
            }
        })

        const messagesHistory = await response.json()
        return messagesHistory['messages']
    },

    webSocketConnect() {
        const socket = new WebSocket(`ws://chat1-341409.oa.r.appspot.com/websockets?${API.TOKEN}`)

        socket.onopen = function (e) {
            alert("[open] Соединение установлено")

            alert("Отправляем данные на сервер")
            socket.send(JSON.stringify({
                text: 'абырвалг',
            }))
        }

        socket.onmessage = function (event) {
            alert(`[message] Данные получены с сервера: ${event.data}`);
            console.log(event.data)
        }
    }
}
