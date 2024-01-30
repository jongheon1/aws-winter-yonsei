package com.yonsei.demo.controller;

import com.yonsei.demo.config.auth.dto.SessionUser;
import com.yonsei.demo.dto.KeywordDto;
import com.yonsei.demo.service.SubscriptionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
public class SubscriptionController {

    private final HttpSession httpSession;
    private final SubscriptionService subscriptionService; // 구독 서비스

    public SubscriptionController(HttpSession httpSession, SubscriptionService subscriptionService) {
        this.httpSession = httpSession;
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/subscription")
    public ResponseEntity<?> subscribe(@RequestBody KeywordDto keywordDto) {

        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        String result = subscriptionService.subscribe(user.getEmail(), keywordDto.getValue());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
