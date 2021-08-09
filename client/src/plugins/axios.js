import axios from "axios";
import store from "@/store/store";
import {router} from "@/router";


axios.defaults.baseURL = 'https://098.diciwall.com/api/api/'


axios.interceptors.request.use((config) => {
    if(config.method==="post" || config.method=== "delete"){
        store.dispatch("setLoading",true)
    }

    return config;
}, (error) => {
    store.dispatch("setLoading",false)
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    store.dispatch("setLoading",false)
    return response;
}, (error) => {
    if (error.response) {

        switch (error.response.status) {
            case 400:
                console.log("400")
                break
            case 404:
                router.push({ name: '404' })
                break
            case 403:
                router.push({ name: '403' })
                break
            case 401:
                router.push({ name: '401' })
                break
            default: router.push({name:"500"})
        }

    } else if (error.request) {
        console.log(error.request)
    } else {
        console.log('Error', error.message)
    }

    store.dispatch("setLoading",false)
    return Promise.reject(error);
});



