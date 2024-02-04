package com.yonsei.demo.service;


import com.aspose.pdf.TextAbsorber;
import com.yonsei.demo.dto.ChatRequestDto;
import com.yonsei.demo.dto.ChatResponseDto;
import com.yonsei.demo.dto.SummaryRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.aspose.pdf.Document;

@Service
@RequiredArgsConstructor
public class ChatGptService {
    private final RestTemplate restTemplate;

    @Value("${openai.sum-system-prompt}")
    private String SumSystemPrompt;

    @Value("${openai.chat-system-prompt}")
    private String ChatSystemPrompt;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.chat-model}")
    private String chatModel;

    @Value("${openai.sum-model}")
    private String sumModel;

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
        Document pdfDocument = new Document("C:\\Users\\user\\Desktop\\2126411_의사국 의안과_의안원문.pdf");

        TextAbsorber textAbsorber = new TextAbsorber();

        pdfDocument.getPages().accept(textAbsorber);

        String extractedText = textAbsorber.getText();

        String test = prompt + extractedText;

        SummaryRequestDto request = new SummaryRequestDto(sumModel, test, SumSystemPrompt);

        // call the API
        ChatResponseDto response = restTemplate.postForObject(apiUrl, request, ChatResponseDto.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        return response.getChoices().get(0).getMessage().getContent();
    }

    public String checkChat(String prompt) {
        Document pdfDocument = new Document();

        TextAbsorber textAbsorber = new TextAbsorber();

        pdfDocument.getPages().accept(textAbsorber);

        String extractedText = textAbsorber.getText();

        ChatRequestDto request = new ChatRequestDto(chatModel, prompt, ChatSystemPrompt);

        // call the API
        ChatResponseDto response = restTemplate.postForObject(apiUrl, request, ChatResponseDto.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            return "No response";
        }

        // return the first response
        return response.getChoices().get(0).getMessage().getContent();
    }
}
