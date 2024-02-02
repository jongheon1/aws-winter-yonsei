package com.yonsei.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.yonsei.demo.service.ChatGptService;

@RestController
@RequestMapping("/gpt")
@RequiredArgsConstructor
public class ChatGptController {
    private final ChatGptService chatGptService;

    @PostMapping("/chat")
    public String chat(@RequestBody String prompt) {
        return chatGptService.chat(prompt);
    }

    @PostMapping("/summary")
    public String summary(){
        return chatGptService.summary();
    }

}
