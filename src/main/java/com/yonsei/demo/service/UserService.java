package com.yonsei.demo.service;

import com.yonsei.demo.entity.User;
import com.yonsei.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
@Primary
@RequiredArgsConstructor
public class UserService{

    private final UserRepository repository;

    //@Override
    protected JpaRepository getRepository() {
        return repository;
    }

     public User findByName(final String username) {
        return repository.findByName(username);
    }
}