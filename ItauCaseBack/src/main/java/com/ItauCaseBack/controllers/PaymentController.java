package com.ItauCaseBack.controllers;

import com.ItauCaseBack.domain.account.Account;
import com.ItauCaseBack.domain.payment.Payment;
import com.ItauCaseBack.domain.payment.PaymentId;
import com.ItauCaseBack.dto.NewPaymentRequestDTO;
import com.ItauCaseBack.repositories.AccountRepository;
import com.ItauCaseBack.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Objects;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentRepository paymentRepository;
    private final AccountRepository accountRepository;

    @PostMapping("/new")
    public ResponseEntity newPayment(@RequestBody NewPaymentRequestDTO body) {
        if (Objects.equals(body.userAccount(), body.recipientAccount())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: não é possível transferir para a mesma conta");
        }

        if((Float.parseFloat(body.paymentAmount()) > 5000 && Objects.equals(body.paymentType(), "PIX")) ||
            (Float.parseFloat(body.paymentAmount()) > 5000 && Float.parseFloat(body.paymentAmount()) <= 10000 && Objects.equals(body.paymentType(), "TED")) ||
            (Float.parseFloat(body.paymentAmount()) > 10000 && Objects.equals(body.paymentType(), "DOC"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: tipo de transferência não condiz com valor");
        }

        try {
            Account senderAcc = this.accountRepository.findByAccount(body.userAccount()).orElseThrow(() -> new UsernameNotFoundException("Sender account not found"));
            double senderBalance = senderAcc.getAmount();
            Account recipientAcc = this.accountRepository.findByAccount(body.recipientAccount()).orElseThrow(() -> new UsernameNotFoundException("Recipient account not found"));
            double recipientBalance = recipientAcc.getAmount();

            if (senderBalance < Float.parseFloat(body.paymentAmount())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída: saldo insuficiente");
            }
            senderAcc.setAmount(senderBalance - Float.parseFloat(body.paymentAmount()));
            recipientAcc.setAmount(recipientBalance + Float.parseFloat(body.paymentAmount()));

            Payment newPayment = new Payment();

            PaymentId paymentId = new PaymentId();
            paymentId.setSender(senderAcc);
            paymentId.setReceiver(recipientAcc);
            newPayment.setInternalId(paymentId);

            newPayment.setAmount(body.paymentAmount());
            newPayment.setName(body.recipientName());
            newPayment.setCreatedAt(LocalDateTime.now().toInstant(ZoneOffset.of("-03:00")).toString());
            newPayment.setCategory("");

            this.paymentRepository.save(newPayment);
            this.accountRepository.save(senderAcc);
            this.accountRepository.save(recipientAcc);

            return ResponseEntity.ok("Transferência realizada com sucesso! Seu saldo agora é: " + (Float.parseFloat(body.userAmount()) - Float.parseFloat(body.paymentAmount())));

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sua transferência não foi concluída por um erro inesperado, por favor tente novamente");
        }
   }
}
