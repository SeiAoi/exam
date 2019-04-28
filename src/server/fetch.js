import axios from 'axios'

export const fetch = {
    get : function( url , datas ){
        console.log(url,datas,'数据');
        return axios.get(url , {
            params : datas
        })
        .then(function(response){
            return response.data
        })
        .catch(function(err){
            console.log(err);
        })
    },
    post : function( url , datas){
        console.log(datas,'数据');
        return axios.post(url , datas).then(response => {
            // console.log(response);
            return response.data
        }).catch(err => {
            console.log(err);
        })
    },
    put : function( url , datas){
        console.log(datas,'数据');
        return axios.put(url , datas).then(response => {
            // console.log(response);
            return response.data
        }).catch(err => {
            console.log(err);
        })
    }
}