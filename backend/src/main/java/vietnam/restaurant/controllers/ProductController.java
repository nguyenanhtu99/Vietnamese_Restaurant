package vietnam.restaurant.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vietnam.restaurant.loaders.requests.ProductRequest;
import vietnam.restaurant.loaders.responses.MessageResponse;
import vietnam.restaurant.loaders.responses.ProductResponse;
import vietnam.restaurant.models.media.Picture;
import vietnam.restaurant.models.products.Product;
import vietnam.restaurant.repository.media.PictureRepository;
import vietnam.restaurant.repository.products.CategoryRepository;
import vietnam.restaurant.repository.products.ProductRepository;
import vietnam.restaurant.services.products.ProductService;

import java.io.*;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    PictureRepository pictureRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductService productService;

    //Picture
    @PostMapping(value = "/picture/upload")
    public ResponseEntity<?> uploadPicture(@RequestParam MultipartFile file) throws IOException {
        var picture = new Picture(file.getBytes(), file.getContentType());
        pictureRepository.save(picture);
        return ResponseEntity.ok(picture.getId());
    }

    //Product
    @GetMapping("/all")
    public List<?> getAllProducts(){
        var products = productRepository.findAll();
        List<ProductResponse> responses = new ArrayList<>();
        products.forEach((product) -> {
            responses.add(productService.convertProductToResponse(product));
        });
        return responses;
    }

    @GetMapping("/all/{categoryId}")
    public List<?> getAllProductsByCategoryId(@PathVariable Long categoryId){
        var products = new ArrayList<Product>();
        if(categoryId == -1)
            products.addAll(productRepository.findAll());
        else if(categoryId == 0)
            productRepository.findAll().forEach(product -> {
                if(product.getCategory() == null)
                    products.add(product);
            });
        else {
            var category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Error: Category not found."));
            products.addAll(productService.getAllProductsByCategory(category));
        }
        List<ProductResponse> responses = new ArrayList<>();
        products.forEach((product) -> {
            responses.add(productService.convertProductToResponse(product));
        });
        return responses;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        var response = productService.convertProductToResponse(product);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewProduct(@RequestBody ProductRequest productRequest) {
        var product = productService.convertRequestToProduct(null, productRequest);
        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponse("Product added successfully!"));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @RequestBody ProductRequest productRequest) {
        var prd = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        var product = productService.convertRequestToProduct(prd, productRequest);
        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponse("Product updated successfully!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));

        //delete
        if(product.getPicture() != null)
            pictureRepository.delete(product.getPicture());
        if(product.getCategory() != null)
            product.setCategory(null);
        productRepository.delete(product);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
