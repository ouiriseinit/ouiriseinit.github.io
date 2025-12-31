import { useEffect, useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(0)
    useEffect(() => {
        fetch('/api/user')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [refresh])

    const remove = (_id) => {
        fetch('/api/user/', {
                method: 'DELETE',
                body: JSON.stringify({ _id })
            }
        )
        .then(res => res.json())
        .then((data) => (data) ? setRefresh(refresh + 1) : console.log('no data'))
    }
    return (<>
        {
            users.map(user => {
                const { _id, name, phone, email, business } = user
                return (
                <div className={global.card} key={_id}>
                    <p>{name}</p>
                    {phone && <p>{phone}</p>}
                    {email && <p>{email}</p>}
                    {business && <p>{business}</p>}

                    <a onClick={() => remove(_id)}>Remove</a>
                </div>
                )
            })
        }
    </>)
}