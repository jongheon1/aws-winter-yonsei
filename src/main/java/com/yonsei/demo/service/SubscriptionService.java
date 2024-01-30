package com.yonsei.demo.service;


import com.yonsei.demo.entity.Keyword;
import com.yonsei.demo.entity.Subscription;
import com.yonsei.demo.entity.User;
import com.yonsei.demo.repository.KeywordRepository;
import com.yonsei.demo.repository.SubscriptionRepository;
import com.yonsei.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SubscriptionService {

    private final UserRepository userRepository;
    private final KeywordRepository keywordRepository;
    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(UserRepository userRepository, KeywordRepository keywordRepository, SubscriptionRepository subscriptionRepository) {
        this.userRepository = userRepository;
        this.keywordRepository = keywordRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    @Transactional
    public String subscribe(String userEmail, String keywordValue) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Keyword keyword = keywordRepository.findByValue(keywordValue)
                .orElseGet(() -> {
                    Keyword newKeyword = new Keyword(keywordValue);
                    return keywordRepository.save(newKeyword);
                });
        Subscription subscription = new Subscription(user, keyword);
        subscriptionRepository.save(subscription);
        return subscription.toString();
    }
}
