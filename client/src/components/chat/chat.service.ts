import { useSelector } from "react-redux"
import { RootState } from '../../redux/store';
import { User } from "../../types/types";

const url = 'a71.chat.agora.io'
const appname = '1089542'
const orgname = '71932447'
const token = '007eJxTYAgNuveq/+KVo092frp/ZpKh/7ybzlqfQqRmn3xlzmL9SHONAoOlhZGZmVlKapJRYpKJSap5onFikqUpEBiYmyVZmJnsFVRJaQhkZDD09GJiZGBlYGRgYgDxGRgAYi8e6w=='

export const createChatUser = async (user: User) => {
    console.log(user.firstName)
    return fetch(`https://${url}/${orgname}/${appname}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            username: `user_${user.username}`,
            password: user.email,
            nickname: user.username

        })
    }
    ).then(res => res.json())
        .then(data => {
            console.log(data)
            return data
        }
        )
        .catch(err => console.log(err))
}

export const getUser = (user: User) => {
    return fetch(`https://${url}/${orgname}/${appname}/users/user_${user.username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    ).then(res => res.json())
        .then(data => {
            console.log(data)
            return data
        }

        )

}

export const createAdmin = async () => {

    const superAdmin = await fetch(`https://${url}/${orgname}/${appname}/chatrooms/super_admin`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json'
        },
        body: JSON.stringify({
            superadmin: 'user_yasslamenace',
        })
    })
    const data = await superAdmin.json()
    console.log(data)
    return data
}


export const createChatRoom = () => {
    return fetch(`https://${url}/${orgname}/${appname}/chatrooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: 'test',
            description: 'test',
            owner: 'user_yasslamenace',
            maxusers: 100,

                                              
        })}).then(res => res.json())
        .then(data => {
            console.log(data)
            return data
        }
        )
        .catch(err => console.log(err))
}




