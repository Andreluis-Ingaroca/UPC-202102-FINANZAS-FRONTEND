import http from './common/http.common';

class UsuariosApiService{

    getAll(){
        return http.get('/usuarios');
    }

    create(data){
        return http.post(`/usuarios`,data);
    }

    getById(id){
        return http.get(`/usuarios/${id}`);
    }
    delete(id){
        return http.delete(`/usuarios/${id}`);
    }
    update(id,data){
        return http.put(`/usuarios/${id}`,data);
    }
    createPerfil(usuarioId,data){
        return http.post(`/usuarios/${usuarioId}/perfiles`,data);
    }
    getPerfilbyUserId(id){
        return http.get(`/usuarios/${id}/perfiles`);
    }

}

export default new UsuariosApiService()