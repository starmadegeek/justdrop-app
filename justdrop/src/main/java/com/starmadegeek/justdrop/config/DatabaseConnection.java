package com.starmadegeek.justdrop.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DatabaseConnection {

    private final DataSource dataSource;

    public DatabaseConnection(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
    public void verify() throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            var meta = connection.getMetaData();
            System.out.println("== Database Verification ==");
            System.out.println("DB Product Name: " + meta.getDatabaseProductName());
            System.out.println("DB Version: " + meta.getDatabaseProductVersion());
            System.out.println("Driver: " + meta.getDriverName());
            System.out.println("Autocommit: " + connection.getAutoCommit());
            System.out.println("Isolation Level: " + connection.getTransactionIsolation());
        }
    }
}
