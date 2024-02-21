package com.yonsei.demo.repository;

import com.yonsei.demo.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword, Long> {


     Optional<Keyword> findByValue(String value);
}
