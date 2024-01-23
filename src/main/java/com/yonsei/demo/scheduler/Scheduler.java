package com.yonsei.demo.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@Component
@Slf4j
public class Scheduler {

    @Scheduled(cron = "0 0 1 * * ?") // 매일 오전 1시에 실행
    public void performScheduledTask() {
        log.info("Starting scheduled task: Fetching and processing new bills");
        // 여기에 크롤링 및 데이터 처리 로직 구현
        //service.fetchAndProcessNewBills();
        log.info("Scheduled task completed: New bills fetched and processed");
    }
}
