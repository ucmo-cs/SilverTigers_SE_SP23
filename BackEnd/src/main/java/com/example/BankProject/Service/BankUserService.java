package com.example.BankProject.Service;

import com.example.BankProject.Domain.BankUser;
import com.example.BankProject.Repository.BankUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class BankUserService {
    private final BankUserRepository bankUserRepository;

    @Transactional
    public BankUser create(BankUser bankUser) {
        return bankUserRepository.save(bankUser);
    }

    @Transactional
    public BankUser getUserByUsername(String username) {
        return bankUserRepository.findByUsername(username);
    }

    public BankUser validateUserLogin(BankUser bankUser) {
        BankUser user = bankUserRepository.findByUsername(bankUser.getUsername());
        if(user!=null) {
            if(bankUser.getPassword().equals(user.getPassword())) {
                return user;
            }        
        }
        return null;
    }
}
