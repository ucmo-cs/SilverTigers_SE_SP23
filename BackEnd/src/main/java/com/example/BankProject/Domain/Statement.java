package com.example.BankProject.Domain;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Statement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private double amount;

    @DateTimeFormat(pattern="yyyy-mm-dd")
    private Date date;

    private boolean planned;

    private String frequency;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private BankUser bankuser;
}
