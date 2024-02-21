package com.yonsei.demo.controller;

import com.yonsei.demo.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UrlController {
    private final UrlService urlService;

    @PostMapping("/pdfurl/{billsNum}/")
    public String pdfUrl(@PathVariable final Integer billsNum) {
        return urlService.pdfUrl(billsNum);
    }
}
