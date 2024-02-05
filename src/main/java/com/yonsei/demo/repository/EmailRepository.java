package com.yonsei.demo.repository;
import com.yonsei.demo.entity.Email;
import com.yonsei.demo.entity.User;
import java.util.List;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EmailRepository extends JpaRepository<Email, Long> {

    List<Email> findByReceiver(@NotNull User receiver);

    List<Email> findBySender(@NotNull String sender);
}