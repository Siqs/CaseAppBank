package com.ItauCaseBack.dto;

public record NewPaymentRequestDTO (String userName, String userAccount, String userAmount, String recipientName, String recipientCpf, String recipientBank, String recipientAccount, String paymentAmount, String paymentMessage, String paymentType){
}
