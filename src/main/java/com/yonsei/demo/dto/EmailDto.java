package com.yonsei.demo.dto;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailDto {

        @NotNull
        public String keyword;
        @NotNull
        private String subject;
        @NotNull
        private String messageBody;
}
