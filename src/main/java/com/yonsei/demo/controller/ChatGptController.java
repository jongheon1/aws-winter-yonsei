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

    @GetMapping("/gen")
    public String chat(@RequestParam("prompt") String prompt) {
        return chatGptService.chat(prompt);
    }

    @GetMapping("/summary")
    public String summary(@RequestParam("prompt") String prompt){
        return chatGptService.summary(prompt);
    }

}
