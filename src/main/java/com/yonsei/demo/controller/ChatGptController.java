package com.yonsei.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.yonsei.demo.service.ChatGptService;

@RestController
@RequestMapping("/gpt")
public class ChatGptController {
    @Autowired
    private ChatGptService chatGptService;

    @GetMapping("/chat")
    public String chat(@RequestParam("prompt") String prompt) {
        return chatGptService.chat(prompt);
    }

    @PostMapping("/summary")
    public String summary(@RequestBody String prompt){
        return chatGptService.summary(prompt);
    }

}
