import http from './common/http.common';

class OperacionesApiService{

    getById(id){
        return http.get(`/operaciones/${id}`);
    }

    delete(id){
        return http.delete(`/operaciones/${id}`);
    }
    update(id,data){
        return http.put(`/operaciones/${id}`,data);
    }

    getCostosOperacion(id){
        return http.get(`/operaciones/${id}/costosoperacion`);
    }
    getOperacionLetra(id){
        return http.get(`/operaciones/${id}/operacionletras`);
    }
    getResults(id){
        return http.get(`/operaciones/${id}/results`);
    }
    createCostosOperacion(id,costoId,data){
        return http.post(`/operaciones/${id}/costos/${costoId}`,data);
    }
    deleteCostosOperacion(id,costoId){
        return http.delete(`/operaciones/${id}/costos/${costoId}`);
    }

}

export default new OperacionesApiService()