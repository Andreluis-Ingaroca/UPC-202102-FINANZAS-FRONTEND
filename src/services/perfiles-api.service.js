import http from './common/http.common';

class PerfilesApiService{
    getAll(){
        return http.get('/perfiles')
    }
    getById(id){
        return http.get(`/perfiles/${id}`)
    }
    delete(id){
        return http.delete(`/perfiles/${id}`)
    }
    update(id,data){
        return http.put(`/perfiles/${id}`,data)
    }

    getAllCartera(id){
        return http.get(`/perfiles/${id}/carteras`)
    }
    createCartera(id,data){
        return http.post(`/perfiles/${id}/carteras`,data)
    }
}

export default new PerfilesApiService()