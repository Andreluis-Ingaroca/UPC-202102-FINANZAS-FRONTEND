import http from './common/http.common'

class CostosApiService{

    getAll(){
        return http.get(`/costos`);
    }

    getById(id){
        return http.get(`/costos/${id}`);
    }

    create(data){
        return http.post(`/costos`,data);
    }

    
}

export default new CostosApiService()