package com.sun.frigg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class FriggApplication {

	public static void main(String[] args) {
		SpringApplication.run(FriggApplication.class, args);
	}

}

