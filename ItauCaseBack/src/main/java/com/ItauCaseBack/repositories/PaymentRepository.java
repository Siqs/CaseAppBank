package com.ItauCaseBack.repositories;

import com.ItauCaseBack.domain.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
