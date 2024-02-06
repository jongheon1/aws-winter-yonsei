package com.yonsei.demo.service;
import com.yonsei.demo.entity.Email;
import com.yonsei.demo.entity.User;
import com.yonsei.demo.repository.EmailRepository;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
@RequiredArgsConstructor
public class EmailService {
    private final EmailRepository repository;
    private final UserService userService;
    private final JavaMailSender emailSender;

    @Transactional
    public void sendEmail(
            @NotNull String senderName, String receiverName, String subject, String messageBody) {
        final String fixedSystemEmail = "allaw.official@gmail.com";

        User Sender = userService.findByName(senderName);

        User receiver = userService.findByName(receiverName);
        if (receiver == null) {
            throw new IllegalArgumentException("Receiver not found: " + receiverName);
        }
        String receiverEmail = receiver.getEmail();

        if (isEmail(receiverEmail)) {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(fixedSystemEmail);
            message.setTo(receiverEmail);
            message.setSubject("[Allaw system] " + subject);
            message.setText(senderName + "(으)로부터 전송된 메세지입니다.\n" + messageBody);

            emailSender.send(message);
        }
        Email email = new Email(senderName, receiver, subject, messageBody);

        repository.save(email);
    }

    //@Override
    protected JpaRepository getRepository() {
        return repository;
    }

    public List<Email> findByReceiver(final User receiver) {
        //loggerUtil.log(TransactionType.PATIENT_VIEWS_EMAIL_ENTITY, receiver);
        return repository.findByReceiver(receiver);
    }

    public static boolean isEmail(String email) {
        boolean validation = false;

        if (email == null || email.isEmpty()) {
            return false;
        }

        String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(email);
        if (m.matches()) {
            validation = true;
        }

        return validation;
    }

    public List<Email> findBySender(final String sender) {
       // loggerUtil.log(TransactionType.PATIENT_VIEWS_EMAIL_ENTITY, sender);
        return repository.findBySender(sender);
    }

    public List<Email> findAll() {
        return repository.findAll();
    }

    public void save(Email email) {
        repository.save(email);
    }
}
