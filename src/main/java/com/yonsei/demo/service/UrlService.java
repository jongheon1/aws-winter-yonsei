package com.yonsei.demo.service;

import com.yonsei.demo.entity.Bills;
import com.yonsei.demo.repository.BillsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UrlService {
    private final BillsRepository billsRepository;
    public String pdfUrl(Integer id) {
        Bills bills = billsRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 id가 없습니다.")
        );
        return bills.getFile_link();
    }
}
