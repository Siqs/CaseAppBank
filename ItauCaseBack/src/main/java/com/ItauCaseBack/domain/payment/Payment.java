package com.ItauCaseBack.domain.payment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    // simulando atributos dos payments vindo na api dada pelo teste
    @Id
    @GeneratedValue
    private Integer id;
    private String createdAt;
    private String category;
    private String name;
    private String amount;


}
