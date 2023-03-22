package com.example.BankProject.Repository;


import com.example.BankProject.Domain.BankUser;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankUserRepository extends JpaRepository<BankUser,Integer> {
    public List<BankUser> findByUsername(String username);
}
