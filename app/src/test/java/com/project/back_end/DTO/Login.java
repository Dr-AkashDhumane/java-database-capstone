package com.yourpackage.dto;

public class Login {

    private String identifier;
    private String password;

    public Login() {
        // Default constructor required for JSON deserialization
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
}
