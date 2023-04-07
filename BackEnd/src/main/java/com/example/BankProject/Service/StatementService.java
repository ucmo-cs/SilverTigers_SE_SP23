package com.example.BankProject.Service;

import com.example.BankProject.Domain.BankUser;
import com.example.BankProject.Domain.Statement;
import com.example.BankProject.Repository.BankUserRepository;
import com.example.BankProject.Repository.StatementRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StatementService {

    private final StatementRepository statementRepository;
    private final BankUserRepository bankUserRepository;

    @Transactional
    public Statement create(Integer user_id, Statement statement){

        BankUser bankUser;

        bankUser = bankUserRepository.findById(user_id).orElseThrow(()
                ->new IllegalArgumentException("bankUser id does not exists"));

        statement.setBankuser(bankUser);
        return statementRepository.save(statement);
    }


    @Transactional
    public List<Statement> getStatementByName(String name){
        return statementRepository.findByName(name);
    }

    @Transactional
    public List<Statement> getStatementByUserId(Integer user_id) {
        BankUser bankUser;

        bankUser = bankUserRepository.findById(user_id).orElseThrow(()
                ->new IllegalArgumentException("bankUser id does not exists"));
        
        return statementRepository.findByBankuser(bankUser);
    }

    @Transactional  // removes a statement given the id of the statement
    public boolean removeStatementById(Integer id) {
        statementRepository.removeStatementById(id);
        return true;
    }

    @Transactional  // used to get a statement by its id for removeStatementById
    public List<Statement> getStatementById(Integer id) {
        return statementRepository.getStatementById(id);
    }
}
