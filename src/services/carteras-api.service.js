import http from './common/http.common';

class CarterasApiService{

    getById(id){
        return http.get(`/carteras/${id}`);
    }

    delete(id){
        return http.delete(`/carteras/${id}`);
    }

    getLetras(id){
        return http.get(`/carteras/${id}/letras`);
    }

    createLetras(id,data){
        return http.post(`/carteras/${id}/letras`,data);
    }

    getOperacionCarterasByCartera(id){
        return http.get(`/carteras/${id}/operacioncarteras`);
    }

    getOperacionCarteraByCarteraIdAndOperacionId(carteraId,operacionId){
        return http.get(`/carteras/${carteraId}/operacion/${operacionId}`);
    }

    createOperacionCarteras(id,operacionId){
        return http.post(`/carteras/${id}/operacion/${operacionId}`);
    }

    deleteOperacionCarteras(id,operacionId){
        return http.delete(`/carteras/${id}/operacion/${operacionId}`);
    }

    getOperaciones(id){
        return http.get(`/carteras/${id}/operaciones`);
    }

}

export default new CarterasApiService()