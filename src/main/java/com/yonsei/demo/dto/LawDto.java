package com.yonsei.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LawDto {
    private Long LawNum;
    private String LawId;
    private String LawUrl;
    private String LawName;

}
