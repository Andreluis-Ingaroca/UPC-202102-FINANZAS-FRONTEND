import http from './common/http.common';

class PeriodoApiService{

    getAll(){
        return http.get(`/periodos`);
    }
    getById(id){
        return http.get(`/periodos/${id}`);
    }

    createTasa(id,idC,data){
        return http.post(`/periodos/${id}/periodos/${idC}/tasas`,data);
    }
}

export default new PeriodoApiService()