import axios from "axios";

const API_URL = "http://localhost:8082/api/products/";

class ProductService {
    getAllProducts(){
        return axios.get(API_URL + "all");
    }
    getProductById(id){
        return axios.get(API_URL + id);
    }

    addNewProduct(request) {
        console.log(request);
        return axios.post(API_URL + "add", request);
    }

    updateProduct(id, request) {
        console.log(request);
        return axios.put(API_URL + "edit/"+ id, request);
    }

    uploadPicture(formData){
        return axios.post(API_URL + "picture/upload", formData);
    }

    getPictureById(id){
        return axios.get(API_URL + "picture/" + id);
    }
    
    deleteProduct(id) {
        return axios.delete(API_URL + id);
    }
}
export default new ProductService();