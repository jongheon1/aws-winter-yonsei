package com.yonsei.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="keyword")
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String value;

    @OneToMany(mappedBy = "keyword", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Subscription> Subscriptions;

    public Keyword(String value) {
        this.value = value;
    }
}
