package com.yonsei.demo.repository;

import com.yonsei.demo.entity.Keyword;
import com.yonsei.demo.entity.Subscription;
import com.yonsei.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUserAndKeyword(User user, Keyword keyword);

    @Query("SELECT s.keyword FROM Subscription s WHERE s.user.id = :userId")
    Optional<List<Keyword>> findAllKeywordsByUserId(@Param("userId") Long userId);

}
