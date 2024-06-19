package com.ItauCaseBack.domain.payment;

import com.ItauCaseBack.domain.account.Account;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PaymentId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "senderId")
    private Account sender;

    @ManyToOne
    @JoinColumn(name = "receiverId")
    private Account receiver;

    public void setSender(Account senderAcc) {
        this.sender = senderAcc;
    }

    public void setReceiver(Account receiverAcc) {
        this.receiver = receiverAcc;
    }

    @Override
    public boolean equals(Object o) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }
        PaymentId pk = (PaymentId) o;
        return Objects.equals( sender, pk.sender ) &&
                Objects.equals( receiver, pk.receiver );
    }

    @Override
    public int hashCode() {
        return Objects.hash( sender, receiver );
    }
}
