package com.yonsei.demo.repository;

import com.yonsei.demo.entity.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BillsRepository extends JpaRepository<Bills, Integer> {

    Optional<Bills> findById(Integer id);
    @Query("SELECT COUNT(b) FROM Bills b")
    long countAll();
}
