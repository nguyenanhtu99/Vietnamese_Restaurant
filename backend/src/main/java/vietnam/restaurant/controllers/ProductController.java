package vietnam.restaurant.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vietnam.restaurant.loaders.requests.ProductRequest;
import vietnam.restaurant.loaders.responses.MessageResponse;
import vietnam.restaurant.models.products.Product;
import vietnam.restaurant.models.users.User;
import vietnam.restaurant.repository.products.ProductRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        return ResponseEntity.ok(product);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewProduct(@RequestBody ProductRequest productRequest){
        Product product = new Product(productRequest.getName(),
                productRequest.getSku(),
                productRequest.isShowOnHomepage(),
                productRequest.getPrice(),
                productRequest.isEnteredPrice(),
                productRequest.getUnit()
        );
        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponse("Product added successfully!"));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductRequest productRequest){
        var product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));

        product.setName(productRequest.getName());
        product.setSku(productRequest.getSku());
        product.setPrice(productRequest.getPrice());
        product.setUnit(productRequest.getUnit());
        product.setShowOnHomepage(productRequest.isShowOnHomepage());
        product.setEnteredPrice(productRequest.isEnteredPrice());
        productRepository.save(product);

        return ResponseEntity.ok(new MessageResponse("Product updated successfully!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        productRepository.delete(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
