package com.ItauCaseBack.controllers;

import com.ItauCaseBack.repositories.AccountRepository;
import com.ItauCaseBack.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;


    @GetMapping("/")
    public ResponseEntity<String> getAccount() {
        //To-DO api para pegar conta para mostrar na tela inicial

        return ResponseEntity.ok("");
    }

    @GetMapping("/balance")
    public ResponseEntity  getBalance() {
        //TO-DO: api para pegar saldo para mostrar na tela inicial do app

        return ResponseEntity.ok("");
    }
}
