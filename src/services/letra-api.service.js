import http from './common/http.common'

class LetraApiService{

    getById(id){
        return http.get(`/letras/${id}`);
    }
    deleteById(id){
        return http.delete(`/letras/${id}`);
    }
    updateById(id){
        return http.put(`/letras/${id}`);
    }
    getOperacionLetrasByLetraId(id){
        return http.get(`/letras/${id}/operacionletras`);
    }
    getOperacionLetrasByLetraIdAndOperacionId(letraId,operacionId){
        return http.get(`/letras/${letraId}/operacion/${operacionId}`);
    }
    createOperacionLetras(id,operacionId){
        return http.post(`/letras/${id}/operacion/${operacionId}`);
    }
    deleteOperacionLetras(id,operacionId){
        return http.delete(`/letras/${id}/operacion/${operacionId}`);
    }

}

export default new LetraApiService()