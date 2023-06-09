package com.example.BankProject.Controller;

import com.example.BankProject.Domain.BankUser;
import com.example.BankProject.Domain.SavingsGoal;
import com.example.BankProject.Service.BankUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping
@RequiredArgsConstructor
public class BankController {
    private final BankUserService bankUserService;

    @CrossOrigin
    @PostMapping("/bankuser")
    public ResponseEntity<?> save(@RequestBody BankUser bankUser) {

        System.out.println("userId " + bankUser.getUsername());
        System.out.println("userPassword " + bankUser.getPassword());
        return new ResponseEntity<>(bankUserService.create(bankUser), HttpStatus.CREATED);

    }

    @CrossOrigin
    @PostMapping("bankuser/{id}/savingsGoal")
    public ResponseEntity<?> setSavingsGoal(@PathVariable("id") Integer id, @RequestBody SavingsGoal savingsGoal) {
        if(bankUserService.setSavingsGoal(id, savingsGoal.getSavingsGoal())) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @CrossOrigin
    @PostMapping("bankuser/login")
    public ResponseEntity<?> validateUserLogin(@RequestBody BankUser bankUser ) {
        BankUser user= bankUserService.validateUserLogin(bankUser);
        if(user!=null) {
            return ResponseEntity.status(200).body(user);
        }
        return ResponseEntity.status(400).body(null);
    }

    @CrossOrigin
    @GetMapping("bankuser/{id}/savingsGoal")
    public ResponseEntity<Double> getSavingsGoal(@PathVariable("id") Integer id) {
        double savingsGoal = bankUserService.getSavingsGoal(id);

        if(Double.isNaN(savingsGoal)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(savingsGoal);
        }
        return ResponseEntity.status(HttpStatus.OK).body(savingsGoal);
    }
}
