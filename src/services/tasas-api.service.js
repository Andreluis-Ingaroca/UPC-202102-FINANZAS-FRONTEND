import http from './common/http.common';

class TasasApiService{

    getAll(){
        return http.get(`/tasas`);
    }

    getById(id){
        return http.get(`/tasas/${id}`);
    }

    createOperacion(id,data){
        return http.post(`/tasas/${id}/operaciones`,data);
    }


}

export default new TasasApiService()