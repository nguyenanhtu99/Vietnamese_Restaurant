import axios from "axios";

const API_URL = "http://localhost:8082/api/orders/";

class OrderService {
    placeOrder(order){
        return axios.post(API_URL + 'add', order)
    }
}
export default new OrderService();