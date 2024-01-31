package com.yonsei.demo.repository;

import com.yonsei.demo.entity.Law;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LawRepository extends JpaRepository<Law, Long> {
}
