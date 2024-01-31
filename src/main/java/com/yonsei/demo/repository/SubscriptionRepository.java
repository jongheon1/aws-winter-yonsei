package com.yonsei.demo.repository;

import com.yonsei.demo.entity.Keyword;
import com.yonsei.demo.entity.Subscription;
import com.yonsei.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUserAndKeyword(User user, Keyword keyword);
}
