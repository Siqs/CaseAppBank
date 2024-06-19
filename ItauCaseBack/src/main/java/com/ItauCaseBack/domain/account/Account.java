package com.ItauCaseBack.domain.account;

import com.ItauCaseBack.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    private String account;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    private double amount;
    //tipo de conta, default corrente para desenvolvimento do teste
    private String type = "Corrente";
}
