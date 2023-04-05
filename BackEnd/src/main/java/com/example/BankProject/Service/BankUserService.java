package com.example.BankProject.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.BankProject.Domain.BankUser;
import com.example.BankProject.Repository.BankUserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BankUserService {
    private final BankUserRepository bankUserRepository;

    @Transactional
    public BankUser create(BankUser bankUser) {
        return bankUserRepository.save(bankUser);
    }

    @Transactional
    public boolean setSavingsGoal(Integer id, double savingsGoal) {

        Optional<BankUser> user = bankUserRepository.findById(id);

        if(!user.isPresent()) {
            return false;
        }

        user.get().setSavingsGoal(savingsGoal);
        bankUserRepository.save(user.get());
        return true;
    }

    @Transactional
    public BankUser getUserByUsername(String username) {
        return bankUserRepository.findByUsername(username);
    }

    public BankUser validateUserLogin(BankUser bankUser) {
        BankUser user = bankUserRepository.findByUsername(bankUser.getUsername());
        if (user != null) {
            if (bankUser.getPassword().equals(user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    @Transactional
    public double getSavingsGoal(Integer id) {
        Optional<BankUser> user = bankUserRepository.findById(id);

        if(!user.isPresent()) {
            return Double.NaN;
        }
        return user.get().getSavingsGoal();
    }
}
