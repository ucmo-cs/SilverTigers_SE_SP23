package com.example.BankProject.Repository;

import com.example.BankProject.Domain.Statement;
import com.example.BankProject.Domain.BankUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import javax.swing.plaf.nimbus.State;
import java.util.List;

@Repository
public interface StatementRepository extends JpaRepository<Statement,Integer>{

    public List<Statement> findByName(String name);
    public List<Statement> findByBankuser(BankUser bankuser);

    public List<Statement> removeStatementById(Integer id);

    public List<Statement> getStatementById(Integer id);
}


