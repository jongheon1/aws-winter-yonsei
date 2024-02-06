package com.yonsei.demo.service;

import com.yonsei.demo.repository.BillsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BillsService {
    private final BillsRepository billsRepository;
    public long countAll() {
        return billsRepository.countAll();
    }

}
