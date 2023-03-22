package com.example.BankProject.Repository;

import com.example.BankProject.Domain.Statement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatementRepository extends JpaRepository<Statement,Integer>{

    public List<Statement> findByName(String name);

}


