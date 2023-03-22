package com.example.BankProject.Controller;

import com.example.BankProject.Domain.BankUser;
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
}
