package vietnam.restaurant.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vietnam.restaurant.loaders.requests.OrderRequest;
import vietnam.restaurant.loaders.responses.MessageResponse;
import vietnam.restaurant.models.orders.*;
import vietnam.restaurant.models.products.Product;
import vietnam.restaurant.models.users.User;
import vietnam.restaurant.repository.orders.OrderProductRepository;
import vietnam.restaurant.repository.orders.OrderRepository;
import vietnam.restaurant.repository.products.ProductRepository;
import vietnam.restaurant.repository.users.UserRepository;

import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    @PostMapping("/add")
    private ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest){

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();

        userRepository.findById(orderRequest.getUser_id())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));

        Order order = new Order(EOrderStatus.PLACED,
                                orderRequest.getNote(),
                                formatter.format(date), orderRequest.getPosition());

        //User
        User user = userRepository.findById(orderRequest.getUser_id())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        order.setUser(user);

        //Products
        List<Long> product_ids = orderRequest.getProduct_ids();
        List<Float> quantities = orderRequest.getQuantities();

        for (int i=0; i<product_ids.size(); i++){
            Product product = productRepository.findById(product_ids.get(i))
                    .orElseThrow(() -> new RuntimeException("Error: Product is not found."));
            order.setTotal(quantities.get(i)*product.getPrice());
            OrderProductKey orderProductKey = new OrderProductKey(order.getId(),product_ids.get(i));
            OrderProduct orderProduct = new OrderProduct(orderProductKey, order, product, product.getPrice(), quantities.get(i));
            orderProductRepository.save(orderProduct);
        }

        return ResponseEntity.ok(new MessageResponse("Order created successfully!"));
    }

}
