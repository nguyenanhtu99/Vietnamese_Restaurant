package vietnam.restaurant.models.products;

import vietnam.restaurant.models.media.Picture;
import vietnam.restaurant.models.orders.OrderProduct;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",length = 100, nullable = false)
    private String name;

    @Column(name = "sku", length = 20)
    private String sku;

    @Column(name = "show_on_homepage", nullable = false)
    private boolean showOnHomepage;

    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "is_entered_price", nullable = false)
    private boolean isEnteredPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", length = 20)
    private Unit unit;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "picture_id")
    private Picture picture;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private Set<OrderProduct> orderProducts = new HashSet<OrderProduct>();

    public Product() {
    }

    public Product(String name, String sku, boolean showOnHomepage, Float price, boolean isEnteredPrice, Unit unit) {
        this.name = name;
        this.sku = sku;
        this.showOnHomepage = showOnHomepage;
        this.price = price;
        this.isEnteredPrice = isEnteredPrice;
        this.unit = unit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public boolean isShowOnHomepage() {
        return showOnHomepage;
    }

    public void setShowOnHomepage(boolean showOnHomepage) {
        this.showOnHomepage = showOnHomepage;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public boolean isEnteredPrice() {
        return isEnteredPrice;
    }

    public void setEnteredPrice(boolean enteredPrice) {
        isEnteredPrice = enteredPrice;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Picture getPicture() {
        return picture;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(Set<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }
}
