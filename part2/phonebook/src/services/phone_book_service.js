import axios from 'axios'

const base_url = 'http://localhost:3001/persons'

const getAll = () =>
    axios
        .get(base_url)
        .then(res => res.data)

const post = (person) =>
    axios
        .post(base_url, person)
        .then(res => res.data)

const del = (id) =>
    axios
        .delete(`${base_url}/${id}`)
        .then(res => res.data)

const put = (id, obj) =>
    axios
        .put(`${base_url}/${id}`, obj)
        .then(res => res.data)

const services = { getAll, post, del, put }

export default services