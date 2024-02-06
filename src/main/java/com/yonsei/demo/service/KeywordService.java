package com.yonsei.demo.service;

import com.yonsei.demo.entity.Keyword;
import com.yonsei.demo.entity.User;
import com.yonsei.demo.repository.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;

    public Keyword findByValue(final String value) {
        return keywordRepository.findByValue(value).get();
    }
}
