package com.ItauCaseBack.repositories;

import com.ItauCaseBack.domain.account.Account;
import com.ItauCaseBack.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByUser(User user);
    Optional<Account> findByAccount(String account);
}
