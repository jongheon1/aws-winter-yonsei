package com.yonsei.demo.repository;

import com.yonsei.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findByName(String username);
/**
    User findByUsername(String username); **/
}
