package com.ItauCaseBack.controllers;


import com.ItauCaseBack.domain.user.User;
import com.ItauCaseBack.dto.LoginRequestDTO;
import com.ItauCaseBack.dto.LoginResponseDTO;
import com.ItauCaseBack.dto.RegisterRequestDTO;
import com.ItauCaseBack.dto.RegisterResponseDTO;
import com.ItauCaseBack.infra.security.TokenService;
import com.ItauCaseBack.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = this.userRepository.findByEmail(body.email()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginResponseDTO(user.getName(), token, user.getAvatar(), user.getId()));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody List<RegisterRequestDTO> body){


        int count = 0;
        for (RegisterRequestDTO u : body) {
            Optional<User> user = this.userRepository.findByEmail(u.email());
            if (user.isEmpty()) {
                User newUser = new User();
                newUser.setPassword(passwordEncoder.encode(u.password()));
                newUser.setCreatedAt(u.createdAt());
                newUser.setAvatar(u.avatar());
                newUser.setId(u.id());
                newUser.setEmail(u.email());
                newUser.setName(u.name());

                this.userRepository.save(newUser);

                count++;
            }
            else {
                System.out.println(u.name() + " is already registered");
            }
        }
        return ResponseEntity.ok(new RegisterResponseDTO(count));
    }
}
