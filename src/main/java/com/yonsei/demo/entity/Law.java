package com.yonsei.demo.entity;

import com.yonsei.demo.dto.LawDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Law {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private Long LawNum;

    @Setter
    private String LawId;

    @Setter
    private String LawUrl;

    @Setter
    private String LawName;

    public Law(LawDto lawDto) {
        this.LawNum = lawDto.getLawNum();
        this.LawId = lawDto.getLawId();
        this.LawUrl = lawDto.getLawUrl();
        this.LawName = lawDto.getLawName();
    }
}
