package com.ItauCaseBack.controllers;

import com.ItauCaseBack.domain.payment.Payment;
import com.ItauCaseBack.dto.NewPaymentRequestDTO;
import com.ItauCaseBack.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentRepository paymentRepository;

    @PostMapping("/new")
    public ResponseEntity newPayment(@RequestBody NewPaymentRequestDTO body) {
        // checagens já deveriam ser feitas no front end, nesse caso, para evitar preenchimento errado
        if (Float.parseFloat(body.paymentAmount()) > Float.parseFloat(body.userAmount())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: saldo insuficiente");
        }

        if (Objects.equals(body.userAccount(), body.recipientAccount())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: não é possível transferir para a mesma conta");
        }

        if(Float.parseFloat(body.paymentAmount()) > 5000 && Objects.equals(body.paymentType(), "PIX")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: tipo de transferência não condiz com valor");
        }

        if(Float.parseFloat(body.paymentAmount()) > 5000 && Float.parseFloat(body.paymentAmount()) <= 10000 && Objects.equals(body.paymentType(), "TED")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: tipo de transferência não condiz com valor");
        }

        if(Float.parseFloat(body.paymentAmount()) > 10000 && Objects.equals(body.paymentType(), "DOC")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: tipo de transferência não condiz com valor");
        }

        Payment newPayment = new Payment();
        newPayment.setAmount(body.paymentAmount());
        newPayment.setName(body.recipientName());
        // newPayment.setCategory(); // como não temos necessariamente um campo para isso, deixar comentado, createdAt e Id são de responsabilidade do banco

        this.paymentRepository.save(newPayment);
        
        return ResponseEntity.ok("Transferência realizada com sucesso! Seu saldo agora é: " + (Float.parseFloat(body.userAmount()) - Float.parseFloat(body.paymentAmount())));
    }
}
