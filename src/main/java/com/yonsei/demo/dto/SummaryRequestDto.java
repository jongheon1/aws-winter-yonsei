package com.yonsei.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SummaryRequestDto {
@Value("${openai.sum-system-prompt}")
    private String systemPrompt;
    private String model;
    private List<MessageDto> messages;

    public SummaryRequestDto(String model, String prompt) {
        this.model = model;

        this.messages = new ArrayList<>();
        this.messages.add(new MessageDto("system", systemPrompt));
        this.messages.add(new MessageDto("user", prompt));
    }
}
