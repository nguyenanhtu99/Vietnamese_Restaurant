package vietnam.restaurant.controllers;

import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vietnam.restaurant.loaders.requests.CategoryRequest;
import vietnam.restaurant.loaders.requests.ProductRequest;
import vietnam.restaurant.loaders.responses.MessageResponse;
import vietnam.restaurant.loaders.responses.ProductResponse;
import vietnam.restaurant.models.media.Picture;
import vietnam.restaurant.models.products.Category;
import vietnam.restaurant.models.products.Product;
import vietnam.restaurant.repository.media.PictureRepository;
import vietnam.restaurant.repository.products.CategoryRepository;
import vietnam.restaurant.repository.products.ProductRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    PictureRepository pictureRepository;

    //Picture
    public String getPictureUrl(Picture picture) {
        StringBuilder sb = new StringBuilder();
        sb.append("data:image/png;base64,");
        sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(picture.getPicture(), false)));
        return sb.toString();
    }

    @PostMapping(value = "/picture/upload")
    public ResponseEntity<?> uploadPicture(@RequestParam MultipartFile file) throws IOException {
        var picture = new Picture(file.getBytes(), file.getContentType());
        pictureRepository.save(picture);
        return ResponseEntity.ok(picture.getId());
    }

    //Response
    public ProductResponse convertProductToResponse(Product product){
        var productResponse = new ProductResponse(product.getId(), product.getName(), product.getSku(),
                product.isShowOnHomepage(), product.getPrice(), product.isEnteredPrice(), product.getUnit());
        if(product.getPicture() != null){
            productResponse.setPictureId(product.getPicture().getId());
            productResponse.setPictureUri(getPictureUrl(product.getPicture()));
        }
        if(product.getCategory() != null)
            productResponse.setCategoryId(product.getCategory().getId());
        return productResponse;
    }

    //Product
    @GetMapping("/all")
    public List<?> getAllProducts(){
        var products = productRepository.findAll();
        List<ProductResponse> responses = new ArrayList<>();
        products.forEach((product) -> {
            responses.add(convertProductToResponse(product));
        });
        return responses;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        var response = convertProductToResponse(product);
        return ResponseEntity.ok(response);
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
        //Picture
        if(productRequest.getPictureId() != null){
            var picture = pictureRepository.findById(productRequest.getPictureId())
                    .orElseThrow(() -> new RuntimeException("Error: Picture not found."));
            product.setPicture(picture);
        }

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
        //Picture
        if(productRequest.getPictureId() != null){
            var picture = pictureRepository.findById(productRequest.getPictureId())
                    .orElseThrow(() -> new RuntimeException("Error: Product not found."));
            product.setPicture(picture);
        }

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

    //Category
    public ResponseEntity<?> addNewCategory(@RequestBody CategoryRequest categoryRequest){
        Category category = new Category(categoryRequest.getName());
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }
}
