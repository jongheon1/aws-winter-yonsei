package com.yonsei.demo.controller;

import com.yonsei.demo.config.auth.dto.SessionUser;
import com.yonsei.demo.service.ChatGptService;
import com.yonsei.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final HttpSession httpSession;

    @GetMapping("/isLogin")
    public boolean isLogin() {
        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if (user != null) {
            return true;
        }
        return false;
    }

    @GetMapping("/name")
    public String name() {
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        return user.getName();
    }
}
