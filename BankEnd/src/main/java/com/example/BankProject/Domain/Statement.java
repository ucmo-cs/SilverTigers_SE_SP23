package com.example.BankProject.Domain;

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

    private String amount;

    private String date;

    private boolean planned;

    private String frequency;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private BankUser bankuser;
}
