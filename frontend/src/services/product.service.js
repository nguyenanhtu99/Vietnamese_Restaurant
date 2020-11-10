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

    updateProduct(id, request, formData) {
        console.log(formData);
        return axios.put(API_URL + "edit/"+ id, request, formData);
    }

    uploadPicture(formData){
        return axios.post(API_URL + "picture/upload", formData);
    }
    
    deleteProduct(id) {
        return axios.delete(API_URL + id);
    }
}
export default new ProductService();