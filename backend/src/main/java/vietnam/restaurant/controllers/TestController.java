package vietnam.restaurant.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vietnam.restaurant.models.users.User;
import vietnam.restaurant.repository.users.UserRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private UserRepository userRepository;

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('WAITER') or " +
			"hasRole('CASHIER') or hasRole('CHEF') or " +
			"hasRole('MANAGER') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/waiter")
	@PreAuthorize("hasRole('WAITER') or hasRole('ADMIN')")
	public String waiterAccess() {
		return "Waiter Content.";
	}

	@GetMapping("/cashier")
	@PreAuthorize("hasRole('CASHIER') or hasRole('ADMIN')")
	public String cashierAccess() {
		return "Cashier Content.";
	}

	@GetMapping("/chef")
	@PreAuthorize("hasRole('CHEF') or hasRole('ADMIN')")
	public String chefAccess() {
		return "Chef Content.";
	}

	@GetMapping("/manager")
	@PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
	public List<User> getAllUser(){
	    return userRepository.findAll();
    }

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
