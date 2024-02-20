package com.yonsei.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.yonsei.demo.service.ChatGptService;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class ChatGptController {
    private final ChatGptService chatGptService;

    @PostMapping("/gen")
    public String chat(@RequestBody String prompt) {
        return chatGptService.chat(prompt);
    }

    @PostMapping("/{billsNum}/summary")
    public String summary(
    @PathVariable final Integer billsNum){
        return chatGptService.summary(billsNum);
    }

    @PostMapping("/{billsNum}/pdfChat")
    public String pdfChat(@RequestBody String prompt,
                          @PathVariable final Integer billsNum){
        return chatGptService.checkChat(prompt,billsNum);
    }

}
