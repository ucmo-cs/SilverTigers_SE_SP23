package com.example.BankProject.Service;

import com.example.BankProject.Domain.BankUser;
import com.example.BankProject.Repository.BankUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BankUserService {
    private final BankUserRepository bankUserRepository;

    @Transactional
    public BankUser create(BankUser bankUser) {
        return bankUserRepository.save(bankUser);
    }

    @Transactional
    public List<BankUser> getUserByUsername(String username) {
        return bankUserRepository.findByUsername(username);
    }
}
