import { API } from '../config';
import axios from 'axios'
import swal from 'sweetalert';

// export const setUser = (user) => {
//     //console.log('userfind', user)
//     return {type: 'SET_USER', payload: user}
// }


// export const signup = user => {
//     return 
//     fetch(`${API}/signup`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//           },
//         body: JSON.stringify(user)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

// export const signin = user => {
//     return fetch(`${API}/signin`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
// export const authenticate = (data, next) => {
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('jwt', JSON.stringify(data));
//         next();
//     }
// };

// export const signout = next => {
//     if (typeof window !== 'undefined') {
//         localStorage.removeItem('jwt');
//         next();
//         return fetch(`${API}/signout`, {
//             method: 'GET'
//         })
//             .then(response => {
//                 console.log('signout', response);
//             })
//             .catch(err => console.log(err));
//     }
// };

// export const isAuthenticated = () => {
//     if (typeof window == 'undefined') {
//         return false;
//     }
//     if (localStorage.getItem('jwt')) {
//         return JSON.parse(localStorage.getItem('jwt'));
//     } else {
//         return false;
//     }
// };



// import axios from '../config/axios'
// import swal from 'sweetalert';

export const setUser = (user) => {
    //console.log('userfind', user)
    return {type: 'SET_USER', payload: user}
}

export const startSetUser = () => {  // how it work from index page
    return (dispatch) => {
        axios.get(`${API}/users/account`, {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            const user = response.data
            dispatch(setUser(user))
        })
    }
}

export const signup = (FormData) => {
    return(dispatch) => { 
        //console.log('action generator', FormData)
        axios.post(`${API}/signup`, FormData)
        .then((response) => {
            //console.log(response.data)
            if(response.data.hasOwnProperty('error')){
                alert(response.data.error)
            }
            else{
                swal({
                    title:'successfully Registered',
                    icon: 'success'
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

// StartLoginUser
export const signin = (formData) => {
    return (dispatch) => {
        //console.log('action generator', formData)
        axios.post(`${API}/signin`, formData)
        .then((response) => {
            //console.log(response.data)
            if(response.data.hasOwnProperty("error")){
                alert(response.data.error)
            }
            else{
                swal({
                    title:'successfully logged in',
                    icon: 'success'
                })
                //console.log(response.data)
                localStorage.setItem('jwt', response.data.token)
                axios.get( `${API}/users/account`, {
                    headers: {
                        'Authorization': localStorage.getItem('jwt') 
                    }
                })
                .then((response) => {
                   const user = response.data
                   //console.log(user)
                   dispatch(setUser(user))
                })
                .catch((err) => {
                   console.log(err)
                })
                //redirect()
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

// export const signout = next => {
//     if (typeof window !== 'undefined') {
//         localStorage.removeItem('jwt');
//         next();
//         return axios.get(`${API}/signout`)
//             .then(response => {
//                 console.log('signout', response);
//             })
//             .catch(err => console.log(err));
//     }
// };
