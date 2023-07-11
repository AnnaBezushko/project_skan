const baseUrl = 'https://gateway.scan-interfax.ru/api/v1/'

function getHaders() {
    const headers = {
        'Content-Type': 'application/json',
    }
    const token = localStorage.getItem('token')
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return headers
}

async function get(url) {
    return await fetch(`${baseUrl}${url}`, {
        method: 'GET',
        headers: getHaders(),
    })
}

async function post(url, data) {
    return await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        headers: getHaders(),
        body: JSON.stringify(data),
    })
}

async function login(login, password) {
    const r = await post('account/login', { login, password })
    if (r.status === 200) {
        return { success: true, data: await r.json() }
    } else if (r.status === 401) {
        return { success: false, data: await r.json() }
    }
    return null
}

async function accountInfo() {
    const r = await get('account/info')
    if (r.status === 200) {
        return { success: true, data: await r.json() }
    } else if (r.status === 401) {
        return { success: false, data: null }
    }
}

async function histograms(data) {
    const r = await post('objectsearch/histograms', data)
    return await r.json()
}

async function objectsearch(data) {
    const r = await post('objectsearch', data)
    return await r.json()
}

async function documents(data) {
    const r = await post('documents', data)
    if (r.status === 200) {
        return await r.json()
    }
}

const api = {
    login,
    accountInfo,
    histograms,
    objectsearch,
    documents,
}
export default api
