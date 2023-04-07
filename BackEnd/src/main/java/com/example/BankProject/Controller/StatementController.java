package com.example.BankProject.Controller;

import com.example.BankProject.Domain.Statement;
import com.example.BankProject.Service.StatementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class StatementController {

    private final StatementService statementService;

    @CrossOrigin
    @PostMapping("/users/{userId}/statement")
    public ResponseEntity<?> save(@PathVariable("userId") Integer userId, @RequestBody Statement statement) {

        return new ResponseEntity<>(statementService.create(userId, statement), HttpStatus.CREATED);

    }

    @CrossOrigin
    @GetMapping("/statements/{name}")
    public ResponseEntity<?> getStatementByName(@PathVariable("name") String name) {

        return new ResponseEntity<>(statementService.getStatementByName(name), HttpStatus.OK);

    }

    @CrossOrigin
    @GetMapping("users/{userId}/statements")
    public ResponseEntity<?> getStatementByUserId(@PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(statementService.getStatementByUserId(userId), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/delStatement/{id}")   // testing
    public ResponseEntity<?> removeStatementById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(statementService.removeStatementById(id), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/getStatement/{id}")   // testing
    public ResponseEntity<?> getStatementById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(statementService.getStatementById(id), HttpStatus.OK);
    }

}
