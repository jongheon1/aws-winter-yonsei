package com.yonsei.demo.service;


import com.yonsei.demo.dto.SummaryRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.yonsei.demo.dto.ChatRequestDto;
import com.yonsei.demo.dto.ChatResponseDto;

@Service
@RequiredArgsConstructor
public class ChatGptService {
    private final RestTemplate restTemplate;

    @Value("${openai.sum-system-prompt}")
    private String SunsystemPrompt;

    @Value("${openai.chat-system-prompt}")
    private String ChatSystemPrompt;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api-url}")
    private String apiUrl;

    public String chat(String prompt) {
        // create a request
        ChatRequestDto request = new ChatRequestDto(model, prompt, ChatSystemPrompt);

        // call the API
        ChatResponseDto response = restTemplate.postForObject(apiUrl, request, ChatResponseDto.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        return response.getChoices().get(0).getMessage().getContent();
    }

    public String summary(String prompt){
        SummaryRequestDto request = new SummaryRequestDto(model, prompt);

        // call the API
        ChatResponseDto response = restTemplate.postForObject(apiUrl, request, ChatResponseDto.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        return response.getChoices().get(0).getMessage().getContent();
    }
}
