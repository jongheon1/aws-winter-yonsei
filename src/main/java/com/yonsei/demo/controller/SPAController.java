package com.yonsei.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SPAController {
    @RequestMapping("/userinfo")
    public String userInfo() {
        return "forward:/";
    }

    @RequestMapping("/DetailPage/{bill_no}")
    public String bill() {
        return "forward:/";
    }

    @RequestMapping("/searchResult/**")
    public String searchResult() {
        return "forward:/";
    }
}
