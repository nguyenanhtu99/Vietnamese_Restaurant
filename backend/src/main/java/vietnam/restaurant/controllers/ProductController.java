package vietnam.restaurant.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vietnam.restaurant.loaders.requests.ProductRequest;
import vietnam.restaurant.loaders.responses.MessageResponse;
import vietnam.restaurant.models.media.Picture;
import vietnam.restaurant.models.products.Product;
import vietnam.restaurant.repository.media.PictureRepository;
import vietnam.restaurant.repository.products.ProductRepository;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    PictureRepository pictureRepository;

    @PostMapping(value = "/picture/upload")
    public ResponseEntity<?> uploadPicture(@RequestParam MultipartFile file) throws IOException {
        var picture = new Picture(file.getBytes(), file.getContentType());
        pictureRepository.save(picture);
        return ResponseEntity.ok(new MessageResponse("Picture uploaded successfully!"));
    }

    @GetMapping("/picture/{id}")
    public ResponseEntity<Picture> getPictureById(@PathVariable Long id) {
        var picture = pictureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Picture not found."));
        return ResponseEntity.ok(picture);
    }

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
    public ResponseEntity<?> addNewProduct(@RequestBody ProductRequest productRequest) {
        Product product = new Product(
                productRequest.getName(),
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
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @RequestBody ProductRequest productRequest) {
        var product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        //Set value
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
