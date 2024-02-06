package com.yonsei.demo.service;


import com.aspose.pdf.TextAbsorber;
import com.yonsei.demo.dto.ChatRequestDto;
import com.yonsei.demo.dto.ChatResponseDto;
import com.yonsei.demo.dto.SummaryRequestDto;
import com.yonsei.demo.entity.Bills;
import com.yonsei.demo.repository.BillsRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.aspose.pdf.Document;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class ChatGptService {
    private final RestTemplate restTemplate;

    private final BillsRepository billsRepository;

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

    public String summary(Integer billsNum){
        Bills bills = billsRepository.findById(billsNum).orElseThrow();

        String link = bills.getFile_link();
        try (BufferedInputStream in = new BufferedInputStream(new URL(link).openStream());){
            PDDocument document = PDDocument.load(in);
            PDFTextStripper stripper = new PDFTextStripper();
            String extractText = stripper.getText(document);
            SummaryRequestDto request = new SummaryRequestDto(sumModel, extractText, SumSystemPrompt);

            // call the API
            ChatResponseDto response = restTemplate.postForObject(apiUrl, request, ChatResponseDto.class);

            if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
                return "No response";
            }
            return response.getChoices().get(0).getMessage().getContent();
        }
        catch (IOException ignored) {
            return "No response";
        }
    }

    public String checkChat(String prompt, Integer billsNum) {
        Bills bills = billsRepository.findById(billsNum).orElseThrow();

        String link = bills.getFile_link();

        try (BufferedInputStream in = new BufferedInputStream(new URL(link).openStream());){

            Document pdfDocument = new Document(in);

            TextAbsorber textAbsorber = new TextAbsorber();

            pdfDocument.getPages().accept(textAbsorber);

            String extractedText = textAbsorber.getText();

            String txt = prompt + "External references include a '(출처:" + extractedText +") citation.";

            ChatRequestDto request = new ChatRequestDto(chatModel, txt, ChatSystemPrompt);

            // call the API
            ChatResponseDto response = restTemplate.postForObject(apiUrl, request, ChatResponseDto.class);

            if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
                return "No response";
            }

            // return the first response
            return response.getChoices().get(0).getMessage().getContent();
        }
        catch (IOException ignored) {
            return "No response";
        }
    }
}
