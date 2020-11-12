import axios from "axios";

const API_URL = "http://localhost:8082/api/categories/";

class CategoryService {
    getAllCategories(){
        return axios.get(API_URL + "all");
    }

    getListParent(id){
        return axios.get(API_URL + "all/" + id)
    }

    getCategoryById(id){
        return axios.get(API_URL + id);
    }

    addNewCategory(request) {
        return axios.post(API_URL + "add", request);
    }

    updateCategory(id, request) {
        return axios.put(API_URL + "edit/"+ id, request);
    }
   
    deleteCategory(id) {
        return axios.delete(API_URL + id);
    }
}
export default new CategoryService();