package com.yonsei.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.ZonedDateTime;

@Getter
@Entity
public class Bills {
    @Id
    private Integer bill_no;

    private String bill_id;

    private String title;

    private String file_link;

    private ZonedDateTime created_at;

    private ZonedDateTime updated_at;
}
